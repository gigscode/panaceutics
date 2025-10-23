"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { useEffect, useState } from "react"

interface FeaturedProductsClientProps {
  products: Product[]
}

export default function FeaturedProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data.data || data)
        setFilteredProducts(data.data || data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our scientifically-validated herbal solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg?height=192&width=192&query=herbal product"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs font-semibold text-primary mb-2">{product.category}</p>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString("en-NG")}</span>
                </div>
                <Link href={`/products/${product._id}`} className="mt-4">
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
