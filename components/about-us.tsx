"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { MetricsWithIcons } from "./metrics-card"

export function AboutUs() {
    const customMetrics = [
        { value: 25000, suffix: '+', label: 'Lives Improved', duration: 3000 },
        { value: 100, suffix: '+', label: 'Research Studies', duration: 2500 },
        { value: 25, suffix: '+', label: 'Countries Served', duration: 2000 },
    ]
    return (
        <section className="md:h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content Section */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {/* Transparent Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-primary text-sm font-medium text-foreground">
                                    <span>Science-Backed Wellness</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-medium text-foreground">
                                    About <span className="text-gray-900">Panaceutics</span>
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Panaceutics is a biotechnology-driven company committed to advancing wellness through science-backed,
                                    plant-based formulations. Our mission is to bridge the gap between traditional botanical knowledge
                                    and modern clinical innovation.
                                </p>
                            </div>

                            <div className="pt-4">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors hover:scale-105 hover:shadow-md"
                                >
                                    Learn More
                                </Link>
                            </div>

                            <MetricsWithIcons metrics={customMetrics} />

                        </div>

                        {/* Image Section */}
                        <div>
                            <img
                                src="/herbone.jpg"
                                alt="Our Research Facility"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
