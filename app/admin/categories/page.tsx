"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, X } from "lucide-react"
import type { Category } from "@/lib/types"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data.data || data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create category")
      const newCategory = await response.json()
      setCategories([...categories, newCategory.data])
      setShowCreateModal(false)
      setFormData({ name: "", description: "" })
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create category")
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete category")
      setCategories(categories.filter((c) => c._id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete category")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage product categories</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {error && <p className="text-destructive">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Card key={category._id} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
                      <Edit className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.productCount || 0} products in this category</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No categories found</p>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Create Category</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-secondary rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
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
