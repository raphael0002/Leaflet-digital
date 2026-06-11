export type NavLink = {
  label: string
  href: string
}

export type Stat = {
  value: string
  label: string
}

export type StoryCard = {
  title: string
  description: string
  icon: "spark" | "experiment" | "evolution"
}

export type Service = {
  number: string
  title: string
  description: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
}

export type ComparisonRow = {
  feature: string
  agency: string
  freelancers: string
  leaflet: string
}

export type ProcessStep = {
  id: string
  number: string
  index: string
  label: string
  title: string
  description: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export type FAQ = {
  question: string
  answer: string
}

export type FooterColumn = {
  title: string
  links: string[]
}
