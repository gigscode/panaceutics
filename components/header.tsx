"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/app/providers"
import Image from "next/image"



export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/WhatsApp_Image_2025-10-19_at_09.30.15-removebg-preview.png"
            alt="Panaceutics"
            width={160}
            height={40}
            className="w-auto h-8 md:h-10"
            priority
          />
          {/* <span className="font-semibold text-lg hidden sm:inline">Panaceutics</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          <div className="container mx-auto space-y-4 pt-6 px-4 py-4 pb-8 flex flex-col gap-4">
            <Link href="/products" className="text-xl uppercase font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-xl uppercase font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-xl uppercase font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl uppercase bg-primary text-primary-foreground p-6 rounded-xl text-center font-medium hover:text-primary transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
