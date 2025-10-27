"use client"

import { useEffect, useState } from "react"
import { PaymentPage } from "@/components/payment-page"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  title: string
  price: { amount: number; currency: 'NGN' | 'USD' }
  quantity: number
  image: string
}

export default function Payment() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get cart items from localStorage
    const savedCart = localStorage.getItem('panaceutics-cart')
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        setCartItems(items)
      } catch (error) {
        console.error('Error parsing cart data:', error)
      }
    }
    setLoading(false)
  }, [])

  // Redirect to cart if no items
  useEffect(() => {
    if (!loading && cartItems.length === 0) {
      router.push('/cart')
    }
  }, [loading, cartItems.length, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return null // Will redirect to cart
  }

  return <PaymentPage items={cartItems} />
}