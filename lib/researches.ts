import { Price } from './currency'

export interface Research {
  id: string
  title: string
  category: string
  description: string
  image: string
  date?: string
  readTime?: string
  // optional product fields used on category (product) pages
  price?: Price
  comparePrice?: Price
  rating?: number
  details?: string
}

export const researches: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    description:
      "Research on Sphenolax®, BPVomin®, and Nu-beta®, a series of innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity, key components of metabolic syndrome.",
    image: "/ginger.jpg",
    price: { amount: 25500, currency: 'NGN' },
    comparePrice: { amount: 30000, currency: 'NGN' },
    rating: 4.8,
    details:
      "A combination herbal formulation intended to support metabolic health. Clinical data suggests improvements in fasting glucose and blood pressure in preliminary studies. Consult a clinician for dosing and interactions.",
  },
  {
    id: "2",
    title: "Synergistic Anticancer Effects of Herbs.",
    category: "Oncology",
    description:
      "Studies on how combining herbal extracts or phytochemicals with conventional chemotherapy enhances cancer treatment outcomes and reduces side effects.",
    image: "/herbthree.jpg",
    price: { amount: 25000, currency: 'NGN' },
    comparePrice: { amount: 28500, currency: 'NGN' },
    rating: 4.8,
    details:
      "Formulations are adjunctive; not intended to replace standard-of-care chemotherapy. Studies focus on reducing chemo-induced toxicity and improving patient tolerability.",
  },
  {
    id: "3",
    title: "Herbal Interactions with Central Nervous System Drugs",
    category: "Neurology",
    description:
      "Examination of how bioactive compounds from herbs interact with neurological medications, influencing their efficacy and safety.",
    image: "/physioresearch.jpg",
    price: { amount: 10000, currency: 'NGN' },
    comparePrice: { amount: 12000, currency: 'NGN' },
    rating: 4.8,
    details:
      "Highlights potential CYP-mediated interactions and provides guidance on safe co-administration. Use under supervision if combined with CNS-active drugs.",
  },
  {
    id: "4",
    title: "Nephroprotective Effects of Herbal Combinations",
    category: "Nephrology",
    description:
      "Investigation into how specific herbal combinations or extracts help protect kidney function and prevent disease progression.",
    image: "/herbal-extract.jpg",
    price: { amount: 12000, currency: 'NGN' },
    comparePrice: { amount: 13500, currency: 'NGN' },
    rating: 4.8,
    details:
      "Formulations targeting oxidative stress and inflammation in renal tissues. Intended as supportive therapy; monitor renal function regularly.",
  },
  {
    id: "5",
    title: "Interactions between Herbs and Anticoagulant Medications",
    category: "Hematology",
    description:
      "Research on how certain herbs and dietary supplements affect blood clotting and interact with anticoagulant medications.",
    image: "/herbal_conbo.jpg",
    price: { amount: 63984, currency: 'NGN' }, // ₦63,984 (was $39.99)
    details:
      "Advisory content on herbs with antiplatelet or anticoagulant effects. Strongly recommend physician oversight when combined with anticoagulants.",
  },
  {
    id: "6",
    title: "Synergistic Effects of Herbal Combinations against Infections",
    category: "Infectiology",
    description:
      "Research on how combining multiple botanicals creates enhanced therapeutic effects through complementary mechanisms, potentially reducing antibiotic resistance.",
    image: "/herbal_conbo.jpg",
    price: { amount: 86400, currency: 'NGN' }, // ₦86,400 (was $54.00)
    details:
      "Combinations studied for antibacterial and antiviral properties. Not a substitute for antibiotics where clinically indicated.",
  },
  {
    id: "7",
    title: "Exploring Herbal Effects on Retinal Health",
    category: "Retinology",
    description:
      "Studies on the potential benefits and risks of herbal supplements and extracts on retinal health and vision.",
    image: "/herbal_conbo.jpg",
    price: { amount: 72000, currency: 'NGN' }, // ₦72,000 (was $45.00)
    details:
      "Targeted nutraceutical blends to support retinal function. Clinical endpoints include visual acuity and biomarkers of oxidative stress.",
  },
  
]

export function getCategories() {
  return Array.from(new Set(researches.map((r) => r.category)))
}

export function findByCategory(category: string) {
  return researches.filter((r) => r.category === category)
}

export function findById(id: string) {
  return researches.find((r) => r.id === id)
}
