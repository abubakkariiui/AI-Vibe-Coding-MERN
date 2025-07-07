"use client"

import type React from "react"

import { Search, Users, Package, HelpCircle, ChevronRight, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useApp } from "../context/AppContext"
import { ToastContainer } from "./Toast"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { currentPage, setCurrentPage, toasts, removeToast } = useApp()

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "help", label: "Help", icon: HelpCircle },
  ]

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Hello Steve 👋,"
      case "products":
        return "Product Management"
      case "customers":
        return "Customer Management"
      case "help":
        return "Help & Support"
      default:
        return "Hello Steve 👋,"
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f0f1f7]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#cecece] p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
            </div>
          </div>
          <span className="text-xl font-semibold text-[#1c1a21]">Dashboard</span>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === item.id ? "bg-[#5932ea] text-white" : "text-[#565454] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <Icon className="w-6 h-6" />
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </div>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-[#1c1a21]">{getPageTitle()}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9197b3] w-5 h-5" />
            <Input placeholder="Search" className="pl-10 w-80 bg-white border-[#cecece]" />
          </div>
        </div>

        {/* Page Content */}
        {children}
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
