export interface StorePreferences {
  storeName: string
  storeLogo: string
  showStoreLogo: boolean
  storeType: "general" | string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  heroLayout: "centered" | "split" | "full" | string
  heroData: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    backgroundImage: string
    backgroundColor: string
    textColor: string
  }
  categoryLayout: "grid" | "list" | string
  productCardLayout: "standard" | "compact" | string
  paymentMethod: "paystack" | "stripe" | string
  newsletterLayout: "simple" | "full" | string
  featuredSectionTitle: string
  newArrivalsTitle: string
  categories: any[]
  featuredProducts: any[]
  products: any[]
}
