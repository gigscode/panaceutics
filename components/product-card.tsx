'use client'

import Link from "next/link"
import Image from "next/image"
import { Research } from "@/lib/researches"
import { Price } from "@/components/ui/price"

export function ProductCard({ research, forceCurrency }: { research: Research; forceCurrency?: 'NGN' | 'USD' }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent hover:shadow-md transition-shadow duration-150">
      <div className="relative bg-white">
        <div className="relative h-44 w-full bg-white">
          <Image src={research.image} alt={research.title} fill className="object-contain p-6" />
        </div>
        {research.rating ? (
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-xs flex items-center gap-1 shadow">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{research.rating.toFixed(1)}</span>
          </div>
        ) : null}
      </div>

      <div className="p-5 bg-white">
        <h3 className="text-base font-semibold text-foreground mb-2">{research.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{research.description}</p>

        <div className="flex items-end justify-between gap-4">
          <div>
            {research.price ? (
              <div className="flex items-center gap-3">
                <div className="text-emerald-800 font-extrabold text-lg">
                  <Price value={research.price} className="text-emerald-800" forceCurrency={forceCurrency} />
                </div>
                {research.comparePrice ? (
                  <div className="text-sm text-muted-foreground line-through">{research.comparePrice ? (
                    <Price value={research.comparePrice} className="text-muted-foreground text-sm line-through" forceCurrency={forceCurrency} />
                  ) : null}</div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div>
            <Link href="#" className="inline-flex items-center gap-2 rounded-md border border-muted px-4 py-2 text-sm text-foreground bg-surface hover:bg-surface/90">
              View Details
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}