import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = [
  "",
  "/about",
  "/services",
  "/how-it-works",
  "/calculator",
  "/testimonials",
  "/apply",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/data-security",
  "/disclosures"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-09-01")
  }));
}
