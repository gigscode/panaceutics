import Link from "next/link"
import Image from "next/image"
import { researches, getCategories } from "@/lib/researches"

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export const metadata = {
  title: "Explore Categories | Panaceutics",
  description: "Browse research and solutions by category at Panaceutics.",
}

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Explore Panaceutics</h1>
          <p className="text-muted-foreground mt-2">Browse research categories and discover tailored solutions.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            // pick representative image if available
            const repr = researches.find((r) => r.category === cat)
            return (
              <Link
                key={cat}
                href={`/explore/category/${slugify(cat)}`}
                className="group block rounded-2xl overflow-hidden shadow-lg bg-card"
              >
                <div className="relative h-44 w-full">
                  {repr?.image ? (
                    <Image src={repr.image} alt={cat} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{cat}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{repr?.description ?? "Explore research and solutions in this category."}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
