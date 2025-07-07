import { type NextRequest, NextResponse } from "next/server"

// Fallback data in case of database issues
const fallbackProducts = [
  {
    _id: "1",
    name: "Premium Plan",
    description: "Full-featured premium subscription",
    price: 29,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    name: "Basic Plan",
    description: "Essential features for small teams",
    price: 9,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "3",
    name: "Enterprise Plan",
    description: "Advanced features for large organizations",
    price: 99,
    inventory: 1000,
    category: "Subscription",
    status: "Active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

// GET /api/products - Get products with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    // Use fallback data for now
    let results = [...fallbackProducts]

    // Apply status filter
    if (status) {
      results = results.filter((product) => product.status === status)
    }

    // Apply search filter
    if (search) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply pagination
    const total = results.length
    const offset = (page - 1) * limit
    const paginatedResults = results.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and description are required",
        },
        { status: 400 },
      )
    }

    // Create new product with mock data
    const newProduct = {
      _id: Date.now().toString(),
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price) || 0,
      inventory: Number.parseInt(body.inventory) || 0,
      category: body.category || "Other",
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
