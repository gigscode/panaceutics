"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Research } from "@/lib/researches"
import { Price } from "@/components/ui/price"
import { getAllProducts } from "@/lib/categories"
import { getProductDescription } from "@/lib/product-descriptions"
import { ProductDescription } from "./product-description"
import { ShopProductCard } from "./shop-product-card"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

interface ProductDetailPageProps {
  product: Research
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1)

  // Get detailed product description
  const productDescription = getProductDescription(product.id)

  // Get related products from the same category
  const allProducts = getAllProducts()
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${quantity} of ${product.title} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/explore/categories"
            className="inline-flex items-center text-emerald-800 hover:text-emerald-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Price */}
            {product.price && (
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-emerald-800">
                  <Price value={product.price} className="text-emerald-800" />
                </div>
                {product.comparePrice && (
                  <div className="text-lg text-gray-500 line-through">
                    <Price value={product.comparePrice} className="text-gray-500" />
                  </div>
                )}
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating!)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              {productDescription ? (
                <ProductDescription description={productDescription} />
              ) : (
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  {product.details && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Additional Details
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.details}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ShopProductCard
                  key={relatedProduct.id}
                  research={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}