"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getBlogPosts } from "@/lib/api";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  createdAt: string;
};

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts()
      .then((response) => setPosts(response.data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Blog
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Insights that help teams build with confidence.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            These posts are being pulled from the live blog API so the website stays aligned with your backend data.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
                {post.category}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{post.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-400">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>{post.readTime}</span>
                <span className="text-orange-300">Read more</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
