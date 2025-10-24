"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Beaker } from "lucide-react"

interface Research {
    id: string
    title: string
    category: string
    description: string
    image: string
   
}

// ... (Research interface and researches array unchanged) ...
const researches: Research[] = [
    {
        id: "1",
        title: "Phytochemical Analysis of Ginger Root",
        category: "Botanical Research",
        description:
            "Comprehensive study on the bioactive compounds found in ginger and their therapeutic potential in inflammation management.",
        image: "/ginger.jpg",
        
    },
    {
        id: "2",
        title: "Turmeric Curcumin: Clinical Efficacy Studies",
        category: "Clinical Trials",
        description:
            "Evidence-based research demonstrating the effectiveness of curcumin in supporting joint health and cognitive function.",
        image: "/herbthree.jpg",
       
    },
    {
        id: "3",
        title: "Ashwagandha and Stress Response Mechanisms",
        category: "Adaptogenic Research",
        description:
            "In-depth analysis of how ashwagandha interacts with the body's stress response system and cortisol regulation.",
        image: "/physioresearch.jpg",
        
    },
    {
        id: "4",
        title: "Standardized Herbal Extracts: Quality & Potency",
        category: "Quality Assurance",
        description:
            "Methodology for ensuring consistent bioavailability and potency in standardized herbal extract formulations.",
        image: "/herbal-extract.jpg",
        
    },
    {
        id: "5",
        title: "Synergistic Effects of Herbal Combinations",
        category: "Formulation Science",
        description:
            "Research on how combining multiple botanicals creates enhanced therapeutic effects through complementary mechanisms.",
        image: "/herbal_conbo.jpg",
        
    },
]

export default function Explore() {
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
        const onPointerMove = () => { } // optional if you want to detect dragging more precisely

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
        <main className="md:min-h-screen bg-background">
            {/* Hero & Filter sections unchanged, omitted here for brevity (use your existing JSX) */}

            {/* Research Cards Auto-Scroll Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Responsive title: full width on small screens, 1/2 on large */}
                    <h2 className="text-3xl sm:text-4xl w-full lg:w-1/2 font-medium text-foreground mb-4 sm:mb-6">
                        Explore Our Latest Research, Discoveries & Solutions
                    </h2>

                    {/* Responsive paragraph: constrained width on larger screens */}
                    <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-3xl">
                        Discover how nature’s most potent botanicals are transforming modern wellness.
                    </p>

                    {/* Responsive filter buttons: wrap on small screens, horizontal scroll on very narrow */}
                    <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${selectedCategory === null
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${selectedCategory === category
                                        ? "bg-primary text-white"
                                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>



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
