// app/page.tsx
import {
  AboutStorySection,
  DualCTASection,
  FAQSection,
  FinalCTASection,
  HeroSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
  WhyUsSection,
} from "@/features/marketing";
import { BlogSection } from "@/features/marketing/components/blog-section";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Leaflet Digital Solutions",
      url: "https://leafletdigitalsolutions.com",
      logo: "https://leafletdigitalsolutions.com/favicon.ico",
    },
    {
      "@type": "WebSite",
      name: "Leaflet Digital Solutions",
      url: "https://leafletdigitalsolutions.com",
    },
    {
      "@type": "ProfessionalService",
      name: "Leaflet Digital Solutions",
      url: "https://leafletdigitalsolutions.com",
      areaServed: ["Nepal", "Australia", "Global"],
      serviceType: [
        "Web Development",
        "Mobile App Development",
        "UI UX Design",
        "AI Automation",
        "Digital Marketing",
      ],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      {/* StatsStrip removed — it's part of HeroSection now */}
      <AboutStorySection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <DualCTASection />
      <FinalCTASection />
    </main>
  );
}