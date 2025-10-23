import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export const GET = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["GET"])

  const orders = await getCollection("orders")
  const order = await orders.findOne({ _id: new ObjectId(params.id) })

  if (!order) {
    throw { status: 404, message: "Order not found" }
  }

  return NextResponse.json({ data: order })
})

export const PUT = withErrorHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  validateMethod(req, ["PUT"])

  const body = await req.json()
  const orders = await getCollection("orders")

  const result = await orders.findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $set: { ...body, updatedAt: new Date().toISOString() } },
    { returnDocument: "after" },
  )

  if (!result.value) {
    throw { status: 404, message: "Order not found" }
  }

  return NextResponse.json({ data: result.value })
})
