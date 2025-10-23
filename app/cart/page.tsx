"use client"

import { useCart } from "@/app/providers"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ChevronLeft, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our collection of premium herbal products and add items to your cart.
            </p>
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=96&width=96&query=herbal product"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-lg font-bold text-primary mt-2">₦{item.price.toLocaleString("en-NG")}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-secondary transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-secondary transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString("en-NG")}</p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" onClick={clearCart} className="mt-8 w-full bg-transparent">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{cartTotal.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{cartTotal.toLocaleString("en-NG")}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full">
                <Button className="w-full py-6 text-lg">Proceed to Checkout</Button>
              </Link>

              <Link href="/products" className="w-full mt-3">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
