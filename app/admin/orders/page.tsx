"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Download, Plus, X } from "lucide-react"
interface Order {
  _id: string
  customerEmail: string
  customerName?: string
  createdAt: string
  items: any[]
  total: number
  status: "Processing" | "Shipped" | "Delivered"
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerName: "",
    total: "",
    status: "Processing",
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) throw new Error("Failed to fetch orders")
        const data = await response.json()
        setOrders(data.data || data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total: Number.parseFloat(formData.total),
          items: [],
        }),
      })

      if (!response.ok) throw new Error("Failed to create order")
      const newOrder = await response.json()
      setOrders([...orders, newOrder.data])
      setShowCreateModal(false)
      setFormData({ customerEmail: "", customerName: "", total: "", status: "Processing" })
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create order")
    } finally {
      setCreating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage customer orders</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Order
        </Button>
      </div>

      {error && <p className="text-destructive">{error}</p>}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>All customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-border hover:bg-secondary transition-colors duration-200"
                    >
                      <td className="py-3 px-4 font-medium">#{order._id}</td>
                      <td className="py-3 px-4">{order.customerEmail}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{order.items.length}</td>
                      <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                          <Download className="w-4 h-4 text-primary" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-3 px-4 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Create Order</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-secondary rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="email"
                  placeholder="Customer Email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  placeholder="Total Amount"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  step="0.01"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {creating ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
