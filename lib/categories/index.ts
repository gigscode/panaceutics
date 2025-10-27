import { Research } from '../researches'
import { metabolicSyndromeProducts } from './metabolic-syndrome'
import { oncologyProducts } from './oncology'
import { neurologyProducts } from './neurology'
import { nephrologyProducts } from './nephrology'
import { hematologyProducts } from './hematology'
import { infectologyProducts } from './infectiology'
import { retinologyProducts } from './retinology'

// Map category names to their independent product arrays
const categoryProductsMap: Record<string, Research[]> = {
  'Metabolic syndrome': metabolicSyndromeProducts,
  'Oncology': oncologyProducts,
  'Neurology': neurologyProducts,
  'Nephrology': nephrologyProducts,
  'Hematology': hematologyProducts,
  'Infectiology': infectologyProducts,
  'Retinology': retinologyProducts,
}

/**
 * Get all products for a specific category
 * Each category has its own independent product data
 */
export function getCategoryProducts(category: string): Research[] {
  return categoryProductsMap[category] || []
}

/**
 * Get all available categories
 */
export function getAllCategories(): string[] {
  return Object.keys(categoryProductsMap)
}

/**
 * Get all products across all categories
 */
export function getAllProducts(): Research[] {
  return Object.values(categoryProductsMap).flat()
}

/**
 * Find a product by ID across all categories
 */
export function findProductById(id: string): Research | undefined {
  return getAllProducts().find((p) => p.id === id)
}

/**
 * Get products from the same category as the given product
 */
export function getRelatedProducts(productId: string, limit: number = 4): Research[] {
  const product = findProductById(productId)
  if (!product) return []
  
  return getAllProducts()
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}

