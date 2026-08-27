export interface ProductDescription {
  id: string
  shortDescription: string
  fullDescription: string
  benefits?: string[]
  ingredients?: string[]
  usage?: string
  warnings?: string[]
}

// Product IDs match the IDs in lib/categories/*.ts (101–104 = Metabolic syndrome)
const productDescriptions: Record<string, ProductDescription> = {
  // ── Metabolic Syndrome ────────────────────────────────────────────────────
  "101": {
    id: "101",
    shortDescription: "A poly-herbal formulation for weight management, promoting beige fat formation.",
    fullDescription: `Nu-beta® (Nubeta 500mg Capsule) is our flagship Poly-Herbal formulation designed for weight management.

This product specifically upregulates the expression of Jak3 and Uncoupling Protein 1 (UCP-1) within the adipose tissue in diet-induced obesity. The combination of the mechanisms above positions Nu-beta® as key to transitioning White Adipose Tissue to brown and beige types.

No exercise or dietary restriction required.`,
  },
  "102": {
    id: "102",
    shortDescription: "A penta-herbal formulation for diabetes management and pancreatic repair.",
    fullDescription: `Sphenolax® is our flagship Penta-Herbal formulation with TGR5 agonism, DPP-IV inhibition, Alpha-amylase inhibition, dual DYRK1A/GSK-3β inhibition and selective AMP-activated protein kinase (AMPK) activation.

Sphenolax® slowly repairs adult pancreas in both human and mouse models of diabetes, providing highly sustained pancreatic beta-cell function.`,
  },
  "103": {
    id: "103",
    shortDescription: "A bi-herbal formulation for RAAS modulation and blood pressure control.",
    fullDescription: `BPVomin® is our flagship Bi-Herbal formulation with renin-angiotensin-aldosterone system (RAAS) modulation via Angiotensin Converting Enzyme I/II inhibition, dual endothelin receptor (endothelin A and endothelin B receptors) antagonism.`,
  },
  "104": {
    id: "104",
    shortDescription: "Tri-mechanistic herbal agent for tissue repair and neurogenesis.",
    fullDescription: `Exigencin® is our flagship Herbal formulation designed as a tri-mechanistic agent. First, it is designed as a weak dual Phyto-thrombolytic/phyto-anticoagulant agent.

Secondly, it blocks TLR4-Mediated Inflammation thus preventing extensive tissue damage and lastly, Exigencin® initiates Brain-derived neurotrophic factor-mediated neurogenesis within the CNS; forcing repair and the remodeling of the extracellular matrix in preparation for functional recovery.

Prevents Vaso-occlusive crisis as seen in Stroke and Sickle cell disease.`,
  },

  // ── Oncology (201–204) ────────────────────────────────────────────────────
  "201": {
    id: "201",
    shortDescription: "Synergistic herbal formulation designed to support cancer management.",
    fullDescription: `Studies on how combining herbal extracts or phytochemicals with conventional chemotherapy enhances cancer treatment outcomes and reduces side effects. Formulations are adjunctive; not intended to replace standard-of-care chemotherapy.`,
  },
  "202": {
    id: "202",
    shortDescription: "Herbal support for oncology patients during treatment.",
    fullDescription: `A scientifically-validated herbal formulation designed to support the body during oncological treatment, focusing on reducing chemotherapy-induced toxicity and improving patient tolerability.`,
  },
  "203": {
    id: "203",
    shortDescription: "Plant-based formulation targeting cancer cell pathways.",
    fullDescription: `A targeted herbal formulation that works on specific cancer cell signalling pathways to support conventional oncology treatment. Designed as an adjunct to standard care.`,
  },
  "204": {
    id: "204",
    shortDescription: "Herbal immune support for oncology patients.",
    fullDescription: `An immune-modulating herbal formulation designed to support immune function in oncology patients, helping maintain overall wellbeing during treatment.`,
  },

  // ── Neurology (301–303) ───────────────────────────────────────────────────
  "301": {
    id: "301",
    shortDescription: "Neuroprotective herbal formulation supporting brain health.",
    fullDescription: `A herbal formulation targeting neurological pathways to support brain health, cognitive function, and neuroprotection. Based on research into BDNF-mediated neurogenesis and neuroprotective plant compounds.`,
  },
  "302": {
    id: "302",
    shortDescription: "Herbal support for neurological conditions.",
    fullDescription: `A scientifically-validated herbal blend designed to support nerve function and neurological health, drawing on evidence-based phytotherapy research.`,
  },
  "303": {
    id: "303",
    shortDescription: "Plant-based cognitive support formulation.",
    fullDescription: `A herbal formulation developed to support cognitive performance and neurological resilience, combining traditional plant wisdom with modern clinical research.`,
  },

  // ── Nephrology (401) ──────────────────────────────────────────────────────
  "401": {
    id: "401",
    shortDescription: "Herbal formulation for kidney health and renal function support.",
    fullDescription: `A herbal formulation developed to support renal health and kidney function, based on nephroprotective plant compounds validated through clinical research.`,
  },

  // ── Infectiology (601–604) ────────────────────────────────────────────────
  "601": {
    id: "601",
    shortDescription: "Herbal antimicrobial formulation for infection management.",
    fullDescription: `A herbal formulation with antimicrobial properties designed to support the body's defence against infectious agents, based on evidence-based phytomedicine research.`,
  },
  "602": {
    id: "602",
    shortDescription: "Immune-boosting herbal blend for infection resistance.",
    fullDescription: `A scientifically-validated herbal immune support formulation targeting the body's natural defence mechanisms to help resist and recover from infections.`,
  },
  "603": {
    id: "603",
    shortDescription: "Antiviral herbal support formulation.",
    fullDescription: `A herbal formulation with antiviral properties designed to support the immune system and assist recovery from viral infections. Based on clinical phytomedicine research.`,
  },
  "604": {
    id: "604",
    shortDescription: "Herbal anti-inflammatory support for infectious conditions.",
    fullDescription: `A targeted herbal formulation combining anti-inflammatory and antimicrobial plant compounds to support recovery from infectious conditions and reduce associated inflammation.`,
  },

  // ── Ophthalmology (701) ───────────────────────────────────────────────────
  "701": {
    id: "701",
    shortDescription: "Herbal formulation for eye health and vision support.",
    fullDescription: `A herbal formulation developed to support ocular health and vision, drawing on plant compounds with documented effects on eye tissue health and oxidative stress reduction in ophthalmological conditions.`,
  },
}

export function getProductDescription(productId: string): ProductDescription | undefined {
  return productDescriptions[productId]
}

export function getAllProductDescriptions(): Record<string, ProductDescription> {
  return productDescriptions
}
