"use client"

import { HelpCircle, BarChart3, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "../shared/MetricCard"

const helpArticles = [
  { id: 1, title: "Getting Started Guide", category: "Setup", views: 1250, lastUpdated: "2024-01-15" },
  { id: 2, title: "Account Management", category: "Account", views: 980, lastUpdated: "2024-01-20" },
  { id: 3, title: "Billing & Payments", category: "Billing", views: 750, lastUpdated: "2024-01-18" },
  { id: 4, title: "API Documentation", category: "Developer", views: 650, lastUpdated: "2024-01-22" },
  { id: 5, title: "Troubleshooting", category: "Support", views: 1100, lastUpdated: "2024-01-25" },
]

export function HelpPage() {
  return (
    <>
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Articles" value="24" change="8%" changeType="positive" icon={HelpCircle} />
        <MetricCard title="Total Views" value="4,730" change="15%" changeType="positive" icon={BarChart3} />
        <MetricCard title="Active Support" value="12" change="3%" changeType="negative" icon={Users} />
      </div>

      {/* Help Articles */}
      <Card className="bg-white border-[#cecece]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#1c1a21]">Help Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#cecece]">
                  <th className="text-left py-3 px-4 text-[#9197b3] font-medium">Title</th>
                  <th className="text-left py-3 px-4 text-[#9197b3] font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-[#9197b3] font-medium">Views</th>
                  <th className="text-left py-3 px-4 text-[#9197b3] font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {helpArticles.map((article) => (
                  <tr key={article.id} className="border-b border-[#f5f5f5] hover:bg-[#f9f9f9]">
                    <td className="py-3 px-4 text-[#1c1a21] font-medium">{article.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-[#ebe5ff] text-[#5932ea]">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#9197b3]">{article.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#9197b3]">{article.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
