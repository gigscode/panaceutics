import { researches, getCategories } from "@/lib/researches"
import { ProductCard } from "@/components/product-card"

function unslugify(slug: string) {
  return slug.replace(/-/g, " ")
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
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

        {/* Problem statement / intro for the category (product page style) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">{`Explore our research and product offerings for ${title}. Below you'll find a short problem statement and product cards with pricing and details to help you evaluate solutions in this category.`}</p>

          <div className="mt-4 bg-surface p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Problem statement</h3>
            <p className="text-muted-foreground mt-2">{items.length ? items[0].description : `We are developing targeted solutions for ${title.toLowerCase()}.`} </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Products & Research</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((research) => (
              <ProductCard key={research.id} research={research} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
