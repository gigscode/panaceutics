import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"

export const GET = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["GET"])

  const preferences = await getCollection("store_preferences")
  const storePrefs = await preferences.findOne({})

  if (!storePrefs) {
    throw { status: 404, message: "Store preferences not found" }
  }

  return NextResponse.json({ data: storePrefs })
})

export const PUT = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["PUT"])

  const body = await req.json()
  const preferences = await getCollection("store_preferences")

  const result = await preferences.findOneAndUpdate(
    {},
    { $set: { ...body, updatedAt: new Date().toISOString() } },
    { returnDocument: "after", upsert: true },
  )

  return NextResponse.json({ data: result.value })
})
