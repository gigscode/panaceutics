import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: "101",
    name: "Nubeta 500mg Capsule",
    description:
      "Upgregulation of UCP-1 in the white adipose tissue resulting in weight loss. Depletes stored fat.",
    price: 75000,
    image: "/images/nubeta.jpg",
    href: "/explore/metabolic-syndrome",
  },
  {
    id: "102",
    name: "Sphenolax\u00ae",
    description:
      "Strongly activates TGR5. Weak GLP1 receptor agonism. Strongly inhibits DYRK1A. Hypoglycemic overall effect on prolonged usage.",
    price: 65000,
    image: "/images/sphenolax.png",
    href: "/explore/metabolic-syndrome",
  },
  {
    id: "103",
    name: "BPVomin\u00ae",
    description:
      "A bi-herbal formulation for RAAS modulation and blood pressure control.",
    price: 75000,
    image: "/images/bpvomin.jpg",
    href: "/explore/nephrology",
  },
  {
    id: "104",
    name: "Exigencin\u00ae",
    description:
      "Exigencin mediates blood fibrinolysis. Delays and prevents blood clotting. May acts as blood thinner.",
    price: 180000,
    image: "/images/exigencin.png",
    href: "/explore/neurology",
  },
]

function formatPrice(amount: number) {
  return `NGN ${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
}

export function HomepageProducts() {
  return (
    <section className="py-14 md:py-20 bg-[#f4f6f1]">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
              Our Products
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Science-Backed Formulations
            </h2>
          </div>
          <Link
            href="/explore/categories"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards — each fixed at w-96 matching the explore carousel cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col w-full"
            >
              {/* Image area */}
              <div className="relative h-56 md:h-64 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-base md:text-lg text-foreground mb-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-primary mb-4">
                  {formatPrice(product.price)}
                </p>

                {/* Buy Now */}
                <Link href={product.href} className="block">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                    Buy Now
                  </button>
                </Link>

                {/* Learn more */}
                <Link
                  href={product.href}
                  className="mt-3 flex items-center justify-center gap-1 text-xs text-primary hover:underline underline-offset-4"
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
