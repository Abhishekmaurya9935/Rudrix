"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "14+", label: "Years building products" },
  { value: "120+", label: "Launches delivered" },
  { value: "98%", label: "Client retention" },
];

const floatingCards = [
  { title: "Global delivery", detail: "Teams across continents" },
  { title: "Enterprise-grade", detail: "Security and reliability" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_35%)]" />
      <div className="absolute right-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-300"
          >
            Premium software engineering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            We build digital systems that make ambitious companies feel unstoppable.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
          >
            Rudra Labs helps scale-ups modernize product experiences, accelerate delivery, and unlock intelligent growth with strategy, design, and engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="#contact"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Book a strategy call
            </Link>
            <Link
              href="#services"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-orange-400 hover:text-white"
            >
              Explore services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-orange-400/20 bg-slate-900/80 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                    Innovation Studio
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Modern systems for modern growth.
                  </p>
                </div>
                <div className="rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300">
                  Live
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Transformation velocity</span>
                  <span className="text-white">+42%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-orange-500 to-cyan-400" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {floatingCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{card.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mx-auto mt-16 flex max-w-7xl items-center gap-3 text-sm text-slate-400"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        <span>Scroll to explore our approach</span>
      </motion.div>
    </section>
  );
}
