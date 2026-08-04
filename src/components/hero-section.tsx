"use client";

import { motion } from "framer-motion";
import { heroStats } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_38%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-300">
            Premium software engineering for ambitious brands
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            We design the digital systems that move modern businesses forward.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Rudra Labs builds elegant web platforms, intelligent product experiences, and resilient infrastructure for companies that want to scale with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Book a strategy call
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-orange-400 hover:text-white"
            >
              Explore services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-orange-500/10 backdrop-blur"
        >
          <div className="rounded-2xl border border-orange-400/30 bg-slate-900/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
              Trusted by scaling teams
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
