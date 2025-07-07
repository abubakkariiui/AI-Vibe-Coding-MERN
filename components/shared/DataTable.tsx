"use client"

import type React from "react"

import { Edit, Trash2 } from "lucide-react"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  showActions?: boolean
}

export function DataTable({ data, columns, onEdit, onDelete, showActions = true }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#cecece]">
            {columns.map((column) => (
              <th key={column.key} className="text-left py-3 px-4 text-[#9197b3] font-medium">
                {column.label}
              </th>
            ))}
            {showActions && <th className="text-left py-3 px-4 text-[#9197b3] font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} className="border-b border-[#f5f5f5] hover:bg-[#f9f9f9]">
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-4">
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
              {showActions && (onEdit || onDelete) && (
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-[#5932ea] hover:text-[#4a2bc7] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
