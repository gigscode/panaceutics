/**
 * CategoryCard Component
 * 
 * Displays a category card with category-level information
 * Used on:
 * - Homepage explore section
 * - /explore/categories page
 * 
 * This is SEPARATE from ShopProductCard which displays individual products
 * 
 * Editing category data in lib/categories/category-data.ts will update these cards
 * Editing product data in lib/categories/[category-name].ts will NOT affect these cards
 */

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CategoryData } from "@/lib/categories/category-data"

interface CategoryCardProps {
  category: CategoryData
  variant?: "grid" | "carousel"
}

export function CategoryCard({ category, variant = "grid" }: CategoryCardProps) {
  if (variant === "carousel") {
    return (
      <Link
        href={`/explore/${category.slug}`}
        className="group relative flex-shrink-0 w-96 h-[28rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 snap-center"
      >
        <img
          src={category.categoryImage || "/placeholder.svg"}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-white">
              {category.name}
            </span>
          </div>
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {category.name}
          </h3>
          <p className="text-base text-gray-300 mb-5 line-clamp-3">{category.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    )
  }

  // Grid variant (for categories page)
  return (
    <Link
      href={`/explore/${category.slug}`}
      className="group block rounded-2xl overflow-hidden shadow-lg bg-card hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-44 w-full">
        <Image
          src={category.categoryImage || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  )
}

