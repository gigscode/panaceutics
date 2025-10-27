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
    description: "Metabolic Syndrome (MS) is a complex cluster of interrelated metabolic and physiological abnormalities. These disorders, when clustered, substantially increase an individual's lifetime risk for developing chronic conditions, including Type 2 Diabetes Mellitus (T2DM) and premature Cardiovascular Disease (CVD), notably ischemic heart disease. ",
    customLayout: true,
    heroImage: "/images/metabolicsyndrome.png",
    downloadLink: "/products",
    //publicationsLink: "https://example.org/publications"
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