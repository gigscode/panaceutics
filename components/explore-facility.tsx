"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface FacilityImage {
  src: string
  alt: string
  caption: string
}

const facilityImages: FacilityImage[] = [
  { src: "/images/facility/facility-1.jpg", alt: "Research laboratory", caption: "State-of-the-art research laboratory" },
  { src: "/images/facility/facility-2.jpg", alt: "Herbal extraction unit", caption: "Herbal extraction and processing unit" },
  { src: "/images/facility/facility-3.jpg", alt: "Quality control lab", caption: "Quality control and testing lab" },
  { src: "/images/facility/facility-4.jpg", alt: "Phytochemistry analysis bay", caption: "Phytochemistry analysis bay" },
  { src: "/images/facility/facility-5.jpg", alt: "Greenhouse and plant nursery", caption: "Greenhouse and plant nursery" },
  { src: "/images/facility/facility-6.jpg", alt: "Formulation and production suite", caption: "Formulation and production suite" },
]

export default function ExploreFacility() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + facilityImages.length) % facilityImages.length))
  }, [])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % facilityImages.length))
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxIndex, prev, next])

  const current = lightboxIndex !== null ? facilityImages[lightboxIndex] : null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Explore Our Facility
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Take a look inside our state-of-the-art phytochemistry research facility — where ancient herbal wisdom meets modern science.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {facilityImages.map((img, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                <span className="text-white text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left leading-tight">
                  {img.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Facility image lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 md:left-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="90vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-5 py-4">
              <p className="text-white text-sm md:text-base font-medium">{current.caption}</p>
              <p className="text-white/60 text-xs mt-0.5">{lightboxIndex + 1} / {facilityImages.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 md:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  )
}

