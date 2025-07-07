"use client"

import { Users, Monitor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { MetricCard } from "../shared/MetricCard"
import { DataTable } from "../shared/DataTable"
import { StatusBadge } from "../shared/StatusBadge"
import { CustomerForm } from "../CustomerForm"
import { ConfirmDialog } from "../ConfirmDialog"
import type { Customer } from "../../types"

export function DashboardPage() {
  const { customers, updateCustomer, deleteCustomer, addCustomer } = useApp()
  const [customerFormOpen, setCustomerFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>()
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

  const activeCustomers = customers.filter((c) => c.status === "Active").length

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setCustomerFormOpen(true)
  }

  const handleDeleteCustomer = (customer: Customer) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Customer",
      message: `Are you sure you want to delete ${customer.name}? This action cannot be undone.`,
      onConfirm: () => {
        deleteCustomer(customer.id)
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
      },
    })
  }

  const handleSubmitCustomer = (customerData: Omit<Customer, "id">) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, customerData)
    } else {
      addCustomer(customerData)
    }
    setCustomerFormOpen(false)
    setEditingCustomer(undefined)
  }

  const customerColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      render: (status: "Active" | "Inactive") => <StatusBadge status={status} />,
    },
  ]

  return (
    <>
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Customers" value={customers.length} change="16%" changeType="positive" icon={Users} />
        <MetricCard title="Active Members" value={activeCustomers} change="1%" changeType="negative" icon={Users} />
        <MetricCard title="Active Now" value="189" change="5%" changeType="positive" icon={Monitor} />
      </div>

      {/* All Customers Section */}
      <Card className="bg-white border-[#cecece]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1c1a21] mb-1">All Customers</h2>
              <p className="text-[#00ac4f] text-sm">Active Members</p>
            </div>
            <Button onClick={() => setCustomerFormOpen(true)} className="bg-[#5932ea] hover:bg-[#4a2bc7]">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>

          <DataTable
            data={customers}
            columns={customerColumns}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
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
    </>
  )
}
