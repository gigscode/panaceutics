import { getStorePreferences } from "@/lib/api"
import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const storePreferences = await getStorePreferences()

  // Find the product by slug
  const product = [...storePreferences.products, ...storePreferences.featuredProducts].find((p) => p._id === id)

  if (!product) {
    notFound()
  }

  // Find related products (same category)
  const relatedProducts = storePreferences.products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4)

  return (
    <ProductDetail
      // product={product}
      // relatedProducts={relatedProducts}
      colors={storePreferences.colors}
      cardLayout={storePreferences.productCardLayout}
    />
  )
}

