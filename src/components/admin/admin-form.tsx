"use client";

import { useEffect, useState } from "react";
import type { AdminField } from "./admin-types";

interface AdminFormProps {
  title: string;
  fields: AdminField[];
  initialData?: Record<string, unknown>;
  submitLabel: string;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function AdminForm({ title, fields, initialData = {}, submitLabel, onSubmit, onCancel }: AdminFormProps) {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setFormState(
      fields.reduce((state, field) => {
        const value = initialData[field.name] ?? "";
        return {
          ...state,
          [field.name]: field.type === "list" && Array.isArray(value) ? (value as string[]).join(", ") : value,
        };
      }, {} as Record<string, unknown>),
    );
  }, [fields, initialData]);

  function handleChange(name: string, value: string) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = fields.reduce((state, field) => {
      const rawValue = String(formState[field.name] ?? "").trim();
      return {
        ...state,
        [field.name]: field.type === "list" ? rawValue.split(",").map((item) => item.trim()).filter(Boolean) : rawValue,
      };
    }, {} as Record<string, unknown>);

    onSubmit(payload);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">Create or update records with the form below.</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {fields.map((field) => {
          const value = String(formState[field.name] ?? "");
          return (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-slate-200">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  value={value}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="min-h-[120px] w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type === "list" ? "text" : field.type ?? "text"}
                  value={value}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              )}
              {field.help && <p className="text-sm text-slate-500">{field.help}</p>}
            </div>
          );
        })}

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            {submitLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-3xl border border-slate-700 bg-transparent px-5 py-3 text-sm text-slate-100 transition hover:border-slate-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
