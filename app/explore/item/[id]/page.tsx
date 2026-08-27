import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { findById } from "@/lib/researches"

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function ResearchItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = findById(id)
  if (!item) return notFound()

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href={`/explore/${slugify(item.category)}`} className="text-sm text-primary hover:underline mb-4 inline-block">
          ← Back to {item.category}
        </Link>

        <article className="mt-4 bg-card rounded-2xl overflow-hidden shadow-md">
          <div className="relative h-72 w-full">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{item.category} • {item.readTime ?? ""}</p>

            <div className="mt-6 prose prose-invert max-w-none text-foreground">
              <p>{item.description}</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
