import { getAllCategoryData } from "@/lib/categories/category-data"
import { CategoryCard } from "@/components/category-card"

export const metadata = {
  title: "Explore Categories | Panaceutics",
  description: "Browse research and solutions by category at Panaceutics.",
}

export default function CategoriesPage() {
  // Get category data (NOT product data)
  // This ensures editing product data does NOT affect this page
  const categories = getAllCategoryData()

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Explore Panaceutics</h1>
          <p className="text-muted-foreground mt-2">Browse research categories and discover tailored solutions.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
