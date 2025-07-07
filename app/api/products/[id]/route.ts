import { type NextRequest, NextResponse } from "next/server"

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Mock product data
    const mockProduct = {
      _id: params.id,
      name: "Premium Plan",
      description: "Full-featured premium subscription",
      price: 29,
      inventory: 1000,
      category: "Subscription",
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: mockProduct,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Mock updated product
    const updatedProduct = {
      _id: params.id,
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price) || 0,
      inventory: Number.parseInt(body.inventory) || 0,
      category: body.category || "Other",
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
