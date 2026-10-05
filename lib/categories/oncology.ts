import { Research } from '../researches'

export const oncologyProducts: Research[] = [
  {
    id: "201",
    title: "MyoFibrox®",
    category: "Oncology",
    description:
      "Myofibrox is a proprietary blend of four herbs with definitive action on four key pathological drivers of uterine fibroids. The first component antagonizes progesterone/PR-A/PR signaling. The second component is a dual inhibitor of intratumoral aromatase and 17β-HSD1.",
    image: "/images/myofibrox.png",
    price: { amount: 180000, currency: 'NGN' },
    details:
      "The third plant targets matrix remodelling via the profibrotic TGF-β/SMAD3 axis, while the last plant component is anti-proliferative and survival circuitry modulator acting via Wnt/β-catenin/PI3K/AKT/mTOR/MAPK/ERK. This formulation also benefits from the inherent blockage of NF-κB-driven inflammation, oxidative stress due to the ubiquitous flavonoid class present in medicinal plants. Patients are also encouraged daily doses of Vitamin D3 supplement, which restrains further proliferation and ECM deposition via vitamin D receptor and PPARγ pathways. Our proprietary MyoFibrox achieves substantial regression and symptom control in human patients.",
  },
  {
    id: "202",
    title: "Prostafexin®",
    category: "Oncology",
    description:
      "Prostafexin is a scientifically validated and standardized herbal formulation already established for centuries. One of the components achieve dual 5α-reductase/PDE5 inhibition thus, countering the ED effect of 5α-reductase inhibition. Another component specifically blocks α1A-adrenoceptor signalling, causing relaxation of the smooth muscle tissue in the prostate and bladder neck, thus, improving urinary flow and reduces lower urinary tract symptoms.",
    image: "/images/prostafexin.jpg",
    price: { amount: 150000, currency: 'NGN' },
    details:
      "Another component also modulates TGF-β/SMAD3-driven fibroblast-to-myofibroblast transition and collagen deposition and lastly, Bcl-2 upregulation, and Wnt/β-catenin/mTOR inhibition is achieved by the last component specifically adapted from MyoFibrox. The restoration of apoptosis drives regression. Patients on Prostafexin are also advised to take Sphenolax which reverses the Metabolic driver of BPH via hyperinsulinemia. Using this protocol, full reversal of established hyperplastic and fibrotic remodelling has been achieved in human patients.",
  },
  {
    id: "203",
    title: "Atxilox®",
    category: "Oncology",
    description:
      "Beyond any tissue-specific proliferative signals that drives oncogenesis, all pathways must ultimately cascade to cell-cycle; thus, our proprietary Atxilox is a carefully blended botanicals which specifically inhibits CDK4/6-cyclin D-Rb, recovers mitochondrial apoptosis evasion via Bcl-2/Bcl-xL/Mcl-1, XIAP/survivin downregulation and blockage of VEGF/VEGFR angiogenesis which sustains tumour vasculature.",
    image: "/images/atxilox.png",
    price: { amount: 200000, currency: 'NGN' },
    details:
      "A patient on Atxilox is also treated with Sphenolax and Nu-beta, these formulations jointly reverse Warburg metabolic effect and dyslipidemia. Since our preparation method is aimed at preserving the flavonoid-class within other key target phytochemicals, Inflammation and redox imbalance associated with carcinogenesis is blocked by the flavonoid-rich fraction via NF-κB/STAT3/COX-2/PGE₂/ROS pathways. Thus, Atxilox reduces tumour volume, and ultimately promotes patient survival as a single agent, and when combined with chemotherapy, it mitigates against therapy resistance.",
  },

  {
    id: "204",
    title: "Metaxin®",
    category: "Oncology",
    description:
      "In cancer patients, metastasis begins when cells at the primary tumour switch from a stable, cohesive state to an invasive one driven principally by hypoxia, inflammation and a stiffening, fibrotic stroma. Hypoxia stabilises HIF-1α, and together with TGF-β, Wnt and NF-κB signalling this activates EMT transcription factors (Snail, Twist, ZEB1). These repress E-cadherin, so cells lose adhesion to neighbours, gain a mesenchymal, motile phenotype, and acquire stem-like and survival traits.",
    image: "/images/metaxin.png",
    price: { amount: 200000, currency: 'NGN' },
    details:
      "At the same time, the cells remodel their surroundings. MMPs, uPA and cathepsins degrade the basement membrane, while LOX stiffens the collagen matrix. Integrin-FAK-Src and Rho/Rac signalling then reorganise the actin cytoskeleton so the cells can crawl through the matrix toward blood and lymphatic vessels. Tumour-derived VEGF creates leaky, abnormal vessels, and chemokine gradients (CXCL12/CXCR4, CCL2) draw cells toward them. Metaxin is proprietarily formulated to target HIF-1α/TGF-β/Wnt/NF-κB axes, its components also disrupt MMPs and inhibit PD/PDL1 for enhanced immune-surveillance.",
  },
]

