"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "14+", label: "Years of innovation" },
  { value: "300+", label: "Projects delivered" },
  { value: "40+", label: "Countries served" },
];

const milestones = [
  { year: "2010", title: "Founded with a product-first mindset" },
  { year: "2016", title: "Expanded into enterprise engineering" },
  { year: "2022", title: "Built AI-driven delivery systems" },
  { year: "2025", title: "Now scaling global digital platforms" },
];

const team = [
  { name: "Aarav Singh", role: "Founder & CEO" },
  { name: "Meera Rao", role: "Head of Product" },
  { name: "Daniel Cruz", role: "Engineering Lead" },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              About us
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              We build bold digital platforms with clarity, discipline, and purpose.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Rudra Labs exists to help ambitious companies translate complexity into elegant digital experiences. We combine product thinking, engineering excellence, and modern delivery methods to move businesses forward.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">Mission</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Deliver transformation that feels seamless, strategic, and measurable.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">Vision</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Create technology experiences that unlock growth for the next generation of enterprise brands.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-orange-500/10"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white">Our timeline</h3>
              <div className="mt-6 space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-1 h-3 w-3 rounded-full bg-orange-500" />
                    <div>
                      <p className="text-sm font-semibold text-orange-300">{milestone.year}</p>
                      <p className="mt-1 text-sm text-slate-400">{milestone.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-white">Leadership team</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-lg font-semibold text-orange-300">
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <h4 className="mt-6 text-lg font-semibold text-white">{person.name}</h4>
                <p className="mt-2 text-sm text-slate-400">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
