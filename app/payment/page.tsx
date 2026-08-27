"use client"

import { useEffect } from "react"
import { PaymentPage } from "@/components/payment-page"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/providers"

export default function Payment() {
  const { items, removeItem } = useCart()
  const router = useRouter()

  // Redirect to cart if empty — but only after hydration (items starts as [])
  useEffect(() => {
    // Small delay to allow localStorage hydration in CartProvider
    const timer = setTimeout(() => {
      if (items.length === 0) router.push('/cart')
    }, 300)
    return () => clearTimeout(timer)
  }, [items.length, router])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  return <PaymentPage items={items} onRemoveItem={removeItem} />
}