"use client"

import { useCart } from "@/app/providers"
import Link from "next/link"
import Image from "next/image"
import { Price } from "@/components/ui/price"
import { Trash2, ChevronLeft, ShoppingBag, Minus, Plus } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart()
  const cartTotal = getTotalPrice()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our collection of premium herbal products and add items to your cart.
            </p>
            <Link
              href="/explore/categories"
              className="inline-block bg-emerald-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-900 transition-colors"
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
        <Link href="/explore/categories" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 flex gap-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.id}`} className="hover:text-emerald-600 transition-colors">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <div className="text-lg font-bold text-emerald-800">
                        <Price value={item.price} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="font-semibold text-emerald-800">
                        <Price value={{ amount: item.price.amount * item.quantity, currency: item.price.currency }} />
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-8 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span><Price value={{ amount: cartTotal, currency: 'NGN' }} /></span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-800">
                    <Price value={{ amount: cartTotal, currency: 'NGN' }} />
                  </span>
                </div>
              </div>

              <Link
                href="/payment"
                className="block w-full bg-emerald-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-900 transition-colors text-center mb-3"
              >
                Proceed to Payment
              </Link>

              <Link
                href="/explore/categories"
                className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
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
