"use client"
import type { Customer, Product } from "./types"
import { AppProvider } from "./context/AppContext"
import { Layout } from "./components/Layout"
import { Router } from "./components/Router"

// Initial dummy data
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

export default function Dashboard() {
  return (
    <AppProvider>
      <Layout>
        <Router />
      </Layout>
    </AppProvider>
  )
}
