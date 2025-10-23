import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"

export const GET = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["GET"])

  const categories = await getCollection("categories")
  const allCategories = await categories.find({}).toArray()

  return NextResponse.json({ data: allCategories })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["POST"])

  const body = await req.json()
  const categories = await getCollection("categories")

  const result = await categories.insertOne({
    ...body,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ data: { _id: result.insertedId, ...body } }, { status: 201 })
})
