import { Research } from '../researches'

export const neurologyProducts: Research[] = [
  {
    id: "301",
    title: "VanTax®",
    category: "Neurology",
    description:
      "Vantax is carefully formulated to inhibit the production of hyper-inflammatory cytokines (TNF-alpha/IL-1beta, and MMP13), key mediators of OA progression.",
    image: "/images/vantax.png",
    price: { amount: 10000, currency: 'NGN' },
    details:
      "In chondrocytes, Vantax promotes differentiation and matrix formation. Vantax when combined with Neuzurin provides significant relief by relieving local inflammation from the nerve and topically applied Solafen Ointment acts as analgesic, and muscle relaxant for management of sciatic nerve pain.",
  },
  {
    id: "302",
    title: "Neuzurin®",
    category: "Neurology",
    description:
      "Neuzurin possess antioxidant properties with the potential to improve neuropsychological symptoms in ASD-like models through improved astrocytes function characterized by S100B gene downregulation",
    image: "/images/neuzurin.jpg",
    price: { amount: 10000, currency: 'NGN' },
    details:
      "Neuzurin also modulates microglial immune-inflammatory responses through inhibition of TLR-mediated signaling, and oxidative stress.",
  },
  {
    id: "303",
    title: "Solafen Ointment®",
    category: "Neurology",
    description:
      " Solafen Ointment acts as analgesic, and muscle relaxant for management of sciatic nerve pain",
    image: "/images/solafen.jpg",
    price: { amount: 10000, currency: 'NGN' },
    details:
      "Solafen Ointment topically applied, with Vantax when combined with Neuzurin provides significant relief by relieving local inflammation from the nerve  ",
  },
]

