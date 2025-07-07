"use client"

import { useState, useEffect } from "react"
import { apiClient, type PaginationParams } from "../lib/api"

export function useCustomers(params: PaginationParams = {}) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.getCustomers(params)

      if (response.success) {
        setData(response.data || [])
        setPagination(response.pagination || pagination)
      } else {
        setError(response.error || "Failed to fetch customers")
        // Set fallback data on error
        setData([
          {
            _id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1-555-0123",
            address: "123 Main St",
            location: "New York",
            status: "Active",
          },
          {
            _id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1-555-0124",
            address: "456 Oak Ave",
            location: "Los Angeles",
            status: "Active",
          },
        ])
        setPagination({ page: 1, limit: 10, total: 2, totalPages: 1 })
      }
    } catch (err) {
      console.error("Error fetching customers:", err)
      setError("Network error occurred")
      // Set fallback data on network error
      setData([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1-555-0123",
          address: "123 Main St",
          location: "New York",
          status: "Active",
        },
      ])
      setPagination({ page: 1, limit: 10, total: 1, totalPages: 1 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [params.page, params.limit, params.search, params.status])

  const createCustomer = async (customerData: any) => {
    try {
      const response = await apiClient.createCustomer(customerData)
      if (response.success) {
        await fetchCustomers() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  const updateCustomer = async (id: string, customerData: any) => {
    try {
      const response = await apiClient.updateCustomer(id, customerData)
      if (response.success) {
        await fetchCustomers() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      const response = await apiClient.deleteCustomer(id)
      if (response.success) {
        await fetchCustomers() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  return {
    data,
    loading,
    error,
    pagination,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refetch: fetchCustomers,
  }
}

export function useProducts(params: PaginationParams = {}) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.getProducts(params)

      if (response.success) {
        setData(response.data || [])
        setPagination(response.pagination || pagination)
      } else {
        setError(response.error || "Failed to fetch products")
        // Set fallback data on error
        setData([
          {
            _id: "1",
            name: "Premium Plan",
            description: "Full-featured premium subscription",
            price: 29,
            inventory: 1000,
            category: "Subscription",
            status: "Active",
          },
          {
            _id: "2",
            name: "Basic Plan",
            description: "Essential features for small teams",
            price: 9,
            inventory: 1000,
            category: "Subscription",
            status: "Active",
          },
        ])
        setPagination({ page: 1, limit: 10, total: 2, totalPages: 1 })
      }
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Network error occurred")
      // Set fallback data on network error
      setData([
        {
          _id: "1",
          name: "Premium Plan",
          description: "Full-featured premium subscription",
          price: 29,
          inventory: 1000,
          category: "Subscription",
          status: "Active",
        },
      ])
      setPagination({ page: 1, limit: 10, total: 1, totalPages: 1 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [params.page, params.limit, params.search, params.status])

  const createProduct = async (productData: any) => {
    try {
      const response = await apiClient.createProduct(productData)
      if (response.success) {
        await fetchProducts() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await apiClient.updateProduct(id, productData)
      if (response.success) {
        await fetchProducts() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await apiClient.deleteProduct(id)
      if (response.success) {
        await fetchProducts() // Refresh data
      }
      return response
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  return {
    data,
    loading,
    error,
    pagination,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  }
}
