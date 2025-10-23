"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ShoppingCart, Check } from "lucide-react"

interface Product {
    _id: string
    name: string
    description: string
    fullDescription?: string
    price: number
    imageUrl: string
    category: string
    benefits?: string[]
    specifications?: Record<string, string>
}

interface ProductDetailProps {
    colors: {
        primary: string
        secondary: string
        accent: string
    }
    cardLayout: string
}

export default function ProductDetail({
    colors,
    cardLayout
}: ProductDetailProps) {
    const params = useParams()
    const id = params.id as string
    
    const [product, setProduct] = useState<Product | null>(null)
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return
            
            try {
                setLoading(true)
                setError(null)
                
                const response = await fetch(`/api/products/${id}`)
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.status}`)
                }
                
                const data = await response.json()
                setProduct(data.data || data)
                
                // If you want to fetch related products based on category
                if (data.data?.category) {
                    fetchRelatedProducts(data.data.category, data.data._id)
                }
                
            } catch (err) {
                console.error("Error fetching product:", err)
                setError(err instanceof Error ? err.message : "Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        const fetchRelatedProducts = async (category: string, currentProductId: string) => {
            try {
                const response = await fetch(`/api/products?category=${category}`)
                if (response.ok) {
                    const data = await response.json()
                    const products = data.data || data
                    // Filter out the current product and limit to 4 related products
                    const filtered = products
                        .filter((p: Product) => p._id !== currentProductId)
                        .slice(0, 4)
                    setRelatedProducts(filtered)
                }
            } catch (err) {
                console.error("Error fetching related products:", err)
            }
        }

        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-primary hover:underline mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                    <div className="flex items-center justify-center h-64">
                        <p className="text-lg text-muted-foreground">Loading product...</p>
                    </div>
                </div>
            </main>
        )
    }

    // Error state
    if (error) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-primary hover:underline mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-lg text-destructive mb-4">{error}</p>
                            <Button onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    // Product not found state
    if (!product) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-primary hover:underline mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-lg text-muted-foreground mb-4">Product not found</p>
                            <Link href="/products">
                                <Button>
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Back Button */}
                <Link
                    href="/products"
                    className="flex items-center gap-2 text-primary hover:underline mb-8"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                {/* Product Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Product Image */}
                    <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-[40rem]">
                        <Image
                            src={product.imageUrl || "/placeholder.svg?height=800&width=800"}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-semibold mb-2 text-primary">
                                {product.category}
                            </p>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                {product.description}
                            </p>

                            {product.fullDescription && (
                                <p className="text-lg text-muted-foreground mb-6">
                                    {product.fullDescription}
                                </p>
                            )}

                            {/* Price */}
                            <div className="mb-8">
                                <p className="text-4xl font-bold" style={{ color: colors.primary }}>
                                    ₦{product.price.toLocaleString("en-NG")}
                                </p>
                            </div>

                            {/* Benefits */}
                            {product.benefits && product.benefits.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="font-semibold text-lg mb-4">Key Benefits</h3>
                                    <ul className="space-y-2">
                                        {product.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <Check
                                                    className="w-5 h-5 flex-shrink-0"
                                                    style={{ color: colors.primary }}
                                                />
                                                <span className="text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="mb-8 bg-secondary p-4 rounded-lg">
                                    <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key}>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {key.replace(/_/g, " ")}
                                                </p>
                                                <p className="font-semibold">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add to Cart Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 hover:bg-secondary transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 hover:bg-secondary transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                className="w-full py-6 text-lg flex items-center justify-center gap-2"
                                style={{ backgroundColor: colors.primary }}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {addedToCart ? "Added to Cart!" : "Add to Cart"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Card
                                    key={relatedProduct._id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                                >
                                    <div className="relative h-48 bg-muted overflow-hidden">
                                        <Image
                                            src={relatedProduct.imageUrl || "/placeholder.svg?height=192&width=192"}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <p className="text-xs font-semibold mb-2 text-primary">
                                            {relatedProduct.category}
                                        </p>
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                                            {relatedProduct.description}
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span
                                                className="text-lg font-bold"
                                                style={{ color: colors.primary }}
                                            >
                                                ₦{relatedProduct.price.toLocaleString("en-NG")}
                                            </span>
                                        </div>
                                        <Link href={`/products/${relatedProduct._id}`} className="w-full">
                                            <Button
                                                className="w-full bg-transparent border-primary"
                                                size="sm"
                                                variant="outline"
                                                style={{ borderColor: colors.primary, color: colors.primary }}
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}