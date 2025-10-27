"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Beaker } from "lucide-react"

import { researches } from "@/lib/researches"

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const categories = Array.from(new Set(researches.map((r) => r.category)))
  const filteredResearches = selectedCategory ? researches.filter((r) => r.category === selectedCategory) : researches

  // Refs to control animation and user interaction
  const rafIdRef = useRef<number | null>(null)
  const lastInteractionRef = useRef<number>(0) // timestamp of last user interaction
  const pauseAfterInteractionMs = 1200 // how long to wait after user interaction before auto-scroll resumes
  const scrollSpeed = 0.4 // px per frame (lower = slower)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // mark interaction
    const markInteraction = () => {
      lastInteractionRef.current = Date.now()
    }

    // Event handlers to detect user interaction
    const onPointerDown = () => markInteraction()
    const onWheel = () => markInteraction()
    const onTouchStart = () => markInteraction()
    const onPointerEnter = () => markInteraction()
    const onPointerMove = () => {} // optional if you want to detect dragging more precisely

    container.addEventListener("pointerdown", onPointerDown, { passive: true })
    container.addEventListener("wheel", onWheel, { passive: true })
    container.addEventListener("touchstart", onTouchStart, { passive: true })
    container.addEventListener("pointerenter", onPointerEnter)

    // Auto-scroll loop
    const step = () => {
      // if user interacted recently, pause
      const sinceInteraction = Date.now() - lastInteractionRef.current
      if (sinceInteraction < pauseAfterInteractionMs) {
        rafIdRef.current = requestAnimationFrame(step)
        return
      }

      // perform auto scroll
      if (container.scrollWidth > container.clientWidth) {
        // add scroll increment
        container.scrollLeft += scrollSpeed

        // when reaching the end, smoothly scroll back to start and pause briefly
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
          // smooth reset to start
          container.scrollTo({ left: 0, behavior: "smooth" })
          // pause auto-scrolling for a bit so user can view from start
          lastInteractionRef.current = Date.now()
        }
      }

      rafIdRef.current = requestAnimationFrame(step)
    }

    // start the loop
    rafIdRef.current = requestAnimationFrame(step)

    // cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      container.removeEventListener("pointerdown", onPointerDown)
      container.removeEventListener("wheel", onWheel)
      container.removeEventListener("touchstart", onTouchStart)
      container.removeEventListener("pointerenter", onPointerEnter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]) // restart when category changes

  return (
    <main className="min-h-screen bg-background">
      {/* Hero & Filter sections unchanged, omitted here for brevity (use your existing JSX) */}

      {/* Research Cards Auto-Scroll Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore Research</h2>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
            // helpful style to make touch interactions feel natural
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredResearches.map((research) => (
              <Link
                key={research.id}
                href={`/explore/${research.id}`}
                className="group relative flex-shrink-0 w-96 h-[28rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 snap-center"
              >
                <img
                  src={research.image || "/placeholder.svg"}
                  alt={research.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {research.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {research.title}
                  </h3>
                  <p className="text-base text-gray-300 mb-5 line-clamp-3">{research.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex flex-col gap-1">
                      <span>
                        {research.date
                          ? new Date(research.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""
                        }
                      </span>
                      <span>{research.readTime}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
