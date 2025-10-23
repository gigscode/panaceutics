"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import type { StorePreferences } from "@/lib/types"
import type { Product } from "@/lib/types"

interface ProductsClientProps {
  storePreferences: StorePreferences
}

export default function ProductsClient({  }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showSortFilter, setShowSortFilter] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)


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

  useEffect(() => {
    const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredProducts(filtered)
  }, [searchTerm, products])
  // const filteredProducts =
  //   selectedCategory === "All"
  //     ? storePreferences.products
  //     : storePreferences.products.filter((p) => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete range of scientifically-validated herbal solutions, each carefully selected for
            efficacy and quality.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="text-sm font-medium">Category</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCategoryFilter && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-48">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat)
                      setShowCategoryFilter(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      selectedCategory === cat ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <button
              onClick={() => setShowSortFilter(!showSortFilter)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="text-sm font-medium">Sort By</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortFilter && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-48">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "name", label: "Name: A to Z" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setShowSortFilter(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      sortBy === option.value ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center text-sm text-muted-foreground">{sortedProducts.length} products</div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString("en-NG")}</span>
                  </div>
                  <Link href={`/products/${product._id}`} className="w-full">
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No products found in this category.</p>
            <Button onClick={() => setSelectedCategory("All")} variant="outline">
              View All Products
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
