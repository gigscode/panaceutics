import { notFound } from "next/navigation"
import { findProductById } from "@/lib/categories"
import { ProductDetailPage } from "@/components/product-detail-page"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = findProductById(id)

  if (!product) {
    return {
      title: "Product Not Found | Panaceutics",
      description: "The requested product could not be found."
    }
  }

  return {
    title: `${product.title} | Panaceutics`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = findProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}

export async function generateStaticParams() {
  const { getAllProducts } = await import("@/lib/categories")
  const products = getAllProducts()

  return products.map((product) => ({
    id: product.id,
  }))
}
