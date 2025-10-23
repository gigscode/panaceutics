import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"

export const GET = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["GET"])

  const products = await getCollection("products")
  const allProducts = await products.find({}).toArray()

  return NextResponse.json({ data: allProducts })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["POST"])

  const body = await req.json()
  const products = await getCollection("products")

  const result = await products.insertOne({
    ...body,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ data: { _id: result.insertedId, ...body } }, { status: 201 })
})
