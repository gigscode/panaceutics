"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Menu, X } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check screen size - mobile is < 768px (medium screens and up show sidebar)
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Auto-open sidebar on medium screens and larger
      if (!mobile) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSidebarOpen, isMobile])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for medium screens and up, overlay for mobile */}
      <div
        className={`
          ${isMobile ? "fixed inset-0 z-50" : "relative"}
          ${isSidebarOpen ? "block" : "hidden"}
          ${!isMobile && "block"} // Always show on medium+ screens
        `}
      >
        {/* Backdrop for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          h-full
          ${isMobile 
            ? "fixed left-0 top-0 w-64 z-50 transform transition-transform duration-300 ease-in-out"
            : "relative w-64"
          }
          ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        `}>
          <AdminSidebar onClose={isMobile ? closeSidebar : undefined} />
        </div>
      </div>

      {/* Main content area */}
      <div className={`
        flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300
        ${isSidebarOpen && !isMobile ? "md:ml-0" : ""}
      `}>
        <AdminHeader 
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile menu button - only show on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      )}
    </div>
  )
}