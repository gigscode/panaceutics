"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Layers, ShoppingCart, Settings, LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose && window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {onClose && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative top-0 left-0 h-full bg-card border-r border-border shadow-lg z-50",
          "w-64 transform transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header with close button for mobile */}
        <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary">Panaceutics</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Admin Panel</p>
          </div>
          
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-2 md:p-4 space-y-1 md:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-lg transition-all duration-200",
                  "text-sm md:text-base",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 border-t border-border bg-card">
          <button 
            onClick={handleLinkClick}
            className="flex items-center gap-3 w-full px-3 py-3 md:px-4 md:py-3 rounded-lg text-foreground hover:bg-secondary transition-all duration-200 text-sm md:text-base"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="font-medium truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}