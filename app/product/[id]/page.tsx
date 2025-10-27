import { notFound } from "next/navigation"
import { findProductById } from "@/lib/categories"
import { ProductDetailPage } from "@/components/product-detail-page"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  
  // Find the product by ID across all categories
  const product = findProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}

export async function generateStaticParams() {
  // This will pre-generate pages for all products at build time
  const { getAllProducts } = await import("@/lib/categories")
  const products = getAllProducts()
  
  return products.map((product) => ({
    id: product.id,
  }))
}