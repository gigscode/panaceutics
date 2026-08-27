"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { getAllProducts, getAllCategories } from "@/lib/categories"
import { formatPrice } from "@/lib/currency"

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showSortFilter, setShowSortFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Static data — no API call needed
  const allProducts = useMemo(() => getAllProducts(), [])
  const categories = useMemo(() => ["All", ...getAllCategories()], [])

  const sortedProducts = useMemo(() => {
    let filtered = allProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
      )
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price?.amount ?? 0) - (b.price?.amount ?? 0)
        case "price-high":
          return (b.price?.amount ?? 0) - (a.price?.amount ?? 0)
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [allProducts, selectedCategory, sortBy, searchTerm])

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

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-56"
          />

          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => { setShowCategoryFilter(!showCategoryFilter); setShowSortFilter(false) }}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <span className="font-medium">{selectedCategory === "All" ? "Category" : selectedCategory}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCategoryFilter && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowCategoryFilter(false) }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
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
              onClick={() => { setShowSortFilter(!showSortFilter); setShowCategoryFilter(false) }}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <span className="font-medium">Sort By</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortFilter && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "name", label: "Name: A to Z" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setSortBy(option.value); setShowSortFilter(false) }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === option.value ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg?height=192&width=192"}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-primary mb-2">{product.category}</p>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">
                      {product.price ? formatPrice(product.price) : "Contact for price"}
                    </span>
                  </div>
                  <Link href={`/product/${product.id}`} className="w-full">
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
            <p className="text-lg text-muted-foreground mb-4">No products found.</p>
            <Button
              onClick={() => { setSelectedCategory("All"); setSearchTerm("") }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
