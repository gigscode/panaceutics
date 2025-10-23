import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"

export const GET = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["GET"])

  const orders = await getCollection("orders")
  const allOrders = await orders.find({}).sort({ createdAt: -1 }).toArray()

  return NextResponse.json({ data: allOrders })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["POST"])

  const body = await req.json()
  const orders = await getCollection("orders")

  const result = await orders.insertOne({
    ...body,
    status: "pending",
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ data: { _id: result.insertedId, ...body } }, { status: 201 })
})
