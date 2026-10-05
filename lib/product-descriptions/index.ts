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
    shortDescription: "A proprietary blend of four herbs targeting the key pathological drivers of uterine fibroids.",
    fullDescription: `Myofibrox is a proprietary blend of four herbs with definitive action on four key pathological drivers of uterine fibroids. The first component antagonizes progesterone/PR-A/PR signaling. The second component is a dual inhibitor of intratumoral aromatase and 17β-HSD1. The third plant targets matrix remodelling via the profibrotic TGF-β/SMAD3 axis, While the last plant component is anti-proliferative and survival circuitry modulator acting via Wnt/β-catenin/PI3K/AKT/mTOR/MAPK/ERK.

This formulation also benefits from the inherent blockage of NF-κB-driven inflammation, oxidative stress due to the ubiquitous flavonoid class present in medicinal plants.

Patients are also encouraged daily doses of Vitamin D3 supplement, which restrains further proliferation and ECM deposition via vitamin D receptor and PPARγ pathways.

Our proprietary MyoFibrox achieves substantial regression and symptom control in human patients.`,
  },
  "202": {
    id: "202",
    shortDescription: "A scientifically validated herbal formulation for BPH combining 5α-reductase/PDE5 inhibition, smooth muscle relaxation, and anti-fibrotic action.",
    fullDescription: `Prostafexin is a scientifically validated and standardized herbal formulation already established for centuries. One of the components achieve dual 5α-reductase/PDE5 inhibition thus, countering the ED effect of 5α-reductase inhibition. Another component specifically blocks α1A-adrenoceptor signalling, causing relaxation of the smooth muscle tissue in the prostate and bladder neck, thus, improving urinary flow and reduces lower urinary tract symptoms.

Another component also modulates TGF-β/SMAD3-driven fibroblast-to-myofibroblast transition and collagen deposition and lastly, Bcl-2 upregulation, and Wnt/β-catenin/mTOR inhibition is achieved by the last component specifically adapted from MyoFibrox. The restoration of apoptosis drives regression.

Patients on Prostafexin are also advised to take Sphenolax which reverses the Metabolic driver of BPH via hyperinsulinemia.

Using this protocol, full reversal of established hyperplastic and fibrotic remodelling has been achieved in human patients.`,
  },
  "203": {
    id: "203",
    shortDescription: "A carefully blended botanical formulation targeting the cell-cycle, apoptosis evasion, and tumour vasculature in oncogenesis.",
    fullDescription: `Beyond any tissue-specific proliferative signals that drives oncogenesis, all pathways must ultimately cascade to cell-cycle; thus, our proprietary Atxilox is a carefully blended botanicals which specifically inhibits CDK4/6-cyclin D-Rb, recovers mitochondrial apoptosis evasion via Bcl-2/Bcl-xL/Mcl-1, XIAP/survivin downregulation and blockage of VEGF/VEGFR angiogenesis which sustains tumour vasculature.

A patient on Atxilox is also treated with Sphenolax and Nu-beta, these formulations jointly reverse Warburg metabolic effect and dyslipidemia.

Since our preparation method is aimed at preserving the flavonoid-class within other key target phytochemicals, Inflammation and redox imbalance associated with carcinogenesis is blocked by the flavonoid-rich fraction via NF-κB/STAT3/COX-2/PGE₂/ROS pathways.

Thus, Atxilox reduces tumour volume, and ultimately promotes patient survival as a single agent, and when combined with chemotherapy, it mitigates against therapy resistance.`,
  },
  "204": {
    id: "204",
    shortDescription: "A proprietary formulation targeting the HIF-1α/TGF-β/Wnt/NF-κB metastatic cascade, MMP-driven matrix remodelling, and PD/PDL1 immune evasion.",
    fullDescription: `In cancer patients, metastasis begins when cells at the primary tumour switch from a stable, cohesive state to an invasive one driven principally by hypoxia, inflammation and a stiffening, fibrotic stroma. Hypoxia stabilises HIF-1α, and together with TGF-β, Wnt and NF-κB signalling this activates EMT transcription factors (Snail, Twist, ZEB1). These repress E-cadherin, so cells lose adhesion to neighbours, gain a mesenchymal, motile phenotype, and acquire stem-like and survival traits.

At the same time, the cells remodel their surroundings. MMPs, uPA and cathepsins degrade the basement membrane, while LOX stiffens the collagen matrix. Integrin-FAK-Src and Rho/Rac signalling then reorganise the actin cytoskeleton so the cells can crawl through the matrix toward blood and lymphatic vessels.

Tumour-derived VEGF creates leaky, abnormal vessels, and chemokine gradients (CXCL12/CXCR4, CCL2) draw cells toward them.

Metaxin is proprietarily formulated to target HIF-1α/TGF-β/Wnt/NF-κB axes, its components also disrupt MMPs and inhibit PD/PDL1 for enhanced immune-surveillance.`,
  },

  // ── Neurology (301–303) ───────────────────────────────────────────────────
  "301": {
    id: "301",
    shortDescription: "A proprietary botanical blend addressing four key pathobiologies of joint and spinal degeneration: inflammation, matrix degradation, cartilage repair, and bone remodelling.",
    fullDescription: `Key physiological processes drive spondylotic and arthritic changes in joints (disk degeneration, facet joint wear, and bone spurs) whilst some patients are asymptomatic, others experience joint stiffness, mild to severe pain, and nerve pressure (numbness, tingling, or weakness). Management and treatment options include: Physical therapy, drug-based pain management (anti-inflammatory drugs (NSAIDs) to reduce swelling and discomfort or steroid shots near the joint or nerve to give short-term relief).

Our proprietary VanTax blends carefully selected botanicals to address four key pathobiologies:

- Inflammation and catabolic signalling (COX-2/NF-κB inhibition, IL-1/TNF/IL-6 modulation, JAK/STAT)
- Matrix degradation (MMP-3/13 and ADAMTS-4/5 cleave collagen II and aggrecan) and oxidative stress (Nrf2-activating antioxidants)
- Cartilage and disc repair (collagen II, aggrecan and SOX9 expression)
- Bone remodelling (RANKL/OPG axes with vitamin D3 supplementation)

Vantax therefore, provides a novel formulation to reverse established structural degeneration through the combination of its anti-inflammatory, anti-catabolic and pro-anabolic actions.`,
  },
  "302": {
    id: "302",
    shortDescription: "A botanical blend targeting neurotransmitter imbalances and shared secondary drivers across ADHD, Parkinson's, Alzheimer's, and Autism Spectrum Disorder.",
    fullDescription: `Across ADHD, Parkinson's, Alzheimer's, and Autism Spectrum Disorder, clinical manifestations arise from a combination of specific neurotransmitter imbalances, shared secondary drivers (neuroinflammation, oxidative stress, mitochondrial impairment, and synaptic degradation). Neuzurin is a blend of botanicals targeting dopamine, acetylcholine, glutamate, and GABA signaling, thus, delivering crucial symptomatic relief.

In order to halt disease progression in Alzheimer's and Parkinson's, phytochemicals of Neuzurin prevent protein misfolding (Aβ, tau, α-synuclein).

Furthermore, loss of neurons in neurodegenerative conditions are optimally managed or reversed by agonistic actions of the botanicals on tropomyosin receptor kinase B (TrkB-FL).

Our Neuzurin is a key therapeutic option for neurological issues with realistic goals of symptomatic relief and neurotrophic support of synaptic plasticity, where patients can experience slow or reversed functional decline, and optimize patient outcomes.`,
  },
  "303": {
    id: "303",
    shortDescription: "A topical ointment targeting neuromuscular inflammation, oxidative stress, nociceptor sensitisation, and muscle regeneration.",
    fullDescription: `Topically applied Solafen Ointment aims at the neuromuscular targets including: Inflammation (COX-2/PGE₂, NF-κB, TNF-α, IL-1β/IL-6), oxidative stress (ROS abrogation via Nrf2 activation), nociceptor sensitisation (substance P/CGRP), Schwann-cell remyelination and muscle regeneration (IGF-1, Pax7/MyoD satellite-cell activation).

The ointment is advisedly combined with Vantax for enhanced cartilage repair, and reversed cartilage loss.

In most patients, Solafen Ointment can realistically deliver local anti-inflammatory, analgesic and pro-repair effects due to additive local penetration.`,
  },

  // ── Nephrology (401) ──────────────────────────────────────────────────────
  "401": {
    id: "401",
    shortDescription: "An adjunct formulation for AKI and CKD targeting mitochondrial dysfunction, ferroptosis, necroptosis, and the TGF-β/SMAD3 fibrosis cascade.",
    fullDescription: `Realistic adjunct management of AKI and CKD centres on interrupting a shared injury-maladaptive repair-fibrosis cascade. AKI is driven by proximal tubular mitochondrial dysfunction (loss of PGC-1α, impaired fatty-acid oxidation, NAD⁺ depletion), ROS overproduction, ferroptosis (GPX4/GSH depletion, lipid peroxidation) and necroptosis (RIPK1/3-MLKL).

Therefore, Glomefix represents a blend of specific fraction of edible vegetable with components activating Nrf2/HO-1, protecting mitochondria (SIRT1/3, AMPK, PGC-1α), inhibiting ferroptosis/necroptosis and exhibiting anti-inflammation (DAMPs/TLR2/4/NF-κB, NLRP3-IL-1β, TNF-α, IL-6, MCP-1/CCR2).

The central target set for slowing and ultimately reversing CKD is modulation of TGF-β/SMAD3. RAAS overactivation in CKD and glomerular hyperfiltration and podocyte injury are advisedly managed with ACE inhibitors/ARBs. Mineral-bone disturbance may benefit from vitamin D3 supplementation.

Once Glomefix is used alongside standard care for blood pressure and glucose control, the treatment therefore limits AKI-to-CKD transition, slows progression and ultimately restores lost kidney function.`,
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
    shortDescription: "A four-botanical blend targeting acid secretion, H. pylori, oesophageal reflux, oxidative stress, and tight-junction repair across GERD, peptic ulcer, and IBD.",
    fullDescription: `GERD, peptic ulcer and IBD centres on three major overlapping failures: excess or misdirected acid and aggressive factors, weakened mucosal defence, and dysregulated inflammation with impaired epithelial repair.

In GERD and ulcer disease, Gastrapep blends four major botanicals: A component inhibits the mechanistic basis for parietal-cell acid secretion. Another component exhibits bactericidal actions on H. pylori. The third targets reflux via oesophageal sphincter relaxation (GABA-B, mGluR5). Oxidative stress caused by accumulating ROS, lipid peroxidation, GSH depletion and Nrf2/HO-1 imbalance is reversed by the flavonoid class component of the botanical blend.

The last component addresses IBD by upregulating the expression of tight-junction proteins (claudin, occludin, ZO-1). Probiotics and prebiotics are advised as adjuncts.

Gastrapep therefore reverses chronic mucosal damage, Barrett's metaplasia and fibrotic strictures.`,
  },

  // ── Ophthalmology (701) ───────────────────────────────────────────────────
  "701": {
    id: "701",
    shortDescription: "A botanical formulation targeting both raised intraocular pressure and pressure-independent retinal ganglion cell neurodegeneration in glaucoma.",
    fullDescription: `Management of glaucoma centers on two linked problems: raised or poorly tolerated intraocular pressure (IOP), and a pressure-independent neurodegeneration of retinal ganglion cells (RGCs) that continues even when IOP is controlled.

On the pressure side, Breviflorex components inhibit aqueous humour production (carbonic anhydrase II/IV inhibition, and β2-adrenoceptor-cAMP blockage), tissue fibrosis/TM cell loss via blockage of TGF-β2/SMAD3 signaling.

On the pressure-independent neurodegeneration side, stressed RGCs, astrocyte/Müller glial reactivity, excitotoxicity and loss of retrograde neurotrophic transport (BDNF/TrkB, NGF) drive neuroinflammation which amplifies axonal injury. Breviflorex botanicals therefore offer neurotrophic support via Yamanaka factors gene upregulation (Oct4, Sox2, and Klf4), α2-adrenergic neuroprotection, Nrf2 activation, and naturally-occurring antioxidants/anti-inflammation.

Breviflorex therefore slows and potentially reverses RGC death and optic nerve cupping.`,
  },
}

export function getProductDescription(productId: string): ProductDescription | undefined {
  return productDescriptions[productId]
}

export function getAllProductDescriptions(): Record<string, ProductDescription> {
  return productDescriptions
}
