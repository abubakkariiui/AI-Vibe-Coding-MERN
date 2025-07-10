import { type NextRequest, NextResponse } from "next/server"
import { mockDB } from "@/lib/mongodb"
import { validateProduct } from "@/lib/validation"

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = mockDB.collection("products")
    const product = await collection.findOne({ _id: params.id })

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: product })
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
    const { isValid, errors } = validateProduct(body)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: errors },
        { status: 400 },
      )
    }

    const collection = mockDB.collection("products")
    await collection.updateOne(
      { _id: params.id },
      {
        $set: {
          name: body.name,
          description: body.description,
          price: Number.parseFloat(body.price),
          inventory: Number.parseInt(body.inventory),
          category: body.category,
          status: body.status || "Active",
        },
      },
    )

    const updatedProduct = await collection.findOne({ _id: params.id })

    return NextResponse.json({ success: true, data: updatedProduct })
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
    const collection = mockDB.collection("products")
    const result = await collection.deleteOne({ _id: params.id })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
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
