import { type NextRequest, NextResponse } from "next/server"
import { mockDB } from "@/lib/mongodb"
import { validateProduct } from "@/lib/validation"

// GET /api/products - Get products with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = (searchParams.get("search") || "").toLowerCase()
    const status = searchParams.get("status") || ""

    const collection = mockDB.collection("products")
    let results = await collection.find().toArray()

    if (status) {
      results = results.filter((product: any) => product.status === status)
    }

    if (search) {
      results = results.filter(
        (product: any) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search),
      )
    }

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
    const { isValid, errors } = validateProduct(body)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: errors },
        { status: 400 },
      )
    }

    const collection = mockDB.collection("products")
    const insert = await collection.insertOne({
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      inventory: Number.parseInt(body.inventory),
      category: body.category,
      status: body.status || "Active",
    })

    const newProduct = await collection.findOne({ _id: insert.insertedId })

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
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
