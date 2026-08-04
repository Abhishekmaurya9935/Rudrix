import { serviceHighlights } from "@/lib/content";

export function ServiceSection() {
  return (
    <section id="services" className="bg-slate-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Strategy, design, and engineering under one roof.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            We combine product thinking and engineering discipline to create digital experiences that feel effortless and perform at scale.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {serviceHighlights.map((service) => (
            <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
