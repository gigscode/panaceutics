import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MetricsWithIcons } from "@/components/metrics-card"

export function Hero() {
  const heroMetrics = [
    { value: 25000, suffix: '+', label: 'Lives Improved', duration: 3000 },
    { value: 98, suffix: '%', label: 'Customer Satisfaction', duration: 1500 },
    { value: 100, suffix: '+', label: 'Research Studies', duration: 2500 },
    { value: 25, suffix: '+', label: 'Countries Served', duration: 2000 },
  ]

  return (
    <div className="relative">
      <section className="relative min-h-auto md:min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlays */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/herbtwo.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/herbtwo.mp4" type="video/mp4" />
          </video>

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10"></div>

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-soft-light"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl mix-blend-soft-light"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl mix-blend-soft-light"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl mix-blend-soft-light"></div>
        </div>

        {/* Text Content */}
        <div className="relative container mx-auto px-4 md:px-8 py-16 text-center z-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-base font-medium text-white">Nature Meets Science</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl capitalize font-bold text-white leading-tight">
              Nature Cures,{" "}
              <span className="bg-secondary bg-clip-text text-transparent">
                & Science has Proof
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Providing plant based solutions informed by cutting-edge bio-pharmaceutical research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/explore">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-8 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Panaceutics
                </Button>
              </Link>
            </div>

            <div className="pt-16">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full mx-auto flex justify-center">
                <div className="w-1.5 h-4 bg-white/50 rounded-full mt-3 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-20">
          <MetricsWithIcons metrics={heroMetrics} />
        </div>
      </section>

      <div className="h-32 md:h-24"></div>
    </div>
  )
}
