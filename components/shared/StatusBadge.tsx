"use client"

interface StatusBadgeProps {
  status: "Active" | "Inactive"
  className?: string
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const baseClasses = "px-2 py-1 rounded-full text-xs"
  const statusClasses = status === "Active" ? "bg-[#00ac4f] text-white" : "bg-[#d0004b] text-white"

  return <span className={`${baseClasses} ${statusClasses} ${className}`}>{status}</span>
}
