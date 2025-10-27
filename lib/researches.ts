export interface Research {
  id: string
  title: string
  category: string
  description: string
  image: string
  date?: string
  readTime?: string
}

export const researches: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    description:
      "Research on Sphenolax®, BPVomin®, and Nu-beta®, a series of innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity, key components of metabolic syndrome.",
    image: "/ginger.jpg",
  },
  {
    id: "2",
    title: "Synergistic Anticancer Effects of Herbs.",
    category: "Oncology",
    description:
      "Studies on how combining herbal extracts or phytochemicals with conventional chemotherapy enhances cancer treatment outcomes and reduces side effects.",
    image: "/herbthree.jpg",
  },
  {
    id: "3",
    title: "Herbal Interactions with Central Nervous System Drugs",
    category: "Neurology",
    description:
      "Examination of how bioactive compounds from herbs interact with neurological medications, influencing their efficacy and safety.",
    image: "/physioresearch.jpg",
  },
  {
    id: "4",
    title: "Nephroprotective Effects of Herbal Combinations",
    category: "Nephrology",
    description:
      "Investigation into how specific herbal combinations or extracts help protect kidney function and prevent disease progression.",
    image: "/herbal-extract.jpg",
  },
  {
    id: "5",
    title: "Interactions between Herbs and Anticoagulant Medications",
    category: "Hematology",
    description:
      "Research on how certain herbs and dietary supplements affect blood clotting and interact with anticoagulant medications.",
    image: "/herbal_conbo.jpg",
  },
  {
    id: "6",
    title: "Synergistic Effects of Herbal Combinations against Infections",
    category: "Infectiology",
    description:
      "Research on how combining multiple botanicals creates enhanced therapeutic effects through complementary mechanisms, potentially reducing antibiotic resistance.",
    image: "/herbal_conbo.jpg",
  },
  {
    id: "7",
    title: "Exploring Herbal Effects on Retinal Health",
    category: "Retinology",
    description:
      "Studies on the potential benefits and risks of herbal supplements and extracts on retinal health and vision.",
    image: "/herbal_conbo.jpg",
  },
  
]

export function getCategories() {
  return Array.from(new Set(researches.map((r) => r.category)))
}

export function findByCategory(category: string) {
  return researches.filter((r) => r.category === category)
}
