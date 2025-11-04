"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

const publications = [
    {
        description: "Tribune",
        title: "Expert advocates adoption of traditional medicine",
        image: "/images/omotuyi1.jpg",
        link: "https://tribuneonlineng.com/expert-advocates-adoption-of-traditional-medicine-to-tackle-diabetes-prostate-disease/",
    },
    {
        title: "Proffesor speaking about Place innovation.",
        image: "/images/omotuyi2.png",
        link: "https://www.youtube.com/watch?v=K3eiBe-e0-4",
    },
    {
        title: "Interview With Professor on Herbal Drug That Cures COVID-19",
        image: "/images/omotuyi3.png",
        link: "https://www.youtube.com/watch?v=IXkDe1-wJ0w",
    },
    {
        title: "National TV Health Talk — Future of Traditional Medicine",
        image: "/images/omotuyi4.jpg",
        link: "#https://example.com/interview3",
    },
    {
        title: "Research Spotlight: Diabetes Management Innovation",
        image: "/images/omotuyi4.jpg",
        link: "#https://example.com/interview4",
    },
    
]

export default function Publications() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const isPausedRef = useRef(false)
    const scrollDirectionRef = useRef(1) // 1 for right, -1 for left

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let animationFrameId: number
        const scrollSpeed = 0.5 // Adjust for slower/faster movement

        const scroll = () => {
            if (scrollContainer && !isPausedRef.current) {
                scrollContainer.scrollLeft += scrollSpeed * scrollDirectionRef.current
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0
                }
                if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2
                }
            }
            animationFrameId = requestAnimationFrame(scroll)
        }

        animationFrameId = requestAnimationFrame(scroll)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = scrollRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const containerWidth = rect.width
        const centerX = containerWidth / 2

        // If mouse is on left half, scroll left; if on right half, scroll right
        scrollDirectionRef.current = mouseX < centerX ? -1 : 1
    }

    const handleMouseEnter = () => {
        isPausedRef.current = true
    }

    const handleMouseLeave = () => {
        isPausedRef.current = false
        scrollDirectionRef.current = 1 // Reset to default right direction
    }

    return (
        <section
            className="w-full py-16 px-6 bg-[oklch(0.98_0.01_120)] text-[oklch(0.15_0.02_120)] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold font-geist text-[oklch(0.35_0.12_120)]">
                    Publications & Interviews
                </h2>
                <p className="mt-3 text-lg text-[oklch(0.25_0.02_120)]">
                    Few of Our Research Publications and National TV Interviews
                </p>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-hidden whitespace-nowrap"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {[...publications, ...publications].map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-72 bg-[oklch(0.92_0.02_120)] rounded-xl shadow-md border border-[oklch(0.92_0.01_120)] hover:scale-105 transition-transform duration-300"
                    >
                        <div className="relative h-44 w-full">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="rounded-t-xl object-cover"
                            />
                        </div>
                        <div className="p-4 text-left h-16 flex items-center">
                            <h3 className="text-sm font-semibold text-[oklch(0.15_0.02_120)] leading-tight whitespace-normal line-clamp-2">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
