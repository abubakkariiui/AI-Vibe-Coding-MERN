"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchAndFilterProps {
  onSearch: (search: string) => void
  onStatusFilter: (status: string) => void
  placeholder?: string
  showStatusFilter?: boolean
  className?: string
}

export function SearchAndFilter({
  onSearch,
  onStatusFilter,
  placeholder = "Search...",
  showStatusFilter = true,
  className = "",
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    onStatusFilter(status)
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9197b3] w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 bg-white border-[#cecece]"
        />
      </div>

      {showStatusFilter && (
        <div className="flex items-center gap-2">
          <span className="text-[#9197b3] text-sm">Status:</span>
          <Button
            variant={selectedStatus === "" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("")}
            className={selectedStatus === "" ? "bg-[#5932ea]" : "bg-transparent"}
          >
            All
          </Button>
          <Button
            variant={selectedStatus === "Active" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("Active")}
            className={selectedStatus === "Active" ? "bg-[#5932ea]" : "bg-transparent"}
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === "Inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("Inactive")}
            className={selectedStatus === "Inactive" ? "bg-[#5932ea]" : "bg-transparent"}
          >
            Inactive
          </Button>
        </div>
      )}
    </div>
  )
}
