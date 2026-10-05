import { Research } from '../researches'

export const neurologyProducts: Research[] = [
  {
    id: "301",
    title: "VanTax®",
    category: "Neurology",
    description:
      "Key physiological processes drive spondylotic and arthritic changes in joints (disk degeneration, facet joint wear, and bone spurs) whilst some patients are asymptomatic, others experience joint stiffness, mild to severe pain, and nerve pressure (numbness, tingling, or weakness). Management and treatment options include: Physical therapy, drug-based pain management (anti-inflammatory drugs (NSAIDs) to reduce swelling and discomfort or steroid shots near the joint or nerve to give short-term relief).",
    image: "/images/vantax.png",
    price: { amount: 65000, currency: 'NGN' },
    details:
      "Our proprietary VanTax blends carefully selected botanicals to address four key pathobiologies: Inflammation and catabolic signalling (COX-2/NF-κB inhibition, IL-1/TNF/IL-6 modulation, JAK/STAT), Matrix degradation (MMP-3/13 and ADAMTS-4/5 cleave collagen II and aggrecan) and oxidative stress (Nrf2-activating antioxidants), Cartilage and disc repair (collagen II, aggrecan and SOX9 expression), and Bone remodelling (RANKL/OPG axes with vitamin D3 supplementation). Vantax therefore, provides a novel formulation to reverse established structural degeneration through the combination of its anti-inflammatory, anti-catabolic and pro-anabolic actions.",
  },
  {
    id: "302",
    title: "Neuzurin®",
    category: "Neurology",
    description:
      "Across ADHD, Parkinson's, Alzheimer's, and Autism Spectrum Disorder, clinical manifestations arise from a combination of specific neurotransmitter imbalances, shared secondary drivers (neuroinflammation, oxidative stress, mitochondrial impairment, and synaptic degradation). Neuzurin is a blend of botanicals targeting dopamine, acetylcholine, glutamate, and GABA signaling, thus, delivering crucial symptomatic relief.",
    image: "/images/neuzurin.jpg",
    price: { amount: 150000, currency: 'NGN' },
    details:
      "In order to halt disease progression in Alzheimer's and Parkinson's, phytochemicals of Neuzurin prevent protein misfolding (Aβ, tau, α-synuclein). Furthermore, loss of neurons in neurodegenerative conditions are optimally managed or reversed by agonistic actions of the botanicals on tropomyosin receptor kinase B (TrkB-FL). Our Neuzurin is a key therapeutic option for neurological issues with a realistic goals symptomatic relief, neurotrophic support of synaptic plasticity, where patients can experience slow or reversed functional decline, and optimize patient outcomes.",
  },
  {
    id: "303",
    title: "Solafen Ointment®",
    category: "Neurology",
    description:
      "Topically applied Solafen Ointment aims at the neuromuscular targets including: Inflammation (COX-2/PGE₂, NF-κB, TNF-α, IL-1β/IL-6), oxidative stress (ROS abrogation via Nrf2 activation), nociceptor sensitisation (substance P/CGRP), Schwann-cell remyelination and muscle regeneration (IGF-1, Pax7/MyoD satellite-cell activation).",
    image: "/images/solafen.jpg",
    price: { amount: 45000, currency: 'NGN' },
    details:
      "The ointment is advisedly combined with Vantax for enhanced cartilage repair, and reversed cartilage loss. In most patients, Solafen Ointment can realistically deliver local anti-inflammatory, analgesic and pro-repair effects due to additive local penetration.",
  },
]

