// features/marketing/components/contact-page.tsx
"use client"

import { useState, useCallback, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Users,
  Sparkles,
  Layers,
  Send,
  CheckCircle2,
} from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MotionCard } from "@/components/animations/motion-card"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

// ═══════════════════════════════════════════════════════════════════════
// Static data
// ═══════════════════════════════════════════════════════════════════════

const ENGAGEMENT_OPTIONS = [
  {
    icon: Users,
    title: "Augment my existing team",
    body: "Senior engineers embedded in your workflow to expand capacity.",
  },
  {
    icon: Sparkles,
    title: "I have a new project",
    body: "End-to-end design and development from idea to production.",
  },
  {
    icon: Layers,
    title: "Dedicated team for my project",
    body: "A cross-functional squad fully focused on your outcomes.",
  },
] as const

const SERVICE_TAGS = [
  "Product Development",
  "Web Applications",
  "Mobile Apps",
  "AI & Automation",
  "UI/UX Design",
  "DevOps & Cloud",
  "Staff Augmentation",
] as const

const CONTACT_INFO = [
  { icon: Phone, label: "(800) 815-2044", href: "tel:+18008152044" },
  {
    icon: Mail,
    label: "hello@leaflet.studio",
    href: "mailto:hello@leaflet.studio",
  },
  { icon: MapPin, label: "Remote-first · Global team", href: undefined },
] as const

const OFFICES = [
  {
    city: "Kathmandu",
    address: "Babar Mahal, Kathmandu 44600",
    image:
      "https://www.contiki.com/media/jysjppxo/gettyimages-546569926-1.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1920&height=1720&quality=80",
  },
  {
    city: "Chitwan",
    address: "Khairahani-8, Parsa",
    image:
      "https://www.contiki.com/media/urxbhf23/jeep-safari-chitwan-national-park-nepal-1.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1100&height=550&quality=80",
  },
  {
    city: "Australia",
    address: "Level 5, 123 Collins St, Melbourne VIC 3000",
    image:
      "https://www.contiki.com/media/vcfbkj0e/getty-693631434-1-1-9.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1920&height=1720&quality=80",
  },
] as const

const COUNTRIES = [
  "Nepal",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Switzerland",
  "India",
  "Other",
] as const

// ─── Orchestrators ────────────────────────────────────────────────────

const stagger = (
  staggerMs = 0.08,
  delayMs = 0.04,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerMs, delayChildren: delayMs },
  },
})

// ─── Element reveals ──────────────────────────────────────────────────

const riseUp = (
  y = 20,
  duration = 0.55,
): Variants => ({
  hidden: {
    opacity: 0,
    y,
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    y: 0,
    willChange: "auto",
    transition: { duration, ease: premiumEase },
  },
})

const riseScale = (
  y = 24,
  scale = 0.98,
  duration = 0.6,
): Variants => ({
  hidden: {
    opacity: 0,
    y,
    scale,
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    willChange: "auto",
    transition: { duration, ease: premiumEase },
  },
})

// ─── Section variants ─────────────────────────────────────────────────

const heroStagger = stagger(0.1, 0.06)
const heroH1 = riseUp(24, 0.65)
const heroP = riseUp(16, 0.55)
const heroCtas = riseUp(12, 0.5)

const formStagger = stagger(0.07, 0.04)
const formField = riseUp(14, 0.5)

const infoStagger = stagger(0.1, 0.06)
const infoCard = riseScale(20, 0.98, 0.55)

const officeStagger = stagger(0.08, 0.06)
const officeCard = riseScale(24, 0.97, 0.6)
const officeTitle = riseUp(18, 0.55)
const sectionLabel = riseUp(8, 0.45)

const vp = {
  once: false,
  amount: 0.15 as const,
  margin: "0px 0px -6% 0px" as const,
}

const vpEager = {
  once: false,
  amount: 0.08 as const,
  margin: "0px 0px -4% 0px" as const,
}

// ─── Engagement hover ─────────────────────────────────────────────────

const engagementHover: Variants = {
  rest: { x: 0 },
//   hover: { x: 1, transition: { duration: 0.2, ease: premiumEase } },
}

// ═══════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <HeroSection />
      <FormSection />
      <OfficesSection />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Hero
// ═══════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <Container wide className="relative pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vpEager}
          className="mt-6 max-w-3xl"
        >
          <motion.h1
            variants={heroH1}
            className="font-heading text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#f8f1ea] sm:text-[44px] md:text-[60px] lg:text-[72px]"
          >
            Let&apos;s build{" "}
            <span className="text-[var(--brand)]">together.</span>
          </motion.h1>

          <motion.p
            variants={heroP}
            className="mt-5 max-w-xl text-[14px] leading-7 text-white/50 sm:text-[16px] sm:leading-8 md:mt-7"
          >
            Whether you&apos;re a startup launching a new product or an
            enterprise scaling operations — there&apos;s something we can build
            for you. Drop us a note and we&apos;ll reply within two business
            days.
          </motion.p>

          <motion.div
            variants={heroCtas}
            className="mt-7 flex flex-wrap items-center gap-3 md:mt-9"
          >
            <a
              href="#form"
              className={cn(buttonVariants({ variant: "orange", size: "lg" }))}
            >
              Start a conversation
              <ArrowUpRight />
            </a>
            <Link
              href="/work"
              className={buttonVariants({
                variant: "outlineDark",
                size: "lg",
              })}
            >
              See our work
              <ArrowUpRight />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Form + Info
// ═══════════════════════════════════════════════════════════════════════

function FormSection() {
  return (
    <section id="form" className="relative border-b border-white/[0.06]">
      <Container wide className="py-16 md:py-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <InfoColumn />
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── Info column (sticky) ─────────────────────────────────────────────

function InfoColumn() {
  return (
    <motion.aside
      variants={infoStagger}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start"
    >
      {/* Featured image */}
      <motion.div variants={infoCard}>
        <AccentImageCard
          src="https://images.pexels.com/photos/9489091/pexels-photo-9489091.jpeg"
          alt="Team collaboration at Leaflet Digital Solutions"
        />
      </motion.div>

      {/* Contact info */}
      <motion.div variants={infoCard}>
        <div className="p-0">
          <h2 className="mt-3 font-heading text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[36px]">
            Call us for a quick chat.
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-white/45">
            Available Monday to Friday, US business hours.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {CONTACT_INFO.map((item) => (
              <InfoRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Careers */}
      <motion.div variants={infoCard}>
        <MotionCard className="p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
            #02 — Careers
          </p>
          <h3 className="mt-3 font-heading text-[20px] font-semibold tracking-tight text-white">
            Looking for a job?
          </h3>
          <p className="mt-2 text-[13px] leading-7 text-white/45">
            We&apos;re always hiring curious builders. Even if nothing fits
            today, we&apos;ll keep you in the loop.
          </p>
          <Link
            href="/careers"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 transition-colors duration-200 hover:text-[var(--brand)]"
          >
            Apply now
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </MotionCard>
      </motion.div>
    </motion.aside>
  )
}

// ─── Accent image card ────────────────────────────────────────────────

function AccentImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative">
      <div className="relative aspect-auto overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-[20rem] w-full rounded-br-[150px] rounded-t-md rounded-bl-md object-cover sm:h-[35rem]"
        />
      </div>
    </div>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────

function ContactForm() {
  const id = useId()
  const [engagement, setEngagement] = useState(1)
  const [services, setServices] = useState<string[]>(["Product Development"])
  const [submitted, setSubmitted] = useState(false)

  const toggleService = useCallback((tag: string) => {
    setServices((prev) =>
      prev.includes(tag) ? prev.filter((s) => s !== tag) : [...prev, tag],
    )
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  if (submitted) return <FormSuccess />

  return (
    <motion.form
      variants={formStagger}
      initial="hidden"
      whileInView="visible"
      viewport={vpEager}
      onSubmit={handleSubmit}
      className="relative rounded-[20px] border border-white/[0.08] bg-[var(--card)] p-7 md:p-10"
    >
      {/* Accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px right-10 h-px w-32 bg-gradient-to-r from-transparent via-[var(--brand)]/60 to-transparent"
      />

      {/* Header */}
      <motion.div variants={formField}>
        <h2 className="font-heading text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[36px]">
          Simply fill out{" "}
          <span className="text-[var(--brand)]">this form.</span>
        </h2>
        <p className="mt-2 text-[16px] leading-7 text-[var(--text-muted)]">
          We&apos;ll respond within two business days to discuss your project.
        </p>
      </motion.div>

      {/* Name + Email */}
      <motion.div
        variants={formField}
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        <Field label="Your full name" htmlFor={`${id}-name`}>
          <Input
            id={`${id}-name`}
            name="name"
            placeholder="eg. John Smith"
            required
            className="h-12 w-full border-white/[0.08] bg-[var(--background-soft)] text-[14px] text-white/76 hover:border-white/[0.14] focus:border-[var(--brand)]/40 focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
        <Field
          label="Your email address"
          hint="We won't send you spam."
          htmlFor={`${id}-email`}
        >
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            placeholder="eg. you@example.com"
            required
            className="h-12 w-full border-white/[0.08] bg-[var(--background-soft)] text-[14px] text-white/76 hover:border-white/[0.14] focus:border-[var(--brand)]/40 focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
      </motion.div>

      {/* Engagement */}
      <motion.div variants={formField} className="mt-8">
        <p className="text-xl font-medium text-white">
          How do you want to work with us?
        </p>
        <p className="mt-1 text-base text-[var(--text-muted)]">
          Choose the engagement model that fits.
        </p>
        <div className="mt-4 flex flex-col gap-2.5">
          {ENGAGEMENT_OPTIONS.map((opt, i) => (
            <EngagementOption
              key={opt.title}
              option={opt}
              active={engagement === i}
              onSelect={() => setEngagement(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div variants={formField} className="mt-8">
        <p className="text-xl font-medium text-white">
          What service do you require?
        </p>
        <p className="mt-1 text-base text-[var(--text-muted)]">
          Select all that apply.
        </p>
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Services"
        >
          {SERVICE_TAGS.map((tag) => (
            <ServiceTag
              key={tag}
              label={tag}
              active={services.includes(tag)}
              onToggle={() => toggleService(tag)}
            />
          ))}
        </div>
      </motion.div>

      {/* Country + Phone */}
      <motion.div
        variants={formField}
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-[180px_1fr]"
      >
        <Field label="Country" htmlFor={`${id}-country`}>
          <Select name="country" defaultValue="Nepal">
            <SelectTrigger id={`${id}-country`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Phone number" htmlFor={`${id}-phone`}>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            placeholder="Enter your number"
            className="h-12 w-full border-white/[0.08] bg-[var(--background-soft)] text-[14px] text-white/76 hover:border-white/[0.14] focus:border-[var(--brand)]/40 focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
      </motion.div>

      {/* Message */}
      <motion.div variants={formField} className="mt-6">
        <Field label="Tell us about your project" htmlFor={`${id}-msg`}>
          <Textarea
            id={`${id}-msg`}
            name="message"
            rows={5}
            placeholder="eg. I'm looking to develop this incredible app that..."
            required
            className="w-full rounded-md border border-white/[0.08] bg-[var(--background-soft)] px-3 py-2 text-[13px] text-white outline-none transition-colors duration-200 hover:border-white/[0.14] focus:border-[var(--brand)]/40 focus:ring-2 focus:ring-[var(--brand)]/15 resize-y"
          />
        </Field>
      </motion.div>

      {/* Submit */}
      <motion.div variants={formField} className="mt-8">
        <motion.button
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18, ease: premiumEase }}
          className={cn(
            buttonVariants({ variant: "orange", size: "lg" })
          )}
        >
          Send a message
          <Send className="h-3.5 w-3.5" />
        </motion.button>
      </motion.div>
    </motion.form>
  )
}

// ─── Form success ─────────────────────────────────────────────────────

function FormSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: premiumEase }}
      className="flex min-h-[500px] flex-col items-center justify-center rounded-[20px] border border-white/[0.08] bg-[var(--card)] p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: premiumEase, delay: 0.15 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-soft)]"
      >
        <CheckCircle2 className="h-8 w-8 text-[var(--brand)]" />
      </motion.div>
      <h3 className="font-heading text-[24px] font-semibold tracking-tight text-white">
        Message sent!
      </h3>
      <p className="mt-3 max-w-sm text-[14px] leading-7 text-[var(--text-muted)]">
        Thanks for reaching out. We&apos;ll review your message and get back to
        you within two business days.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outlineDark", size: "lg" }),
          "mt-8",
        )}
      >
        Back to home
        <ArrowUpRight />
      </Link>
    </motion.div>
  )
}

// ─── Engagement option ────────────────────────────────────────────────

function EngagementOption({
  option,
  active,
  onSelect,
}: {
  option: (typeof ENGAGEMENT_OPTIONS)[number]
  active: boolean
  onSelect: () => void
}) {
  const Icon = option.icon

  return (
    <Button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex h-fit items-start gap-4 rounded-lg border p-4 text-left transition-colors duration-200",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand-soft)] hover:border-[var(--brand-border)] hover:bg-[var(--brand-soft)]"
          : "border-white/[0.06] bg-[var(--background-soft)] hover:border-white/[0.1] hover:bg-white/[0.04]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
          active
            ? "border-[var(--brand-border)] text-[var(--brand)]"
            : "border-white/[0.1] text-white/35",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1">
        <span className="block text-[13px] font-medium text-white">
          {option.title}
        </span>
        <span className="mt-0.5 block text-[12px] leading-5 text-[var(--text-muted)]">
          {option.body}
        </span>
      </span>
    </Button>
  )
}

// ─── Service tag ──────────────────────────────────────────────────────

function ServiceTag({
  label,
  active,
  onToggle,
}: {
  label: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-4 py-2 text-[14px] font-medium transition-all duration-200",
        active
          ? "border-[var(--brand)] bg-[var(--brand)] text-white"
          : "border-white/[0.08] bg-[var(--background-soft)] text-white/55 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/70",
      )}
    >
      {label}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Offices
// ═══════════════════════════════════════════════════════════════════════

function OfficesSection() {
  return (
    <section className="relative">
      <Container wide className="py-16 md:py-28">
        <motion.div
          variants={sectionLabel}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <SectionLabel>Worldwide</SectionLabel>
        </motion.div>

        <motion.div
          variants={officeTitle}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mt-4 max-w-3xl"
        >
          <SectionHeading>
            We&apos;re happy to{" "}
            <span className="text-[var(--brand)]">chat in person</span> if
            you&apos;re near one of our offices.
          </SectionHeading>
        </motion.div>

        <motion.div
          variants={officeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OFFICES.map((office) => (
            <OfficeCard key={office.city} office={office} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

function OfficeCard({ office }: { office: (typeof OFFICES)[number] }) {
  return (
    <motion.article
      variants={officeCard}
      whileHover={{
        y: -4,
        transition: { duration: 0.28, ease: premiumEase },
      }}
      className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-[var(--card)] transition-colors duration-300 hover:border-white/[0.14]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-soft)]">
        <Image
          src={office.image}
          alt={`${office.city} office`}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading text-[16px] font-semibold tracking-tight text-white">
          {office.city}
        </h3>
        <p className="mt-1 text-[13px] leading-6 text-[var(--text-muted)]">
          {office.address}
        </p>
      </div>
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Shared primitives
// ═══════════════════════════════════════════════════════════════════════

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[16px] font-semibold text-[var(--text-soft)]"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p className="mt-1.5 text-[14px] text-[var(--text-subtle)] pl-2">{hint}</p>
      )}
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
}) {
  const content = (
    <span className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[var(--background-soft)] text-white transition-colors duration-200 group-hover:border-[var(--brand)]/30 group-hover:bg-[var(--brand-soft)] group-hover:text-[var(--brand)]">
        <Icon className="h-4 w-4 transition-colors duration-200 group-hover:text-[var(--brand)]" />
      </span>
      <span className="text-[16px] text-[var(--text-soft)] transition-colors duration-200 group-hover:text-[var(--brand)]">
        {label}
      </span>
    </span>
  )

  if (href) {
    return (
      <a href={href} className="group block">
        {content}
      </a>
    )
  }

  return <div className="group">{content}</div>
}