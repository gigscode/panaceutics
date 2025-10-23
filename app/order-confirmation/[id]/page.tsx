"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { useEffect, useState } from "react"

interface Order {
  id: string
  date: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shipping: {
    address: string
    city: string
    state: string
    zipCode: string
  }
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder")
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder)
        if (parsedOrder.id === orderId) {
          setOrder(parsedOrder)
        }
      } catch (error) {
        console.error("Failed to load order:", error)
      }
    }
  }, [orderId])

  if (!order) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const shippingCost = 5000
  const tax = Math.round(order.total * 0.075)
  const total = order.total + shippingCost + tax

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase</p>
          <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Status */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Status</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">Your order has been received</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Processing</p>
                    <p className="text-sm text-muted-foreground">We're preparing your items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Shipped</p>
                    <p className="text-sm text-muted-foreground">On its way to you</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between pb-4 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString("en-NG")}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <p className="font-semibold mb-2">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-muted-foreground">{order.shipping.address}</p>
              <p className="text-muted-foreground">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{order.total.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₦{shippingCost.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (7.5%)</span>
                  <span>₦{tax.toLocaleString("en-NG")}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{total.toLocaleString("en-NG")}</span>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Confirmation Email</p>
                    <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                  </div>
                </div>
              </div>

              <Link href="/products" className="w-full">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
