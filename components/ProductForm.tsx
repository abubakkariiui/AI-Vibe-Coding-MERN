"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product, FormErrors } from "../types"
import { validateProduct } from "../utils/validation"

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, "id">) => void
  onCancel: () => void
  isOpen: boolean
}

export function ProductForm({ product, onSubmit, onCancel, isOpen }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    inventory: 0,
    category: "",
    status: "Active" as const,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        category: product.category,
        status: product.status,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        inventory: 0,
        category: "",
        status: "Active",
      })
    }
    setErrors({})
  }, [product, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateProduct(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit({
      ...formData,
      createdDate: product?.createdDate || new Date().toISOString().split("T")[0],
    })
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#1c1a21]">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onCancel} className="text-[#9197b3] hover:text-[#1c1a21]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5932ea] ${
                errors.description ? "border-red-500" : "border-[#cecece]"
              }`}
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange("price", Number.parseFloat(e.target.value) || 0)}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <Label htmlFor="inventory">Inventory *</Label>
            <Input
              id="inventory"
              type="number"
              min="0"
              value={formData.inventory}
              onChange={(e) => handleChange("inventory", Number.parseInt(e.target.value) || 0)}
              className={errors.inventory ? "border-red-500" : ""}
            />
            {errors.inventory && <p className="text-red-500 text-sm mt-1">{errors.inventory}</p>}
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5932ea] ${
                errors.category ? "border-red-500" : "border-[#cecece]"
              }`}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-[#cecece] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5932ea]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-[#5932ea] hover:bg-[#4a2bc7]">
              {product ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
