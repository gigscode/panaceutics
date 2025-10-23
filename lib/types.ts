export interface Product {
  image: string
  _id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number
  discount: number
  images: string[]
  imageUrl?: string
  category: string
  tags: string[]
  rating: number
  reviews: number
  inStock: boolean
  createdAt: string
  imageVariants?: { url: string }[]
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
  description?: string
  featured?: boolean
}

export interface StorePreferences {
  storeName: string
  storeLogo: string
  showStoreLogo: boolean
  storeType: "books" | "clothing" | "produce" | "services" | "general"
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  heroLayout: "centered" | "split" | "fullwidth"
  heroData: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImage: string
    foregroundImage?: string
    backgroundColor: string
    textColor: string
  }
  categoryLayout: "grid" | "carousel" | "featured"
  productCardLayout: "standard" | "compact" | "detailed" | "minimal"
  paymentMethod: "paystack" | "zenith"
  newsletterLayout: "simple" | "split" | "overlay"
  featuredSectionTitle: string
  newArrivalsTitle: string
  categories: Category[]
  featuredProducts: Product[]
  products: Product[]
}
