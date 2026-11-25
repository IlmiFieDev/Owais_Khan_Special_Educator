import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

const routes = [
  "/",
  "/about",
  "/expertise",
  "/experience",
  "/qualifications",
  "/approach",
  "/resources",
  "/feedback",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.8 : 0.6,
  }));
}
