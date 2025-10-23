import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export const GET = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["GET"])

  const categories = await getCollection("categories")
  const category = await categories.findOne({ _id: new ObjectId(params.id) })

  if (!category) {
    throw { status: 404, message: "Category not found" }
  }

  return NextResponse.json({ data: category })
})

export const PUT = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["PUT"])

  const body = await req.json()
  const categories = await getCollection("categories")

  const result = await categories.findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $set: { ...body, updatedAt: new Date().toISOString() } },
    { returnDocument: "after" },
  )

  if (!result.value) {
    throw { status: 404, message: "Category not found" }
  }

  return NextResponse.json({ data: result.value })
})

export const DELETE = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["DELETE"])

  const categories = await getCollection("categories")
  const result = await categories.deleteOne({ _id: new ObjectId(params.id) })

  if (result.deletedCount === 0) {
    throw { status: 404, message: "Category not found" }
  }

  return NextResponse.json({ message: "Category deleted successfully" })
})
