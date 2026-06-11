import type { ProcessStep } from "../types"

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    index: "01",
    label: "Discover",
    title: "Review client brief & scope of work",
    description:
      "We understand your business, goals, audience, competitors, and technical requirements before planning the solution.",
  },
  {
    id: "plan",
    number: "02",
    index: "02",
    label: "Plan",
    title: "Map the strategy & milestones",
    description:
      "We create a clear roadmap, define project priorities, plan the architecture, and set measurable delivery milestones.",
  },
  {
    id: "design",
    number: "03",
    index: "03",
    label: "Design",
    title: "Craft clean, conversion-focused UI",
    description:
      "We design professional interfaces that feel trustworthy, easy to understand, responsive, and aligned with your brand.",
  },
  {
    id: "develop",
    number: "04",
    index: "04",
    label: "Develop",
    title: "Build scalable production code",
    description:
      "We develop clean, maintainable, responsive, and production-ready websites using modern technologies and best practices.",
  },
  {
    id: "test",
    number: "05",
    index: "05",
    label: "Test",
    title: "Validate quality across devices",
    description:
      "We test responsiveness, performance, accessibility, loading states, forms, animations, and real user flows before launch.",
  },
  {
    id: "support",
    number: "06",
    index: "06",
    label: "Support",
    title: "Improve, maintain & optimize",
    description:
      "After launch, we continue improving performance, fixing issues, adding features, and optimizing for better conversions.",
  },
]