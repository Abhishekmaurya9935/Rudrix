"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminForm } from "./admin-form";
import { AdminTable } from "./admin-table";
import { AdminStatCard } from "./admin-stat-card";
import type { AdminField, AdminColumn } from "./admin-types";
import {
  adminCreateBlogPost,
  adminCreatePortfolio,
  adminCreateService,
  adminDeleteBlogPost,
  adminDeleteContactMessage,
  adminDeletePortfolio,
  adminDeleteService,
  adminGetBlogPosts,
  adminGetContactMessages,
  adminGetPortfolio,
  adminGetServices,
  adminLogout,
  adminUpdateBlogPost,
  adminUpdateContactMessage,
  adminUpdatePortfolio,
  adminUpdateService,
  loginAdmin,
} from "@/lib/api";

type AdminTab = "Blogs" | "Services" | "Portfolio" | "Contacts";

type BlogItem = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  metrics: string;
};

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

const tabs: AdminTab[] = ["Blogs", "Services", "Portfolio", "Contacts"];

const blogFields: AdminField[] = [
  { name: "title", label: "Title", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Content", type: "textarea", required: true },
  { name: "category", label: "Category", required: true },
  { name: "readTime", label: "Read time", required: true, placeholder: "e.g. 5 min" },
];

const serviceFields: AdminField[] = [
  { name: "id", label: "Slug / ID", required: true, placeholder: "unique-key" },
  { name: "title", label: "Title", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon", required: true, placeholder: "e.g. 🚀" },
  { name: "features", label: "Features", type: "list", required: true, help: "Use comma-separated items." },
];

const portfolioFields: AdminField[] = [
  { name: "id", label: "Slug / ID", required: true, placeholder: "unique-key" },
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Category", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image URL", required: true, placeholder: "e.g. /images/portfolio/hero.jpg" },
  { name: "link", label: "Link", required: true, placeholder: "https://..." },
  { name: "metrics", label: "Metrics", required: true },
];

const contactFields: AdminField[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", required: true },
  { name: "company", label: "Company", placeholder: "Optional" },
  { name: "message", label: "Message", type: "textarea", required: true },
];

function buildInitialForm(activeTab: AdminTab) {
  switch (activeTab) {
    case "Blogs":
      return { title: "", excerpt: "", content: "", category: "", readTime: "" };
    case "Services":
      return { id: "", title: "", description: "", icon: "", features: "" };
    case "Portfolio":
      return { id: "", title: "", category: "", description: "", image: "", link: "", metrics: "" };
    case "Contacts":
      return { name: "", email: "", company: "", message: "" };
  }
}

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("Blogs");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("rudra-admin-token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadActiveTab();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeTab]);

  async function loadActiveTab() {
    if (!token) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (activeTab === "Blogs") {
        const result = await adminGetBlogPosts(token);
        setBlogs(result.data);
      }

      if (activeTab === "Services") {
        const result = await adminGetServices(token);
        setServices(result.data);
      }

      if (activeTab === "Portfolio") {
        const result = await adminGetPortfolio(token);
        setPortfolio(result.data);
      }

      if (activeTab === "Contacts") {
        const result = await adminGetContactMessages(token);
        setContactMessages(result.data);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load records.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await loginAdmin({ email: loginEmail, password: loginPassword });
      const newToken = response.data.token;
      window.localStorage.setItem("rudra-admin-token", newToken);
      setToken(newToken);
      setStatusMessage("Admin signed in successfully.");
      setSelectedItem(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed.");
    }
  }

  async function handleLogout() {
    if (!token) {
      return;
    }

    try {
      await adminLogout(token);
    } catch {
      // ignore logout errors, we still clear local state
    }

    window.localStorage.removeItem("rudra-admin-token");
    setToken(null);
    setSelectedItem(null);
    setStatusMessage("Logged out successfully.");
  }

  function handleEditItem(item: Record<string, unknown>) {
    setSelectedItem(item);
    setStatusMessage(null);
    setErrorMessage(null);
  }

  function handleNewItem() {
    setSelectedItem(null);
    setStatusMessage(null);
    setErrorMessage(null);

    if (activeTab === "Contacts") {
      setErrorMessage("Contact messages cannot be created from the admin dashboard. Select a message to edit instead.");
    }
  }

  async function handleSubmit(values: Record<string, unknown>) {
    if (!token) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      switch (activeTab) {
        case "Blogs": {
          if (selectedItem && typeof selectedItem.id === "number") {
            await adminUpdateBlogPost(token, selectedItem.id as number, values as any);
            setStatusMessage("Blog updated successfully.");
          } else {
            await adminCreateBlogPost(token, values as any);
            setStatusMessage("Blog created successfully.");
          }
          break;
        }
        case "Services": {
          const payload = { ...values } as { id: string; title: string; description: string; icon: string; features: string[] };
          if (selectedItem && typeof selectedItem.id === "string") {
            await adminUpdateService(token, selectedItem.id as string, payload);
            setStatusMessage("Service updated successfully.");
          } else {
            await adminCreateService(token, payload);
            setStatusMessage("Service created successfully.");
          }
          break;
        }
        case "Portfolio": {
          const payload = values as { id: string; title: string; category: string; description: string; image: string; link: string; metrics: string };
          if (selectedItem && typeof selectedItem.id === "string") {
            await adminUpdatePortfolio(token, selectedItem.id as string, payload);
            setStatusMessage("Portfolio item updated successfully.");
          } else {
            await adminCreatePortfolio(token, payload);
            setStatusMessage("Portfolio item created successfully.");
          }
          break;
        }
        case "Contacts": {
          if (selectedItem && typeof selectedItem.id === "number") {
            await adminUpdateContactMessage(token, selectedItem.id as number, values as any);
            setStatusMessage("Contact message updated successfully.");
          }
          break;
        }
      }

      await loadActiveTab();
      setSelectedItem(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save changes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: Record<string, unknown>) {
    if (!token) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      switch (activeTab) {
        case "Blogs":
          if (typeof item.id === "number") {
            await adminDeleteBlogPost(token, item.id as number);
            setStatusMessage("Blog post deleted.");
          }
          break;
        case "Services":
          if (typeof item.id === "string") {
            await adminDeleteService(token, item.id as string);
            setStatusMessage("Service deleted.");
          }
          break;
        case "Portfolio":
          if (typeof item.id === "string") {
            await adminDeletePortfolio(token, item.id as string);
            setStatusMessage("Portfolio item deleted.");
          }
          break;
        case "Contacts":
          if (typeof item.id === "number") {
            await adminDeleteContactMessage(token, item.id as number);
            setStatusMessage("Contact message deleted.");
          }
          break;
      }

      await loadActiveTab();
      setSelectedItem(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete record.");
    } finally {
      setLoading(false);
    }
  }

  const currentFields = useMemo(() => {
    switch (activeTab) {
      case "Blogs":
        return blogFields;
      case "Services":
        return serviceFields;
      case "Portfolio":
        return portfolioFields;
      case "Contacts":
        return contactFields;
    }
  }, [activeTab]);

  const currentItems = useMemo(() => {
    switch (activeTab) {
      case "Blogs":
        return blogs;
      case "Services":
        return services;
      case "Portfolio":
        return portfolio;
      case "Contacts":
        return contactMessages;
    }
  }, [activeTab, blogs, services, portfolio, contactMessages]);

  const currentColumns = useMemo<AdminColumn<Record<string, unknown>>[]>(() => {
    switch (activeTab) {
      case "Blogs":
        return [
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "readTime", label: "Read Time" },
          { key: "createdAt", label: "Created" },
        ];
      case "Services":
        return [
          { key: "title", label: "Title" },
          { key: "icon", label: "Icon" },
          { key: "description", label: "Description" },
          {
            key: "features",
            label: "Features",
            render: (item) => String((item.features as string[]).join(", ")),
          },
        ];
      case "Portfolio":
        return [
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "metrics", label: "Metrics" },
          { key: "link", label: "Link" },
        ];
      case "Contacts":
        return [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "company", label: "Company" },
          { key: "message", label: "Message" },
        ];
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Admin Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Manage blogs, services, portfolio, and contacts</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Use the admin controls below to review messages, maintain content, and keep the portfolio up to date.
          </p>
        </div>

        {token ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-3xl bg-slate-800 px-5 py-3 text-sm text-slate-200">Signed in as admin</div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Logout
            </button>
          </div>
        ) : null}
      </header>

      {!token ? (
        <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Administrator Login</h2>
          <p className="mt-2 text-sm text-slate-400">Enter your admin credentials to manage content.</p>
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Sign In
            </button>
          </form>

          {errorMessage ? <p className="mt-4 text-sm text-rose-400">{errorMessage}</p> : null}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-4 shadow-xl shadow-slate-950/40 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedItem(null);
                  }}
                  className={`rounded-3xl px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-slate-200 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab !== "Contacts" ? (
              <button
                type="button"
                onClick={handleNewItem}
                className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                New {activeTab.slice(0, -1)}
              </button>
            ) : (
              <div className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-slate-300">Contact messages are read-only on create.</div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <AdminStatCard label="Active section" value={activeTab} description="The content area currently being managed." accent="sky" icon="📂" />
            <AdminStatCard label="Items" value={currentItems.length} description="Total records available for the current section." accent="emerald" icon="🗂️" />
            <AdminStatCard label="Mode" value={selectedItem ? "Editing" : "Creating"} description="Switch between editing and creating new records." accent="violet" icon="✏️" />
            <AdminStatCard label="Status" value={loading ? "Loading" : "Ready"} description="Current dashboard state for the selected table." accent="slate" icon="⚡" />
          </div>

          {statusMessage ? <div className="rounded-3xl border border-emerald-600 bg-emerald-950/50 px-5 py-4 text-sm text-emerald-200">{statusMessage}</div> : null}
          {errorMessage ? <div className="rounded-3xl border border-rose-600 bg-rose-950/50 px-5 py-4 text-sm text-rose-200">{errorMessage}</div> : null}

          <section className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/95 px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{activeTab} overview</h2>
                  <p className="mt-1 text-sm text-slate-400">Manage the current {activeTab.toLowerCase()} and perform edits with a consistent workflow.</p>
                </div>
                <span className="rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {loading ? "Loading..." : `${currentItems.length} items`}
                </span>
              </div>

              <AdminTable
                columns={currentColumns as AdminColumn<Record<string, unknown> & { id: string | number }>[]}
                items={currentItems as Array<Record<string, unknown> & { id: string | number }>}
                onEdit={handleEditItem as (item: Record<string, unknown> & { id: string | number }) => void}
                onDelete={handleDelete as (item: Record<string, unknown> & { id: string | number }) => void}
              />
            </div>

            {activeTab === "Contacts" && !selectedItem ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 text-slate-400">
                <p className="text-lg font-semibold text-white">Review contact messages</p>
                <p className="mt-2 text-sm">Pick a message from the list to inspect details, update its status, or remove it from the dashboard.</p>
              </div>
            ) : (
              <AdminForm
                title={selectedItem ? `Edit ${activeTab.slice(0, -1)}` : `Create ${activeTab.slice(0, -1)}`}
                fields={currentFields}
                initialData={selectedItem ?? buildInitialForm(activeTab)}
                submitLabel={selectedItem ? "Save Changes" : "Create"}
                onSubmit={handleSubmit}
                onCancel={() => setSelectedItem(null)}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
