import Link from "next/link"
import Image from "next/image"
import { researches, getCategories } from "@/lib/researches"

function unslugify(slug: string) {
  return slug.replace(/-/g, " ")
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  // find matching category by slug (case-insensitive)
  const categories = getCategories()
  const matched = categories.find((c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
  const title = matched ?? unslugify(slug)
  const items = matched ? researches.filter((r) => r.category === matched) : []

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{items.length} result{items.length !== 1 ? "s" : ""}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((r) => (
            <Link key={r.id} href={`/explore/${r.id}`} className="group block rounded-2xl overflow-hidden shadow-sm bg-card hover:shadow-md transition-all">
              <div className="relative h-44 w-full">
                <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{r.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
