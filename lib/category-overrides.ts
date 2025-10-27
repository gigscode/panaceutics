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
    downloadLink: "/research/metabolic-syndrome",
    //publicationsLink: "https://example.org/publications"
  },
  "oncology": {
    title: "Oncology Support Solutions",
    description: "Advanced herbal formulations developed to complement conventional cancer treatments and support patient wellbeing. Our research focuses on synergistic anticancer effects and reducing chemotherapy-induced toxicity.",
    customLayout: true,
    heroImage: "/oncology.jpg",
    downloadLink: "/research/oncology"
  },
  "neurology": {
    title: "Neurological Support Solutions",
    description: "Comprehensive research on herbal interactions with central nervous system drugs and their effects on neurological health. Our formulations focus on safe co-administration and neuroprotective benefits.",
    customLayout: true,
    heroImage: "/neurology.jpg",
    downloadLink: "/research/neurology"
  },
  "nephrology": {
    title: "Kidney Health Solutions",
    description: "Specialized herbal combinations designed to protect kidney function and prevent disease progression. Our nephroprotective formulations target oxidative stress and inflammation in renal tissues.",
    customLayout: true,
    heroImage: "/nephrology.jpg",
    downloadLink: "/research/nephrology"
  },
  "hematology": {
    title: "Blood Health Solutions",
    description: "Research-based insights on herbal interactions with anticoagulant medications and blood clotting mechanisms. Our advisory content ensures safe therapeutic combinations under physician oversight.",
    customLayout: true,
    heroImage: "/hematology.jpg",
    downloadLink: "/research/hematology"
  },
  "infectiology": {
    title: "Infection Control Solutions",
    description: "Innovative herbal combinations with enhanced therapeutic effects against infections through complementary mechanisms. Our research explores synergistic antibacterial and antiviral properties.",
    customLayout: true,
    heroImage: "/infectiology.jpg",
    downloadLink: "/research/infectiology"
  },
  "retinology": {
    title: "Retinal Health Solutions",
    description: "Targeted nutraceutical blends to support retinal function and vision health. Our studies focus on the benefits and risks of herbal supplements on retinal health and visual acuity.",
    customLayout: true,
    heroImage: "/retinology.jpg",
    downloadLink: "/research/retinology"
  }
}

export function getCategoryOverride(slug: string): CategoryOverride | undefined {
  return categoryOverrides[slug.toLowerCase()]
}