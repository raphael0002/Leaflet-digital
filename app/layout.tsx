import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/animations/motion-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leafletdigitalsolutions.com"),
  title: {
    default: "Leaflet Digital Solutions | Web Development, Apps & AI Automation",
    template: "%s | Leaflet Digital Solutions",
  },
  description:
    "Leaflet Digital Solutions helps businesses design, develop, and launch websites, mobile apps, dashboards, automation tools, and digital growth systems that improve operations, build trust, and generate qualified leads.",
  keywords: [
    "web development Nepal",
    "mobile app development Nepal",
    "IT solutions company",
    "AI automation",
    "UI UX design",
    "SEO digital marketing",
    "remote software team",
    "Leaflet Digital Solutions",
  ],
  openGraph: {
    title: "Leaflet Digital Solutions | Web Development, Apps & AI Automation",
    description:
      "Build digital systems that convert, scale, and simplify your business.",
    url: "https://leafletdigitalsolutions.com",
    siteName: "Leaflet Digital Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaflet Digital Solutions",
    description:
      "Websites, apps, dashboards, automation tools, and digital growth systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--text)]">
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
