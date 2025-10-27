"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      // localStorage access can throw in some environments (e.g., private mode, blocked storage)
      const savedCart = typeof window !== 'undefined' ? localStorage.getItem("cart") : null
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error)
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage for cart:", error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem("cart", JSON.stringify(items))
        }
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        )
      }
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
