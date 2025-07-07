"use client"

// API client for frontend-backend communication

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

class ApiClient {
  private baseUrl = "/api"

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred")
      }

      return data
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }
    }
  }

  // Customer API methods
  async getCustomers(params: PaginationParams = {}) {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.set("page", params.page.toString())
    if (params.limit) searchParams.set("limit", params.limit.toString())
    if (params.search) searchParams.set("search", params.search)
    if (params.status) searchParams.set("status", params.status)

    return this.request(`/customers?${searchParams.toString()}`)
  }

  async getCustomer(id: string) {
    return this.request(`/customers/${id}`)
  }

  async createCustomer(customer: any) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    })
  }

  async updateCustomer(id: string, customer: any) {
    return this.request(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
    })
  }

  async deleteCustomer(id: string) {
    return this.request(`/customers/${id}`, {
      method: "DELETE",
    })
  }

  // Product API methods
  async getProducts(params: PaginationParams = {}) {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.set("page", params.page.toString())
    if (params.limit) searchParams.set("limit", params.limit.toString())
    if (params.search) searchParams.set("search", params.search)
    if (params.status) searchParams.set("status", params.status)

    return this.request(`/products?${searchParams.toString()}`)
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  async createProduct(product: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  }

  async updateProduct(id: string, product: any) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
