"use client"

import { useApp } from "../context/AppContext"
import { DashboardPage } from "./pages/DashboardPage"
import { ProductsPage } from "./pages/ProductsPage"
import { CustomersPage } from "./pages/CustomersPage"
import { HelpPage } from "./pages/HelpPage"

export function Router() {
  const { currentPage } = useApp()

  switch (currentPage) {
    case "dashboard":
      return <DashboardPage />
    case "products":
      return <ProductsPage />
    case "customers":
      return <CustomersPage />
    case "help":
      return <HelpPage />
    default:
      return <DashboardPage />
  }
}
