import {
  AboutStorySection,
  DualCTASection,
  FAQSection,
  FinalCTASection,
  HeroSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  StatsStrip,
  TestimonialsSection,
  WhyUsSection,
} from "@/features/marketing";

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
      <StatsStrip />
      <AboutStorySection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <DualCTASection />
      <FinalCTASection />
    </main>
  );
}
