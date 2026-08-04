"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPortfolio } from "@/lib/api";

const categories = ["All", "Web", "Mobile", "AI", "Enterprise SaaS", "Digital Health", "Analytics"] as const;

type Category = (typeof categories)[number];

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  metrics: string;
};

export function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getPortfolio()
      .then((response) => setProjects(response.data))
      .catch(() => setProjects([]));
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="bg-slate-50 px-6 py-24 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Portfolio
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Selected work that shaped modern customer journeys.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Each engagement combines vision, design, and engineering to create measurable impact.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="block w-full text-left"
              >
                <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{project.description}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-700">{project.metrics}</p>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 py-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl rounded-[2rem] border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl"
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
                    {selectedProject.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{selectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300"
                >
                  Close
                </button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="mt-6 h-72 w-full rounded-[1.25rem] object-cover"
              />
              <p className="mt-6 text-base leading-8 text-slate-300">{selectedProject.description}</p>
              <p className="mt-4 text-sm font-semibold text-orange-300">{selectedProject.metrics}</p>
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-orange-400">
                View case study →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
