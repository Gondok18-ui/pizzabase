"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [count, setCount] = useState(0);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  async function fetchCount() {
    const { count } = await supabase
      .from("waitlist")
      .select("*", {
        count: "exact",
        head: true,
      });

    setCount(count || 0);
  }

  async function joinWaitlist() {
    try {
      setLoading(true);

      const wallet =
        "0x" +
        Math.random()
          .toString(16)
          .substring(2, 12);

      const username =
        "pizza_" +
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
        setLoading(false);
        return;
      }

      setJoined(true);
      fetchCount();

      alert("🍕 Successfully joined PizzaBase");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
  const targetDate = new Date("2026-05-22T00:00:00");

  const timer = setInterval(() => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      clearInterval(timer);
      setTimeLeft(null);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const [pizzas, setPizzas] = useState([]);

useEffect(() => {
  const generated = Array.from({ length: 25 }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 10,
    size: 30 + Math.random() * 50,
    rotate: Math.random() * 360,
  }));

  setPizzas(generated);
}, []);

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0047FF] via-[#001B7A] to-black relative flex items-center justify-center px-6 py-12 text-white">

      {/* PIZZA RAIN */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {pizzas.map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            🍕
          </div>
        ))}

        {/* Falling animation */}
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-120vh) rotate(0deg);
            }

            100% {
              transform: translateY(120vh) rotate(360deg);
            }
          }

          .animate-bounce {
            animation-name: fall;
          }
        `}</style>
      </div>

      {/* BLUE GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_70%)]" />

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-md w-full">

        <div className="bg-[#050816]/90 border border-blue-400/30 rounded-[36px] p-8 shadow-[0_0_80px_rgba(59,130,246,0.35)] backdrop-blur-xl">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">

            <div className="text-6xl drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]">
              🍕
            </div>

            <div>
              <h1 className="text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                PizzaBase
              </h1>

              <p className="text-blue-200/70 mt-2 text-sm">
                Bitcoin Pizza Day 2026
              </p>
            </div>
          </div>

          {/* HERO */}
          <div className="mb-8">

            <h2 className="text-3xl font-black leading-tight mb-4">
              Claim your
              <span className="text-blue-300"> early slice.</span>
            </h2>

            <p className="text-blue-100/70 leading-relaxed">
              Join the first 10,000 pioneers celebrating Bitcoin Pizza Day on Farcaster.
            </p>

          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4">
  <p className="text-blue-300 text-sm mb-2">
    🍕 Bitcoin Pizza Day Countdown
  </p>

  {timeLeft ? (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <p className="text-2xl font-bold text-white">
          {timeLeft.days}
        </p>
        <p className="text-xs text-gray-400">Days</p>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">
          {timeLeft.hours}
        </p>
        <p className="text-xs text-gray-400">Hours</p>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">
          {timeLeft.minutes}
        </p>
        <p className="text-xs text-gray-400">Minutes</p>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">
          {timeLeft.seconds}
        </p>
        <p className="text-xs text-gray-400">Seconds</p>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <p className="text-green-400 font-bold text-xl">
        🍕 Pizza Day Started!
      </p>
    </div>
  )}
</div>

          {/* PROGRESS */}
          <div className="mb-8">

            <div className="flex justify-between mb-3 text-sm">

              <span className="text-blue-100/70">
                Slices Claimed
              </span>

              <span className="font-black text-blue-300">
                {count}/10000
              </span>

            </div>

            <div className="w-full h-4 bg-[#081020] rounded-full overflow-hidden border border-blue-500/20">

              <div
                className="h-full bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 transition-all duration-700"
                style={{
                  width: `${(count / 10000) * 100}%`,
                }}
              />

            </div>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3 mb-8 text-center">

            <div className="bg-[#081020] border border-blue-500/20 rounded-2xl p-4">

              <div className="text-2xl mb-2">
                ⚡
              </div>

              <p className="font-black text-blue-300">
                FCFS
              </p>

              <p className="text-xs text-blue-100/50 mt-1">
                Early Access
              </p>

            </div>

            <div className="bg-[#081020] border border-blue-500/20 rounded-2xl p-4">

              <div className="text-2xl mb-2">
                🍕
              </div>

              <p className="font-black text-blue-300">
                10K
              </p>

              <p className="text-xs text-blue-100/50 mt-1">
                Pizza Spots
              </p>

            </div>

            <div className="bg-[#081020] border border-blue-500/20 rounded-2xl p-4">

              <div className="text-2xl mb-2">
                🟦
              </div>

              <p className="font-black text-blue-300">
                BASE
              </p>

              <p className="text-xs text-blue-100/50 mt-1">
                Ecosystem
              </p>

            </div>

          </div>

          {/* BUTTON */}
          {joined ? (

            <div className="bg-cyan-400/10 border border-cyan-300 rounded-2xl p-4 text-center font-bold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              🍕 You successfully joined.
            </div>

          ) : (

            <button
              onClick={joinWaitlist}
              disabled={loading}
              className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#60A5FA] text-white shadow-[0_0_40px_rgba(59,130,246,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >

              {loading
                ? "Claiming Slice..."
                : "🍕 Claim Your Slice"}

            </button>

          )}

          {/* FOOTER */}
          <div className="mt-8 text-center">

            <p className="text-xs text-blue-100/40">
              Powered by Farcaster Mini Apps
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
