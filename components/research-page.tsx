"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface ResearchPageProps {
  title: string
  content: string
}

export function ResearchPage({ title, content }: ResearchPageProps) {
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">References</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>1. American Heart Association - Circulation Journal</p>
              <p>2. National Center for Biotechnology Information</p>
              <p>3. Frontiers in Pharmacology</p>
              <p>4. Pan African Medical Journal</p>
              <p>5. South African Family Practice Journal</p>
              <p>6. Various peer-reviewed medical journals and research publications</p>
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