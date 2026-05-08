"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch Waitlist Count
  async function fetchCount() {
    const { count } = await supabase
      .from("waitlist")
      .select("*", {
        count: "exact",
        head: true,
      });

    setCount(count || 0);
  }

  // Join Waitlist
  async function joinWaitlist() {
    try {
      setLoading(true);

      const username =
        profile?.username ||
        "guest_" + Math.floor(Math.random() * 999999);

      const wallet =
        "0x" + Math.random().toString(16).substring(2, 12);

      const { error } = await supabase
        .from("waitlist")
        .insert([
          {
            username,
            wallet,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Successfully joined waitlist 🍕");

      fetchCount();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Countdown
  useEffect(() => {
    const target = new Date("2026-05-22T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (diff / 1000 / 60) % 60
        ),
        seconds: Math.floor(
          (diff / 1000) % 60
        ),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pizza Rain
  const pizzas = Array.from({ length: 20 });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-6">

      {/* Pizza Rain */}
      {pizzas.map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-bounce"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
            animationDuration: `${4 + i % 5}s`,
          }}
        >
          🍕
        </div>
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-[40px] border border-blue-400/20 bg-[#020b4f]/95 p-8 shadow-[0_0_60px_rgba(59,130,246,0.45)]">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-7xl drop-shadow-[0_0_25px_rgba(255,180,0,0.9)]">
            🍕
          </div>

          <div>
            <h1 className="text-5xl font-black text-blue-300">
              PizzaBase
            </h1>

            <p className="text-gray-400">
              Bitcoin Pizza Day 2026
            </p>
          </div>
        </div>

        {/* Farcaster Login */}
	<div className="mt-6">
	  <button
	    onClick={() =>
	      window.open(
	        "https://warpcast.com/~/apps",
	        "_blank"
	      )
	    }
	    className="w-full rounded-2xl border border-blue-500/20 bg-blue-950/40 p-4 text-left transition hover:border-blue-400"
	  >
	    <div className="flex items-center gap-4">
	      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400 text-2xl">
	        🟣
	      </div>

	      <div>
	        <p className="text-lg font-bold text-white">
	          Connect Farcaster
	        </p>

	        <p className="text-sm text-gray-400">
	          Open in Warpcast
	        </p>
	      </div>
	    </div>
	  </button>
	</div>

        {/* Heading */}
        <h2 className="mt-10 text-6xl font-black leading-none text-white">
          Claim your{" "}
          <span className="text-blue-400">
            early slice.
          </span>
        </h2>

        <p className="mt-6 text-2xl leading-relaxed text-gray-400">
          Join the first 10,000 pioneers
          celebrating Bitcoin Pizza Day on
          Farcaster.
        </p>

        {/* Countdown */}
        <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-950/40 p-6">
          <p className="text-lg text-blue-300">
            🍕 Bitcoin Pizza Day Countdown
          </p>

          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            {Object.entries(timeLeft).map(([k, v]) => (
              <div key={k}>
                <div className="text-4xl font-black text-white">
                  {v}
                </div>

                <div className="capitalize text-gray-400">
                  {k}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="mb-2 flex justify-between text-xl">
            <span className="text-gray-300">
              Slices Claimed
            </span>

            <span className="font-bold text-blue-300">
              {count}/10000
            </span>
          </div>

          <div className="h-5 overflow-hidden rounded-full bg-blue-950">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
              style={{
                width: `${Math.min(
                  (count / 10000) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            ["⚡", "FCFS", "Early Access"],
            ["🍕", "10K", "Pizza Spots"],
            ["🟦", "BASE", "Ecosystem"],
          ].map(([icon, title, sub]) => (
            <div
              key={title}
              className="rounded-3xl border border-blue-500/20 bg-blue-950/40 p-5 text-center"
            >
              <div className="text-5xl">
                {icon}
              </div>

              <div className="mt-3 text-3xl font-black text-blue-300">
                {title}
              </div>

              <div className="mt-2 text-gray-400">
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Points */}
        <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-black text-yellow-300">
              🍕 Pizza Points
            </h3>

            <span className="text-5xl font-black text-white">
              0
            </span>
          </div>

          <div className="mt-6 space-y-4 text-xl">
            <div className="flex justify-between text-gray-300">
              <span>Join Waitlist</span>
              <span>+150</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Follow Account</span>
              <span>+100</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Recast Campaign</span>
              <span>+200</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Share Cast</span>
              <span>+300</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={joinWaitlist}
          disabled={loading}
          className="mt-10 w-full rounded-3xl bg-gradient-to-r from-blue-500 to-blue-300 py-6 text-3xl font-black text-white shadow-[0_0_40px_rgba(59,130,246,0.8)] transition hover:scale-105"
        >
          {loading
            ? "Joining..."
            : "🍕 Claim Your Slice"}
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-500">
          Powered by Farcaster Mini Apps
        </p>
      </div>
    </main>
  );
}
