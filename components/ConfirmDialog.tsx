"use client"

import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-[#1c1a21] mb-2">{title}</h2>
        <p className="text-[#9197b3] mb-6">{message}</p>
        <div className="flex gap-3">
          <Button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600">
            Delete
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
