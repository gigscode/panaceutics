/**
 * Category-level data for displaying categories on homepage and categories page
 * This is SEPARATE from product data to prevent cross-contamination
 * 
 * When you edit this file, it ONLY affects:
 * - Homepage explore section (category cards)
 * - /explore/categories page (category cards)
 * 
 * It does NOT affect individual category pages like /explore/metabolic-syndrome
 * Those pages use product data from lib/categories/[category-name].ts
 */

export interface CategoryData {
  name: string
  slug: string
  description: string
  categoryImage: string
}

export const categoryDataList: CategoryData[] = [
  {
    name: "Metabolic syndrome",
    slug: "metabolic-syndrome",
    description: "Research on innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity.",
    categoryImage: "/images/metabolicsyndrome.png",
  },
  {
    name: "Oncology",
    slug: "oncology",
    description: "Studies on how combining herbal extracts or phytochemicals with conventional chemotherapy enhances cancer treatment.",
    categoryImage: "/oncology.jpg",
  },
  {
    name: "Neurology",
    slug: "neurology",
    description: "Examination of how bioactive compounds from herbs interact with neurological medications.",
    categoryImage: "/neurology.jpg",
  },
  {
    name: "Nephrology",
    slug: "nephrology",
    description: "Research on herbal formulations supporting kidney health and renal function.",
    categoryImage: "/nephrology.jpg",
  },
  {
    name: "Hematology",
    slug: "hematology",
    description: "Studies on herbal compounds and their effects on blood health and hematological conditions.",
    categoryImage: "/hematology.jpg",
  },
  {
    name: "Infectiology",
    slug: "infectiology",
    description: "Research on antimicrobial and antiviral properties of herbal formulations.",
    categoryImage: "/infectiology.jpg",
  },
  {
    name: "Ophthalmology",
    slug: "ophthalmology",
    description: "Studies on herbal compounds supporting eye health and retinal function.",
    categoryImage: "/ophthalmology.jpg",
  },
]

/**
 * Get all categories for display on homepage and categories page
 * This returns CATEGORY data, not product data
 */
export function getAllCategoryData(): CategoryData[] {
  return categoryDataList
}

/**
 * Get a specific category by slug
 */
export function getCategoryDataBySlug(slug: string): CategoryData | undefined {
  return categoryDataList.find((cat) => cat.slug === slug)
}

/**
 * Get a specific category by name
 */
export function getCategoryDataByName(name: string): CategoryData | undefined {
  return categoryDataList.find((cat) => cat.name === name)
}

