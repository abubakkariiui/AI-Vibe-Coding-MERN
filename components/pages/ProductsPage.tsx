"use client"

import { Package, BarChart3, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useProducts } from "../../hooks/useApi"
import { MetricCard } from "../shared/MetricCard"
import { DataTable } from "../shared/DataTable"
import { StatusBadge } from "../shared/StatusBadge"
import { ProductForm } from "../ProductForm"
import { ConfirmDialog } from "../ConfirmDialog"
import { Pagination } from "../Pagination"
import { SearchAndFilter } from "../SearchAndFilter"
import { useToast } from "../../hooks/useToast"
import { ToastContainer } from "../Toast"

export function ProductsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [productFormOpen, setProductFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(undefined)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  })

  const { toasts, addToast, removeToast } = useToast()

  const {
    data: products,
    loading,
    error,
    pagination,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts({ page, limit: 10, search, status })

  const totalInventory = products.reduce((sum: number, p: any) => sum + p.inventory, 0)

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setProductFormOpen(true)
  }

  const handleDeleteProduct = (product: any) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Product",
      message: `Are you sure you want to delete ${product.name}? This action cannot be undone.`,
      onConfirm: async () => {
        const response = await deleteProduct(product._id)
        if (response.success) {
          addToast("Product deleted successfully!", "success")
        } else {
          addToast(response.error || "Failed to delete product", "error")
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
      },
    })
  }

  const handleSubmitProduct = async (productData: any) => {
    let response
    if (editingProduct) {
      response = await updateProduct(editingProduct._id, productData)
    } else {
      response = await createProduct(productData)
    }

    if (response.success) {
      addToast(editingProduct ? "Product updated successfully!" : "Product created successfully!", "success")
      setProductFormOpen(false)
      setEditingProduct(undefined)
    } else {
      addToast(response.error || "Operation failed", "error")
    }
  }

  const productColumns = [
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (price: number) => `$${price}`,
    },
    { key: "inventory", label: "Inventory" },
    {
      key: "status",
      label: "Status",
      render: (status: "Active" | "Inactive") => <StatusBadge status={status} />,
    },
  ]

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <MetricCard title="Total Products" value={pagination.total} change="25%" changeType="positive" icon={Package} />
        <MetricCard
          title="Total Inventory"
          value={totalInventory.toLocaleString()}
          change="12%"
          changeType="positive"
          icon={BarChart3}
        />
      </div>

      {/* Products Table */}
      <Card className="bg-white border-[#cecece]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-[#1c1a21]">Product Overview</CardTitle>
            <Button onClick={() => setProductFormOpen(true)} className="bg-[#5932ea] hover:bg-[#4a2bc7]">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={setSearch}
            onStatusFilter={setStatus}
            placeholder="Search products..."
            className="mb-6"
          />

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#9197b3]">Loading products...</p>
            </div>
          ) : (
            <>
              {/* Data Table */}
              <DataTable
                data={products}
                columns={productColumns}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />

              {/* Pagination */}
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
                className="mt-6"
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Forms and Dialogs */}
      <ProductForm
        product={editingProduct}
        onSubmit={handleSubmitProduct}
        onCancel={() => {
          setProductFormOpen(false)
          setEditingProduct(undefined)
        }}
        isOpen={productFormOpen}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  )
}
