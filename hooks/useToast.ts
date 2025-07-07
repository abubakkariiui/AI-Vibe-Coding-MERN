"use client"

import { useState } from "react"

export type Toast = {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = { id, message, type }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}
