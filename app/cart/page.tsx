"use client"

import { useCart } from "@/app/providers"
import Link from "next/link"
import Image from "next/image"
import { Price } from "@/components/ui/price"
import { Trash2, ChevronLeft, ShoppingBag, Minus, Plus } from "lucide-react"
import { DOMESTIC_SHIPPING_FEE_NGN } from "@/lib/config"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, lastVisitedCategory } = useCart()
  const cartTotal = getTotalPrice()
  const orderTotal = cartTotal + DOMESTIC_SHIPPING_FEE_NGN

  const getBackLink = () => {
    if (lastVisitedCategory) {
      return `/explore/${lastVisitedCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    }
    return "/explore/categories"
  }

  const getBackText = () => {
    if (lastVisitedCategory) return `Back to ${lastVisitedCategory}`
    return "Back to Products"
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <Link href={getBackLink()} className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ChevronLeft className="w-4 h-4" />
            {getBackText()}
          </Link>
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our collection of premium herbal products and add items to your cart.
            </p>
            <Link
              href="/explore/categories"
              className="inline-block bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <Link href={getBackLink()} className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft className="w-4 h-4" />
          {getBackText()}
        </Link>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-lg border p-4">
                <div className="flex gap-4">
                  {/* Product image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* Product info + actions */}
                  <div className="flex-1 min-w-0">
                    {/* Title row with delete button */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-base sm:text-lg leading-snug truncate">{item.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.category}</p>
                      </div>
                      {/* Delete button — always visible, top-right of card */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                        className="flex-shrink-0 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Price + quantity row */}
                    <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                      {/* Unit price */}
                      <div className="text-sm font-medium text-muted-foreground">
                        <Price value={item.price} /> each
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 sm:p-2 hover:bg-muted transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-3 py-1.5 font-semibold text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 sm:p-2 hover:bg-muted transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="font-bold text-primary text-sm sm:text-base">
                        <Price value={{ amount: item.price.amount * item.quantity, currency: item.price.currency }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full border border-border text-muted-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-lg border p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
                  <span><Price value={{ amount: cartTotal, currency: "NGN" }} /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (within Nigeria)</span>
                  <span><Price value={{ amount: DOMESTIC_SHIPPING_FEE_NGN, currency: "NGN" }} /></span>
                </div>
                <p className="text-xs text-muted-foreground">International shipping is quoted on request.</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    <Price value={{ amount: orderTotal, currency: "NGN" }} />
                  </span>
                </div>
              </div>

              <Link
                href="/payment"
                className="block w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center mb-3"
              >
                Proceed to Payment
              </Link>

              <Link
                href="/explore/categories"
                className="block w-full border border-border text-foreground py-3 px-6 rounded-lg font-medium hover:bg-muted transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
