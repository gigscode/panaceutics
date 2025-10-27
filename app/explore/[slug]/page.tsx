import { researches, getCategories } from "@/lib/researches"
import { ShopProductCard } from "@/components/shop-product-card"
import { getCategoryOverride } from "@/lib/category-overrides"
import Image from "next/image"
import Link from "next/link"

function unslugify(slug: string) {
  return slug.replace(/-/g, " ")
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const categories = getCategories()
  const matched = categories.find((c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
  const title = matched ?? unslugify(slug)
  const items = matched ? researches.filter((r) => r.category === matched) : []
  const override = getCategoryOverride(slug)
  // choose exactly 4 products to show: category items first, then fill from other researches
  const productsToShow = (() => {
    const desired = 4
    const fromCategory = items.slice(0, desired)
    if (fromCategory.length === desired) return fromCategory
    const others = researches.filter((r) => r.category !== matched)
    const fill = others.slice(0, Math.max(0, desired - fromCategory.length))
    return fromCategory.concat(fill)
  })()

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{items.length} result{items.length !== 1 ? "s" : ""}</p>
        </header>

        {/* Custom layout for categories with overrides (hero + publications + products) */}
        {override && override.customLayout ? (
          <>
            <section className="mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-1">
                  <div className="rounded-2xl overflow-hidden bg-muted h-64 w-full relative">
                    <Image
                      src={override.heroImage ?? (items[0]?.image ?? "/ginger.jpg")}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-foreground">{override.title ?? title}</h2>
                  <p className="text-muted-foreground mt-3 max-w-3xl">{override.description ?? `Explore our research and product offerings for ${title}.`}</p>

                  <div className="mt-6 flex items-center gap-4">
                    {override.downloadLink ? (
                      <Link href={override.downloadLink} className="inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-white">Download Research</Link>
                    ) : null}

                    {override.publicationsLink ? (
                      <a href={override.publicationsLink} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Publications from Research</a>
                    ) : null}
                  </div>

                  <div className="mt-6 text-sm text-muted-foreground">{items.length ? items[0].description : `We are developing targeted solutions for ${title.toLowerCase()}.`}</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Products</h2>
              <p className="text-muted-foreground mb-6">Discover our scientifically-validated herbal solutions</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsToShow.map((research) => (
                  <ShopProductCard key={research.id} research={research} forceCurrency={'NGN'} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link href="/explore/categories" className="inline-block rounded-md border border-muted px-6 py-2 text-sm">View All Products</Link>
              </div>
            </section>
          </>
        ) : (
          <>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((research) => (
                  <ShopProductCard key={research.id} research={research} forceCurrency={'NGN'} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
