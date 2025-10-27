"use client"

import Link from "next/link"
import Image from "next/image"
import { Research } from "@/lib/researches"
import { Price } from "@/components/ui/price"

export function ShopProductCard({ research, forceCurrency }: { research: Research; forceCurrency?: 'NGN' | 'USD' }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent hover:shadow-md transition-shadow duration-150">
      <div className="relative bg-white">
        <div className="relative h-44 w-full bg-white">
          <Image src={research.image} alt={research.title} fill className="object-cover" />
        </div>
      </div>

      <div className="p-5 bg-white">
        <h3 className="text-base font-semibold text-foreground mb-2">{research.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{research.description}</p>

        <div>
          {research.price ? (
            <div className="text-emerald-800 font-extrabold text-lg">
              <Price value={research.price} className="text-emerald-800" forceCurrency={forceCurrency} />
            </div>
          ) : null}

          <div className="mt-4">
            <Link href={`/product/${research.id}`} className="block w-full text-center rounded-md bg-emerald-800 text-white py-2 text-sm font-medium hover:bg-emerald-900">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
