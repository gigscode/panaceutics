'use client'

import Link from "next/link"
import Image from "next/image"
import { Research } from "@/lib/researches"
import { Price } from "@/components/ui/price"

export function ProductCard({ research, forceCurrency }: { research: Research; forceCurrency?: 'NGN' | 'USD' }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-44 w-full">
        <Image src={research.image} alt={research.title} fill className="object-cover" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground max-w-[65%]">{research.title}</h3>
          <div className="text-right">
            {research.price ? (
              <div className="text-emerald-800 font-bold">
                <Price value={research.price} className="text-emerald-800 font-bold" forceCurrency={forceCurrency} />
              </div>
            ) : null}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{research.description}</p>

        {research.details ? (
          <div className="mt-3 text-sm text-muted-foreground">
            <button className="flex items-center gap-2 text-sm text-muted-foreground">
              <span aria-hidden>▸</span>
              <span>More details</span>
            </button>
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-4">
          <Link href="/contact" className="inline-block rounded-full bg-emerald-800 px-4 py-2 text-sm text-white">Enquire</Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Request brochure</a>
        </div>
      </div>
    </article>
  )
}