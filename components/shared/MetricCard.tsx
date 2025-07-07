"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  change: string
  changeType: "positive" | "negative"
  icon: LucideIcon
  iconBgColor?: string
  iconColor?: string
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBgColor = "bg-[#ebe5ff]",
  iconColor = "text-[#5932ea]",
}: MetricCardProps) {
  return (
    <Card className="bg-white border-[#cecece]">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
          <div>
            <p className="text-[#9197b3] text-sm mb-1">{title}</p>
            <p className="text-3xl font-bold text-[#1c1a21] mb-1">{value}</p>
            <div className="flex items-center gap-1">
              <span className={`text-sm ${changeType === "positive" ? "text-[#00ac4f]" : "text-[#d0004b]"}`}>
                {changeType === "positive" ? "↗" : "↘"} {change}
              </span>
              <span className="text-[#9197b3] text-sm">this month</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
