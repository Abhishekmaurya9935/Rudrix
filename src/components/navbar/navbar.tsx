"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Admin", href: "#admin" },
];

const dropdownItems = [
  { label: "Product Engineering", href: "#services" },
  { label: "Cloud & DevOps", href: "#services" },
  { label: "AI Solutions", href: "#services" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="#" className="text-lg font-semibold tracking-[0.24em] text-white">
          RUDRA LABS
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Solutions
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 w-56 rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-black/30"
                >
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-full border border-slate-700 p-2 text-slate-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-800 bg-slate-950 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:px-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-3">
                <p className="text-sm font-semibold text-white">Solutions</p>
                <div className="mt-2 flex flex-col gap-2">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-slate-300 transition hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
