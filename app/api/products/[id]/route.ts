import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export const GET = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["GET"])

  const products = await getCollection("products")
  const product = await products.findOne({ _id: new ObjectId(params.id) })

  if (!product) {
    throw { status: 404, message: "Product not found" }
  }

  return NextResponse.json({ data: product })
})

export const PUT = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["PUT"])

  const body = await req.json()
  const products = await getCollection("products")

  const result = await products.findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $set: { ...body, updatedAt: new Date().toISOString() } },
    { returnDocument: "after" },
  )

  if (!result.value) {
    throw { status: 404, message: "Product not found" }
  }

  return NextResponse.json({ data: result.value })
})

export const DELETE = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["DELETE"])

  let objectId: ObjectId
  try {
    objectId = new ObjectId(params.id)
  } catch (err) {
    throw { status: 400, message: "Invalid product id" }
  }

  const products = await getCollection("products")
  const result = await products.deleteOne({ _id: objectId })

  if (result.deletedCount === 0) {
    throw { status: 404, message: "Product not found" }
  }

  return NextResponse.json({ message: "Product deleted successfully" })
})
