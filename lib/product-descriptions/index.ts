// Individual product descriptions that can be edited independently
// Each product has its own description file to avoid affecting others

export interface ProductDescription {
  id: string
  shortDescription: string
  fullDescription: string
  benefits?: string[]
  ingredients?: string[]
  usage?: string
  warnings?: string[]
}

// Define product descriptions directly here for now
// You can move them to separate files later if needed
const nubetaDescription: ProductDescription = {
  id: '1',
  shortDescription: 'A poly-herbal formulation for weight management, promoting beige fat formation.',
  fullDescription: `Nu-beta® is our flagship Poly-Herbal formulation designed for weight management. 
  
  This product specifically upregulates the expression of Jak3 and Uncoupling Protein 1 (UCP-1) within the adipose tissue in diet-induced obesity. The combination of the mechanisms above positions Nu-beta® as key to transitioning White Adipose Tissue to brown and beige types. `,
  /* benefits: [
    'Promotes beige fat formation for enhanced fat burning',
    'Supports healthy weight management',
    'Improves metabolic rate and thermogenesis',
    'Helps manage metabolic syndrome symptoms',
    'Natural herbal formulation with minimal side effects'
  ],
  ingredients: [
    'Green Tea Extract (standardized for EGCG)',
    'Capsaicin (from Cayenne Pepper)',
    'Garcinia Cambogia Extract',
    'Chromium Picolinate',
    'L-Carnitine',
    'Other proprietary herbal extracts'
  ],
  usage: 'Take 2 capsules daily with meals, preferably with breakfast and lunch. For best results, combine with a balanced diet and regular exercise. Consult your healthcare provider before use.',
  warnings: [
    'Not recommended for pregnant or nursing women',
    'Consult your doctor if you have heart conditions',
    'May cause mild digestive upset in sensitive individuals',
    'Keep out of reach of children',
    'Store in a cool, dry place'
  ]*/
}

const sphenolaxDescription: ProductDescription = {
  id: '2',
  shortDescription: 'A penta-herbal formulation for diabetes management and pancreatic repair.',
  fullDescription: `Sphenolax® is our flagship Penta-Herbal formulation with TGR5 agonism, DPP-IV inhibition, Alpha-amylase inhibition, dual DYRK1A/GSK-3β  inhibition and selective AMP-activated protein kinase (AMPK) activation. 
  
  Sphenolax® slowly repairs adult pancreas in both human and mouse model of diabetes, providing highly sustained pancreatic beta-cell function. `,
 /* benefits: [
    'Supports healthy blood glucose levels',
    'Enhances insulin sensitivity and production',
    'Promotes pancreatic beta-cell regeneration',
    'Helps manage type 2 diabetes symptoms',
    'Supports overall metabolic health',
    'Natural alternative to synthetic medications'
  ],
  ingredients: [
    'Bitter Melon Extract (Momordica charantia)',
    'Gymnema Sylvestre Leaf Extract',
    'Fenugreek Seed Extract',
    'Cinnamon Bark Extract',
    'Alpha Lipoic Acid',
    'Proprietary herbal blend'
  ],
  usage: 'Take 1-2 capsules twice daily, 30 minutes before meals. Monitor blood glucose levels regularly and adjust dosage as recommended by your healthcare provider.',
  warnings: [
    'Monitor blood glucose levels closely when starting',
    'Consult your doctor before use if on diabetes medication',
    'Not suitable for type 1 diabetes',
    'Pregnant or nursing women should avoid use',
    'May interact with blood-thinning medications'
  ]*/
}

const bpvominDescription: ProductDescription = {
  id: '3',
  shortDescription: 'A bi-herbal formulation for RAAS modulation and blood pressure control.',
  fullDescription: `BPVomin® is our flagship Bi-Herbal formulation with renin-angiotensin-aldosterone system (RAAS) modulation via Angiotensin Converting Enzyme I/II inhibition, dual endothelin receptor (endothelin A and endothelin B receptors) antagonism. `,
  /* benefits: [
    'Supports healthy blood pressure levels',
    'Modulates RAAS system naturally',
    'Promotes cardiovascular health',
    'Supports healthy blood vessel function',
    'Helps maintain proper fluid balance',
    'Natural alternative for blood pressure management'
  ],
  ingredients: [
    'Hawthorn Berry Extract (Crataegus oxyacantha)',
    'Olive Leaf Extract (standardized for oleuropein)',
    'Magnesium Glycinate',
    'Potassium Citrate',
    'Coenzyme Q10',
    'Proprietary herbal blend'
  ],
  usage: 'Take 1 capsule twice daily with meals. Monitor blood pressure regularly and maintain a healthy lifestyle with proper diet and exercise.',
  warnings: [
    'Monitor blood pressure regularly when starting',
    'Consult your doctor if on blood pressure medication',
    'Not recommended during pregnancy or nursing',
    'May interact with heart medications',
    'Discontinue use if dizziness occurs'
  ]*/
}

const exigencinDescription: ProductDescription = {
  id: '4',
  shortDescription: 'Exigencin is a tri-mechanistic herbal agent for tissue repair and neurogenesis.',
  fullDescription: `Exigencin® is our flagship Herbal formulation designed as tri-mechanistic agent. First, it is designed as a weak dual Phyto-thrombolytic/phyto-anticoagulant agent. 
  
  Secondly, it blocks TLR4-Mediated Inflammation thus preventing extensive tissue damage and lastly, Exigencin® initiates Brain-derived neurotrophic factor-mediated neurogenesis within the CNS; forcing repair and the remodeling of the extracellular matrix in preparation for functional recovery. `,
  /* benefits: [
    'Supports tissue repair and regeneration',
    'Promotes neurogenesis and brain health',
    'Enhances cellular recovery processes',
    'Supports healthy aging',
    'Improves cognitive function',
    'Accelerates wound healing'
  ],
  ingredients: [
    'Lion\'s Mane Mushroom Extract',
    'Ginkgo Biloba Leaf Extract',
    'Turmeric Root Extract (95% curcumin)',
    'Bacopa Monnieri Extract',
    'Phosphatidylserine',
    'Proprietary neurotropic blend'
  ],
  usage: 'Take 2 capsules daily with meals, preferably in the morning and evening. For optimal results, maintain consistent use for at least 8-12 weeks.',
  warnings: [
    'Not recommended for pregnant or nursing women',
    'May interact with blood-thinning medications',
    'Consult your doctor if you have neurological conditions',
    'May cause mild digestive upset initially',
    'Keep refrigerated after opening'
  ]*/
}

// Map product IDs to their descriptions
const productDescriptions: Record<string, ProductDescription> = {
  '1': nubetaDescription,
  '2': sphenolaxDescription,
  '3': bpvominDescription,
  '4': exigencinDescription,
}

/**
 * Get detailed description for a specific product
 */
export function getProductDescription(productId: string): ProductDescription | undefined {
  return productDescriptions[productId]
}

/**
 * Get all product descriptions
 */
export function getAllProductDescriptions(): Record<string, ProductDescription> {
  return productDescriptions
}