"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface ResearchPageProps {
  title: string
  content: string
  citations?: 'metabolic-syndrome' | 'oncology' | 'default'
}

export function ResearchPage({ title, content, citations = 'default' }: ResearchPageProps) {
  // Parse the markdown content into sections
  const parseContent = (text: string) => {
    const sections = text.split('\n\n').filter(section => section.trim())
    return sections.map((section, index) => {
      const lines = section.split('\n')
      const firstLine = lines[0]
      
      // Check if it's a heading
      if (firstLine.includes(':') && !firstLine.startsWith('•') && !firstLine.startsWith('-')) {
        return {
          type: 'heading',
          content: firstLine,
          body: lines.slice(1).join('\n'),
          key: index
        }
      }
      
      // Check if it's a list
      if (section.includes('•') || section.includes('-')) {
        return {
          type: 'list',
          content: section,
          key: index
        }
      }
      
      // Regular paragraph
      return {
        type: 'paragraph',
        content: section,
        key: index
      }
    })
  }

  const sections = parseContent(content)

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'heading':
        return (
          <div key={section.key} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-emerald-600 pb-2">
              {section.content}
            </h2>
            {section.body && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            )}
          </div>
        )
      
      case 'list':
        const listItems = section.content.split('\n').filter((line: string) => line.trim())
        return (
          <div key={section.key} className="mb-6">
            <ul className="space-y-2">
              {listItems.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-emerald-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{item.replace(/^[•-]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      
      default:
        return (
          <div key={section.key} className="mb-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/explore/metabolic-syndrome"
            className="inline-flex items-center text-emerald-800 hover:text-emerald-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Metabolic Syndrome
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">
            Comprehensive research and therapeutic approaches
          </p>
        </div>

        {/* Research Table */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-emerald-800 text-white p-4">
              <h3 className="text-lg font-semibold">Metabolic Syndrome Diagnostic Criteria Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">NCEP-ATP III (2004)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">IDF (2005) (Europid)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">African Optimal WC Recommendations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Central Obesity (WC)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Men: ≥ 102 cm / Women: ≥ 88 cm</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Required: Men: ≥ 94 cm / Women: ≥ 80 cm</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Men: ≥ 86 cm / Women: 80.3–92 cm</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Triglycerides (TG)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 150 mg/dL (1.7 mmol/L) or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 150 mg/dL (1.7 mmol/L) or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 150 mg/dL (1.7 mmol/L) or drug treatment</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">HDL Cholesterol (HDL-C)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Men: &lt; 40 mg/dL / Women: &lt; 50 mg/dL or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Men: &lt; 40 mg/dL / Women: &lt; 50 mg/dL or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Men: &lt; 40 mg/dL / Women: &lt; 50 mg/dL or drug treatment</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Blood Pressure (BP)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 130/85 mmHg or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 130/85 mmHg or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 130/85 mmHg or drug treatment</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Fasting Glucose (FPG)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 100 mg/dL or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 100 mg/dL or drug treatment</td>
                    <td className="px-4 py-3 text-sm text-gray-700">≥ 100 mg/dL or drug treatment</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-600">
                Comparison of diagnostic criteria for Metabolic Syndrome across different organizations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <article className="prose prose-lg max-w-none">
            {sections.map(renderSection)}
          </article>

          {/* References Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Works Cited</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <p>
                1. <a href="https://www.ahajournals.org/doi/10.1161/circulationaha.105.169405" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metabolic syndrome: a comprehensive perspective based on interactions between obesity, diabetes, and inflammation - American Heart Association
                </a>, accessed October 26, 2025
              </p>
              <p>
                2. <a href="https://www.ncbi.nlm.nih.gov/books/NBK459248/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metabolic Syndrome - StatPearls - NCBI Bookshelf
                </a>, accessed October 26, 2025
              </p>
              <p>
                3. <a href="https://pubmed.ncbi.nlm.nih.gov/38410415/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metabolic syndrome and cardiovascular disease: mechanisms and therapeutic approaches - PubMed
                </a>, accessed October 26, 2025
              </p>
              <p>
                4. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3263198/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  The metabolic syndrome: an overview and proposed mechanisms - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                5. <a href="https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2024.1364881/full" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Pharmacological interventions for metabolic syndrome: current evidence and future directions - Frontiers in Pharmacology
                </a>, accessed October 26, 2025
              </p>
              <p>
                6. <a href="https://www.mdpi.com/2227-9067/10/3/473" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metabolic Syndrome in Children and Adolescents: Diagnostic Criteria and Prevention - MDPI
                </a>, accessed October 26, 2025
              </p>
              <p>
                7. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3064018/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Waist circumference cut-off points for the identification of abdominal obesity among adults in Africa - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                8. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11981207/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Optimal waist circumference cut-off points for metabolic syndrome in African populations - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                9. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10374159/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Prevalence of metabolic syndrome in Africa: a systematic review and meta-analysis - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                10. <a href="https://www.panafrican-med-journal.com/content/article/23/19/full/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metabolic syndrome among adults in Nigeria: a systematic review - Pan African Medical Journal
                </a>, accessed October 26, 2025
              </p>
              <p>
                11. <a href="https://safpj.co.za/index.php/safpj/article/view/5959/9047" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Prevalence and components of metabolic syndrome in North-Western Nigeria - South African Family Practice
                </a>, accessed October 26, 2025
              </p>
              <p>
                12. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3304358/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Incretin-based therapies for type 2 diabetes mellitus - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                13. <a href="https://www.mdpi.com/2673-4540/5/3/23" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Pharmacological Management of Metabolic Syndrome: A Comprehensive Review - MDPI Diabetology
                </a>, accessed October 26, 2025
              </p>
              <p>
                14. <a href="https://www.scirp.org/journal/paperinformation?paperid=138153" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Antihypertensive medications in metabolic syndrome management - Scientific Research Publishing
                </a>, accessed October 26, 2025
              </p>
              <p>
                15. <a href="https://www.researchgate.net/publication/343345780_An_updated_review_of_pharmacokinetic_drug_interactions_and_pharmacogenetics_of_statins" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  An updated review of pharmacokinetic drug interactions and pharmacogenetics of statins - ResearchGate
                </a>, accessed October 26, 2025
              </p>
              <p>
                16. <a href="https://www.researchgate.net/publication/384545922_Determination_of_Pharmacokinetic_and_Toxicological_Parameters_of_Some_Commonly_Used_Statin_Group_Drugs" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Determination of Pharmacokinetic and Toxicological Parameters of Some Commonly Used Statin Group Drugs - ResearchGate
                </a>, accessed October 26, 2025
              </p>
              <p>
                17. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10236989/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metformin: mechanisms of action and clinical applications - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                18. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5397288/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Metformin-associated lactic acidosis and vitamin B12 deficiency - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                19. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11818918/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  GLP-1 receptor agonists: efficacy and safety profile in metabolic disorders - PMC
                </a>, accessed October 26, 2025
              </p>
              <p>
                20. <a href="https://www.mdpi.com/2673-4540/5/5/35" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Alternative and Complementary Medicine in Metabolic Syndrome Management - MDPI Diabetology
                </a>, accessed October 26, 2025
              </p>
              <p>
                21. <a href="https://doi.org/10.3390/diabetology5050035" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">
                  Traditional African Medicine and Modern Healthcare Integration - Diabetology
                </a>, accessed October 26, 2025
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Explore Our Metabolic Syndrome Solutions
            </h3>
            <p className="text-gray-600 mb-6">
              Discover our scientifically-backed herbal formulations designed to address metabolic syndrome components.
            </p>
            <Link
              href="/explore/metabolic-syndrome"
              className="inline-block bg-emerald-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-900 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}