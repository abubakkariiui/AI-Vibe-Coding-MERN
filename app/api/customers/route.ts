import { type NextRequest, NextResponse } from "next/server"

// Fallback data in case of database issues
const fallbackCustomers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    address: "123 Main St",
    location: "New York",
    status: "Active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0124",
    address: "456 Oak Ave",
    location: "Los Angeles",
    status: "Active",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0125",
    address: "789 Pine St",
    location: "Chicago",
    status: "Inactive",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
]

// GET /api/customers - Get customers with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    // Use fallback data for now
    let results = [...fallbackCustomers]

    // Apply status filter
    if (status) {
      results = results.filter((customer) => customer.status === status)
    }

    // Apply search filter
    if (search) {
      results = results.filter(
        (customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.location.toLowerCase().includes(search.toLowerCase()),
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
        error: "Failed to fetch customers",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST /api/customers - Create new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and email are required",
        },
        { status: 400 },
      )
    }

    // Create new customer with mock data
    const newCustomer = {
      _id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      address: body.address || "",
      location: body.location || "",
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newCustomer,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create customer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
