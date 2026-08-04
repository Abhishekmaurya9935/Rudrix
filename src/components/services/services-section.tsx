"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getServices } from "@/lib/api";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    getServices()
      .then((response) => setServices(response.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <section id="services" className="bg-slate-50 px-6 py-24 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Enterprise services crafted for modern growth.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            From strategy to delivery, every engagement is designed to accelerate momentum while reducing complexity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-500">
                {service.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center text-sm font-semibold text-orange-500 transition group-hover:translate-x-1">
                Learn more →
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
