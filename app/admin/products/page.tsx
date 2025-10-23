"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search, X, Upload } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  })
  const [creating, setCreating] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data.data || data)
        setFilteredProducts(data.data || data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default") // Replace with your upload preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dsaqsxtup/image/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Image upload failed")
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error)
      throw new Error("Failed to upload image")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setUploadingImage(true)
    try {
      const imageUrl = await uploadToCloudinary(file)
      setFormData({ ...formData, image: imageUrl })
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert("Please fill in all required fields")
      return
    }

    setCreating(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
        }),
      })

      if (!response.ok) throw new Error("Failed to create product")
      const newProduct = await response.json()
      setProducts([...products, newProduct.data])
      setShowCreateModal(false)
      setFormData({ name: "", description: "", price: "", category: "", stock: "", image: "" })
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create product")
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete product")
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product")
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Active", color: "bg-green-100 text-green-800" }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {error && <p className="text-destructive">{error}</p>}

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const status = getStockStatus(product.stock)
                    return (
                      <tr
                        key={product._id}
                        className="border-b border-border hover:bg-secondary transition-colors duration-200"
                      >
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                        <td className="py-3 px-4 font-medium">₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="py-3 px-4">{product.stock}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4 text-primary" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-3 px-4 text-center text-muted-foreground">
                      No products found
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
              <h2 className="text-xl font-bold">Create Product</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-secondary rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name *"
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
                <input
                  type="number"
                  placeholder="Price *"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="text"
                  placeholder="Category *"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock *"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  required
                />
                
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Product Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploadingImage ? "Uploading..." : "Click to upload image"}
                      </span>
                    </label>
                  </div>
                  
                  {/* Preview uploaded image */}
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-border"
                      />
                    </div>
                  )}
                  
                  {/* Manual URL input as fallback */}
                  <div className="mt-2">
                    <input
                      type="url"
                      placeholder="Or enter image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

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
                    disabled={creating || uploadingImage}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {creating ? "Creating..." : "Create Product"}
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