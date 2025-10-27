export interface CategoryOverride {
  title?: string;
  description?: string;
  customLayout?: boolean;
  heroImage?: string;
  downloadLink?: string;
  publicationsLink?: string;
}

export const categoryOverrides: Record<string, CategoryOverride> = {
  "metabolic-syndrome": {
    title: "Metabolic Syndrome Solutions",
    description: "Discover our comprehensive range of herbal formulations designed to support metabolic health and wellness.",
    customLayout: true,
    heroImage: "/ginger.jpg",
    downloadLink: "/downloads/metabolic-syndrome-research.pdf",
    publicationsLink: "https://example.org/publications"
  },
  "oncology": {
    title: "Oncology Support Solutions",
    description: "Advanced herbal formulations developed to complement conventional cancer treatments and support patient wellbeing.",
    customLayout: false
  }
  // Add more category overrides as needed
}

export function getCategoryOverride(slug: string): CategoryOverride | undefined {
  return categoryOverrides[slug.toLowerCase()]
}