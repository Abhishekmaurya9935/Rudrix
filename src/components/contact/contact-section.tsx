"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/lib/api";

type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

export function ContactSection() {
  const [status, setStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus("Sending your message...");

    try {
      await submitContact(data);
      setStatus("Thanks for reaching out. We will contact you soon.");
      reset();
    } catch {
      setStatus("We could not send your message right now. Please try again shortly.");
    }
  };

  return (
    <section id="contact" className="bg-slate-50 px-6 py-24 text-slate-900 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Let’s build something ambitious together.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Share your goals and we will help you shape a digital experience that performs.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Company information</h3>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p>📍 32 Harbor Avenue, New York, NY</p>
              <p>📞 +1 (800) 555-0144</p>
              <p>✉️ hello@rudralabs.com</p>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Follow us
              </h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-500 hover:text-orange-500"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="h-56 w-full bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_35%)]" />
            <div className="p-6 text-sm text-slate-600">
              <p className="font-semibold text-slate-950">Map placeholder</p>
              <p className="mt-2">Google Maps integration will be added in the next step.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-orange-500"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-orange-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">Company</label>
            <input
              {...register("company", { required: "Company is required" })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-orange-500"
              placeholder="Your company"
            />
            {errors.company && <p className="mt-2 text-sm text-red-500">{errors.company.message}</p>}
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              {...register("message", { required: "Message is required", minLength: { value: 10, message: "Write at least 10 characters" } })}
              rows={6}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-orange-500"
              placeholder="Tell us about your project"
            />
            {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
          </div>

          {status ? (
            <p className="mt-6 text-sm font-medium text-orange-600">{status}</p>
          ) : null}

          <button
            type="submit"
            className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
