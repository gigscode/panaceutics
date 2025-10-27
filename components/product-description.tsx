import { ProductDescription as ProductDescriptionType } from '@/lib/product-descriptions'

interface ProductDescriptionProps {
  description: ProductDescriptionType
  className?: string
}

export function ProductDescription({ description, className = '' }: ProductDescriptionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Full Description */}
      <div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description.fullDescription}
        </p>
      </div>

      {/* Benefits */}
      {description.benefits && description.benefits.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
          <ul className="space-y-2">
            {description.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ingredients */}
      {description.ingredients && description.ingredients.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Ingredients</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {description.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-gray-700 text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage Instructions */}
      {description.usage && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Instructions</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm leading-relaxed">{description.usage}</p>
          </div>
        </div>
      )}

      {/* Warnings */}
      {description.warnings && description.warnings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-3">Important Warnings</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="space-y-1">
              {description.warnings.map((warning, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">⚠</span>
                  <span className="text-red-700 text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}