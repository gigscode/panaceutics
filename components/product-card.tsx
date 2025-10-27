'use client'

import Link from "next/link"
import Image from "next/image"
import { Research } from "@/lib/researches"
import { Price } from "@/components/ui/price"

export function ProductCard({ research }: { research: Research }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-44 w-full">
        <Image src={research.image} alt={research.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{research.title}</h3>
          {research.price ? <Price value={research.price} className="text-primary font-semibold" /> : null}
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{research.description}</p>

        {research.details ? (
          <details className="mt-3 text-sm text-muted-foreground">
            <summary className="cursor-pointer">More details</summary>
            <div className="mt-2">{research.details}</div>
          </details>
        ) : null}

        <div className="mt-4 flex items-center gap-3">
          <Link href="/contact" className="inline-block rounded-md bg-primary px-4 py-2 text-sm text-white">Enquire</Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Request brochure</a>
        </div>
      </div>
    </article>
  )
}