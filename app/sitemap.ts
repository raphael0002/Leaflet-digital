import type { MetadataRoute } from "next"

const routes = ["", "/services", "/about", "/work", "/blog", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://leafletdigitalsolutions.com${route}`,
    lastModified: new Date("2026-06-10"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
