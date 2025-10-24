"use client"

import { Bell, Search, User } from "lucide-react"

export function AdminHeader({ onMenuClick, isSidebarOpen }: { onMenuClick?: () => void; isSidebarOpen?: boolean }) {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="relative p-2 text-foreground hover:bg-secondary rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
            onClick={onMenuClick}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-muted transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}
