import { Hero } from "@/components/hero"
import { HomepageProducts } from "@/components/homepage-products"
import Publications from "@/components/publications"
import ExploreFacility from "@/components/explore-facility"
import { BookCall } from "@/components/book-a-call"
import Explore from "../components/explore"
import { AboutUs } from "@/components/about-us"
import { Cta } from "@/components/cta-comp"

export default function Home() {
  return (
    <main>
      <Hero />
      <HomepageProducts />
      <AboutUs />
      <Explore />
      <Cta />
      <Publications />
      <ExploreFacility />
      <BookCall />
    </main>
  )
}
