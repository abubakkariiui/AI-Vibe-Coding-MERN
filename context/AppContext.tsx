"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useToast } from "../hooks/useToast"
import type { Customer, Product } from "../types"

// Initial data
const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    address: "123 Main St",
    location: "New York",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0124",
    address: "456 Oak Ave",
    location: "Los Angeles",
    status: "Active",
    joinDate: "2024-01-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0125",
    address: "789 Pine St",
    location: "Chicago",
    status: "Inactive",
    joinDate: "2024-01-10",
  },
]

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Plan",
    description: "Full-featured premium subscription",
    price: 29,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "2",
    name: "Basic Plan",
    description: "Essential features for small teams",
    price: 9,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    description: "Advanced features for large organizations",
    price: 99,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdDate: "2024-01-01",
  },
]

interface AppContextType {
  // Navigation
  currentPage: string
  setCurrentPage: (page: string) => void

  // Data
  customers: Customer[]
  products: Product[]

  // Customer operations
  addCustomer: (customer: Omit<Customer, "id">) => void
  updateCustomer: (id: string, customer: Omit<Customer, "id">) => void
  deleteCustomer: (id: string) => void

  // Product operations
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Omit<Product, "id">) => void
  deleteProduct: (id: string) => void

  // Toast notifications
  addToast: (message: string, type?: "success" | "error" | "info") => void
  toasts: any[]
  removeToast: (id: string) => void

  // Global search term
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [customers, setCustomers] = useLocalStorage<Customer[]>("customers", initialCustomers)
  const [products, setProducts] = useLocalStorage<Product[]>("products", initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const { toasts, addToast, removeToast } = useToast()

  // Customer operations
  const addCustomer = (customerData: Omit<Customer, "id">) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
    }
    setCustomers((prev) => [...prev, newCustomer])
    addToast("Customer added successfully!", "success")
  }

  const updateCustomer = (id: string, customerData: Omit<Customer, "id">) => {
    const updatedCustomer: Customer = {
      ...customerData,
      id,
    }
    setCustomers((prev) => prev.map((c) => (c.id === id ? updatedCustomer : c)))
    addToast("Customer updated successfully!", "success")
  }

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
    addToast("Customer deleted successfully!", "success")
  }

  // Product operations
  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
    addToast("Product added successfully!", "success")
  }

  const updateProduct = (id: string, productData: Omit<Product, "id">) => {
    const updatedProduct: Product = {
      ...productData,
      id,
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
    addToast("Product updated successfully!", "success")
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    addToast("Product deleted successfully!", "success")
  }

  const value: AppContextType = {
    currentPage,
    setCurrentPage,
    customers,
    products,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addProduct,
    updateProduct,
    deleteProduct,
    addToast,
    toasts,
    removeToast,
    searchTerm,
    setSearchTerm,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
