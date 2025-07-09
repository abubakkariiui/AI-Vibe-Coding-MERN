"use client"

import { Users, UserCheck, UserX, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { useCustomers } from "../../hooks/useApi"
import { MetricCard } from "../shared/MetricCard"
import { DataTable } from "../shared/DataTable"
import { StatusBadge } from "../shared/StatusBadge"
import { CustomerForm } from "../CustomerForm"
import { ConfirmDialog } from "../ConfirmDialog"
import { Pagination } from "../Pagination"
import { SearchAndFilter } from "../SearchAndFilter"
import { useToast } from "../../hooks/useToast"
import { ToastContainer } from "../Toast"

export function CustomersPage() {
  const [page, setPage] = useState(1)
  const { searchTerm, setSearchTerm } = useApp()
  const [status, setStatus] = useState("")
  const [customerFormOpen, setCustomerFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(undefined)
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
    data: customers,
    loading,
    error,
    pagination,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers({ page, limit: 10, search: searchTerm, status })

  const activeCustomers = customers.filter((c: any) => c.status === "Active").length
  const inactiveCustomers = customers.filter((c: any) => c.status === "Inactive").length

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer(customer)
    setCustomerFormOpen(true)
  }

  const handleDeleteCustomer = (customer: any) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Customer",
      message: `Are you sure you want to delete ${customer.name}? This action cannot be undone.`,
      onConfirm: async () => {
        const response = await deleteCustomer(customer._id)
        if (response.success) {
          addToast("Customer deleted successfully!", "success")
        } else {
          addToast(response.error || "Failed to delete customer", "error")
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
      },
    })
  }

  const handleSubmitCustomer = async (customerData: any) => {
    let response
    if (editingCustomer) {
      response = await updateCustomer(editingCustomer._id, customerData)
    } else {
      response = await createCustomer(customerData)
    }

    if (response.success) {
      addToast(editingCustomer ? "Customer updated successfully!" : "Customer created successfully!", "success")
      setCustomerFormOpen(false)
      setEditingCustomer(undefined)
    } else {
      addToast(response.error || "Operation failed", "error")
    }
  }

  const customerColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "location", label: "Location" },
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
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Customers" value={pagination.total} change="16%" changeType="positive" icon={Users} />
        <MetricCard
          title="Active Customers"
          value={activeCustomers}
          change="8%"
          changeType="positive"
          icon={UserCheck}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <MetricCard
          title="Inactive Customers"
          value={inactiveCustomers}
          change="2%"
          changeType="negative"
          icon={UserX}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Customers Table */}
      <Card className="bg-white border-[#cecece]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-[#1c1a21]">Customer Management</CardTitle>
            <Button onClick={() => setCustomerFormOpen(true)} className="bg-[#5932ea] hover:bg-[#4a2bc7]">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={setSearchTerm}
            onStatusFilter={setStatus}
            placeholder="Search customers..."
            className="mb-6"
            showSearch={false}
          />

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#9197b3]">Loading customers...</p>
            </div>
          ) : (
            <>
              {/* Data Table */}
              <DataTable
                data={customers}
                columns={customerColumns}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
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
      <CustomerForm
        customer={editingCustomer}
        onSubmit={handleSubmitCustomer}
        onCancel={() => {
          setCustomerFormOpen(false)
          setEditingCustomer(undefined)
        }}
        isOpen={customerFormOpen}
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
