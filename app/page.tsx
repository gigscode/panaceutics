import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { MissionSection } from "@/components/mission-section"
import { Newsletter } from "@/components/newsletter"
import { BookCall } from "@/components/book-a-call"
import { MetricsWithIcons } from "@/components/metrics-card"
import { ResearchApproach } from "@/components/ResearchDevelopment"



export default function Home() {
  const customMetrics = [
    { value: 25000, suffix: '+', label: 'Lives Improved', duration: 3000 },
    { value: 98, suffix: '%', label: 'Customer Satisfaction', duration: 1500 },
    { value: 100, suffix: '+', label: 'Research Studies', duration: 2500 },
    { value: 25, suffix: '+', label: 'Countries Served', duration: 2000 },
  ]
  return (
    <main>
      <Hero />
      <div className="">
      <MetricsWithIcons metrics={customMetrics} />
      </div>
      
     
      <FeaturedProducts />
       <ResearchApproach />

       <MissionSection />
      <BookCall />

      <Newsletter />
    </main>
  )
}
