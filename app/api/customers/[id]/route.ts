import { type NextRequest, NextResponse } from "next/server"

// GET /api/customers/[id] - Get single customer
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Mock customer data
    const mockCustomer = {
      _id: params.id,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0123",
      address: "123 Main St",
      location: "New York",
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: mockCustomer,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch customer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// PUT /api/customers/[id] - Update customer
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Mock updated customer
    const updatedCustomer = {
      _id: params.id,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      address: body.address || "",
      location: body.location || "",
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: updatedCustomer,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update customer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/customers/[id] - Delete customer
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete customer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
