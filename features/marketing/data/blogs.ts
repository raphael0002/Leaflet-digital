import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-for-trust",
    category: "Design",
    title:
      "Designing for trust: the quiet details that make products feel premium",
    excerpt:
      "From microcopy to motion curves, the small decisions that separate forgettable interfaces from ones people actually love using.",
    date: "Jun 04, 2026",
    readTime: "6 min read",
    author: "Maya Chen",
  },
  {
    slug: "remote-first-engineering-loop",
    category: "Engineering",
    title: "Shipping faster with a remote-first engineering loop",
    excerpt:
      "How we structure async standups, code reviews and release windows across five time zones without losing momentum.",
    date: "May 22, 2026",
    readTime: "8 min read",
    author: "Daniel Park",
  },
  {
    slug: "why-most-mvps-miss",
    category: "Strategy",
    title: "Why most MVPs miss — and the framework we use instead",
    excerpt:
      "A practical lens for cutting scope without cutting soul, drawn from twenty product launches over the last two years.",
    date: "May 09, 2026",
    readTime: "5 min read",
    author: "Sofia Almeida",
  },
  {
    slug: "ai-features-that-earn-their-place",
    category: "AI",
    title:
      "Building AI features that earn their place in the product",
    excerpt:
      "A short guide to evaluating when AI actually helps users — and when it's just expensive theatre on top of a working flow.",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    author: "Jordan Reeve",
  },
]

export const categoryColors: Record<string, string> = {
  Design: "text-[#f88221]",
  Engineering: "text-[#5ea4f8]",
  Strategy: "text-[#a78bfa]",
  AI: "text-[#34d399]",
}