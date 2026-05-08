"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignInButton, useProfile } from "@farcaster/auth-kit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [count, setCount] = useState(0);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Points system
  const [points, setPoints] = useState(0);
  const { profile } = useProfile();

  // Pizza rain
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchCount();

    const targetDate = new Date("2026-05-22T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    // Pizza rain generator
    const pizzaArray = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 24 + Math.random() * 24,
    }));

    setPizzas(pizzaArray);

    return () => clearInterval(timer);
  }, []);

  async function fetchCount() {
    try {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", {
          count: "exact",
          head: true,
        });

      if (error) {
        console.log(error);
        return;
      }

      setCount(count || 0);
    } catch (err) {
      console.log(err);
    }
  }

  async function joinWaitlist() {
    try {
      setLoading(true);

      const wallet =
        "0x" +
        Math.random().toString(16).substring(2, 10);

      const username =
        "user_" +
        Math.floor(Math.random() * 999999);

      const { error } = await supabase
        .from("waitlist")
        .insert([
          {
            wallet,
            username,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      setJoined(true);
      setCount((prev) => prev + 1);

      // Reward points
      setPoints(150);

      alert("Successfully joined waitlist");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-700 via-blue-900 to-black flex items-center justify-center px-4 py-10">

      {/* Pizza Rain */}
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="absolute opacity-20 animate-bounce"
          style={{
            left: `${pizza.left}%`,
            top: `-50px`,
            fontSize: `${pizza.size}px`,
            animationDuration: `${pizza.duration}s`,
            animationDelay: `${pizza.delay}s`,
          }}
        >
          🍕
        </div>
      ))}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md rounded-[40px] border border-blue-500/30 bg-[#020b2f]/95 p-7 shadow-[0_0_80px_rgba(59,130,246,0.45)]">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-7xl drop-shadow-[0_0_20px_rgba(255,170,0,0.8)]">
            🍕
          </div>

          <div>
            <h1 className="text-5xl font-black tracking-tight text-blue-300">
              PizzaBase
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Bitcoin Pizza Day 2026
            </p>
          </div>
        </div>

        {/* Farcaster Login */}
	<div className="mt-6">
	  {!profile ? (
	    <SignInButton />
	  ) : (
	    <div className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-950/40 p-3">
	      <img
	        src={profile.pfpUrl}
	        alt="pfp"
	        className="h-12 w-12 rounded-full"
	      />

	      <div>
	        <p className="text-white font-bold">
        	  @{profile.username}
	        </p>

	        <p className="text-xs text-gray-400">
	          Connected with Farcaster
	        </p>
	      </div>
	    </div>
	  )}
	</div>

        {/* Hero */}
        <div className="mt-10">
          <h2 className="text-5xl font-black leading-tight text-white">
            Claim your{" "}
            <span className="text-blue-400">
              early slice.
            </span>
          </h2>

          <p className="mt-6 text-gray-400 text-xl leading-relaxed">
            Join the first 10,000 pioneers celebrating
            Bitcoin Pizza Day on Farcaster.
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-950/40 p-5">
          <p className="text-blue-300 text-sm mb-4">
            🍕 Bitcoin Pizza Day Countdown
          </p>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-4xl font-black text-white">
                {timeLeft.days}
              </div>
              <div className="text-gray-400 text-sm">
                Days
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-white">
                {timeLeft.hours}
              </div>
              <div className="text-gray-400 text-sm">
                Hours
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-white">
                {timeLeft.minutes}
              </div>
              <div className="text-gray-400 text-sm">
                Minutes
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-white">
                {timeLeft.seconds}
              </div>
              <div className="text-gray-400 text-sm">
                Seconds
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">
              Slices Claimed
            </span>

            <span className="text-blue-300 font-bold">
              {count}/10000
            </span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-blue-950 border border-blue-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500"
              style={{
                width: `${(count / 10000) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-3xl border border-blue-500/20 bg-black/20 p-5 text-center">
            <div className="text-4xl">⚡</div>

            <div className="mt-4 text-3xl font-black text-blue-300">
              FCFS
            </div>

            <div className="mt-2 text-gray-500">
              Early Access
            </div>
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-black/20 p-5 text-center">
            <div className="text-4xl">🍕</div>

            <div className="mt-4 text-3xl font-black text-blue-300">
              10K
            </div>

            <div className="mt-2 text-gray-500">
              Pizza Spots
            </div>
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-black/20 p-5 text-center">
            <div className="text-4xl">🟦</div>

            <div className="mt-4 text-3xl font-black text-blue-300">
              BASE
            </div>

            <div className="mt-2 text-gray-500">
              Ecosystem
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-yellow-300">
              🍕 Pizza Points
            </h3>

            <span className="text-3xl font-black text-white">
              {points}
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Join Waitlist</span>
              <span>+150</span>
            </div>

            <div className="flex justify-between">
              <span>Follow Account</span>
              <span>+100</span>
            </div>

            <div className="flex justify-between">
              <span>Recast Campaign</span>
              <span>+200</span>
            </div>

            <div className="flex justify-between">
              <span>Share Cast</span>
              <span>+300</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={joinWaitlist}
          disabled={loading || joined}
          className="mt-8 w-full rounded-3xl bg-gradient-to-r from-blue-500 to-blue-300 py-6 text-3xl font-black text-white shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading
            ? "Joining..."
            : joined
            ? "🍕 Joined"
            : "🍕 Claim Your Slice"}
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-600">
          Built on Base • Powered by Farcaster
        </p>
      </div>
    </main>
  );
}
