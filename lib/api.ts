import type { StorePreferences } from "./types"

export async function getStorePreferences(): Promise<StorePreferences> {
  try {
    const response = await fetch("/api/store-preferences", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch store preferences: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || data
  } catch (error) {
    console.error("Error fetching store preferences:", error)

    // Return default store preferences as fallback
    return {
      storeName: "Panaceutics",
      storeLogo: "",
      showStoreLogo: false,
      storeType: "general" as const,
      colors: {
        primary: "#2d5016",
        secondary: "#f5f5f0",
        accent: "#2d5016",
      },
      heroLayout: "centered" as const,
      heroData: {
        title: "Where the cure is natural, but the proof is scientific",
        subtitle: "Discover evidence-based herbal alternatives",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        backgroundImage: "",
        backgroundColor: "#f5f5f0",
        textColor: "#1a1a1a",
      },
      categoryLayout: "grid" as const,
      productCardLayout: "standard" as const,
      paymentMethod: "paystack" as const,
      newsletterLayout: "simple" as const,
      featuredSectionTitle: "Featured Products",
      newArrivalsTitle: "New Arrivals",
      categories: [],
      featuredProducts: [],
      products: [],
    }
  }
}

export interface Review {
  _id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface ProductRating {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export interface ProductReviewsResponse {
  reviews: Review[]
  rating: ProductRating
}

export async function getProductReviews(productId: string): Promise<ProductReviewsResponse> {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`)
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    throw new Error(error?.message || "Could not fetch reviews")
  }
}

export async function createReview(reviewData: {
  productId: string
  rating: number
  comment: string
}): Promise<Review> {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.statusText}`)
    }

    const data = await response.json()
    return data.review || data
  } catch (error: any) {
    console.error("Error creating review:", error)
    throw new Error(error?.message || "Could not create review")
  }
}

export async function createOrder(orderData: any) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`)
  }

  return await response.json()
}
