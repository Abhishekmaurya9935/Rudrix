import { AboutSection } from "@/components/about";
import { AdminPanel } from "@/components/admin/admin-panel";
import { BlogSection } from "@/components/blog";
import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PortfolioSection } from "@/components/portfolio";
import { ServicesSection } from "@/components/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
      <section id="admin" className="border-t border-slate-800/80 bg-slate-950/95 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Admin access</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Manage site content securely</h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in below with the seeded administrator account to update blogs, services, portfolio items, and contact messages.
            </p>
          </div>
          <AdminPanel />
        </div>
      </section>
    </main>
  );
}
