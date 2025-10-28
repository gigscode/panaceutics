import { Research } from '../researches'

export const oncologyProducts: Research[] = [
  {
    id: "201",
    title: "MyoFibrox®",
    category: "Oncology",
    description:
      "MyoFibrox® is a polyherbal formulation exhibiting combinatorial mechanism of action aimed at reducing uterine size. First, MyoFibrox ® weakly inhibits nuclear receptor subfamily 3, group C, member 3 (progesterone receptor) and estrogen receptor (ER).",
    image: "/images/myofibrox.png",
    price: { amount: 25000, currency: 'NGN' },
    details:
      "Since progesterone increases Bcl-2 protein expression in fibroid cells, which is a major factor driving their growth. Treatment with progesterone receptor modulators can reduce fibroid size by decreasing Bcl-2 levels and promoting apoptosis. MyoFibrox® is also a strong repressor of IGF-1/2 expression leading to blockage in uterine angiogenesis. TGF-β downstream signaling responsible for the abnormal growth and fibrotic nature of fibroids are blocked by MyoFibrox® treatment. ",
  },
  {
    id: "202",
    title: "Prostafexin®",
    category: "Oncology",
    description:
      "Prostafexin® is a polyherbal formulation exhibiting combinatorial mechanism of action aimed at reducing prostate size. First, Prostafexin® specifically inhibits prostate 5α-reductase type 2.",
    image: "/images/prostafexin.jpg",
    price: { amount: 25000, currency: 'NGN' },
    details:
      "Prostafexin® weakly targets androgen receptor (AR) and blocks prostatic development.  Prostafexin® also has component which targets The Mammalian Target of Rapamycin (mTOR) kinase. mTOR has been shown to control prostate cell growth, proliferation and energy metabolism.  Finally, Prostafexin® potentiates the action of dutasteride/tamsulosin, thus, reducing the time for disease burden. ",
  },
  {
    id: "203",
    title: "Atxilox®",
    category: "Oncology",
    description:
      "Atxilox® is a polyherbal formulation exhibiting varying mechanism of action. First, Atxilox® inhibits The Mammalian Target of Rapamycin (mTOR) kinase.",
    image: "/images/atxilox.png",
    price: { amount: 25000, currency: 'NGN' },
    details:
      "mTOR controls cell growth, proliferation and energy metabolism (Reprogramming Energy Metabolism).3 Therefore, inhibiting mTOR leads to cell cycle arrest and metabolic starvation. Secondly, Atxilox® acts as VEGFR kinase inhibitor which blocks oncogenic angiogenesis, also, weak dual BRAF inhibitors with MEK inhibitory actions have been demonstrated in , Atxilox®.",
  },

  {
    id: "204",
    title: "Metaxin®",
    category: "Oncology",
    description:
      "Metaxin® modulates Epithelial-Mesenchymal Transition (EMT), whereas tumour cells loose adhesion to the primary tumor and extracellular matrix (ECM) promoted by proteolytic degradation of the ECM by enzymes like matrix metalloproteinases (MMPs); and the activation of signaling pathways that promote cell motility and survival. Broadly, Metaxin® has two mechanisms of action.",
    image: "/images/metaxin.png",
    price: { amount: 25000, currency: 'NGN' },
    details:
      "Metaxin® inhibits MMP-3 and MMP-9 and secondly, promotes the activation of tumor-associated-macrophages (M1-type) within the cancerous tissues through increased Interferon-gamma (IFN-γ) production within the tumour micro-environment. Additionally, Metaxin® contains complex blend of flavonoids which inhibit PD/PDL1 interaction, thus, reactivates the body's immune system to attack cancer cells. ",
  },
]

