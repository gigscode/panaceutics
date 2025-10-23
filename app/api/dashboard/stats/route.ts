import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { withErrorHandler, validateMethod } from "@/lib/middleware"

export const GET = withErrorHandler(async (req: NextRequest) => {
  validateMethod(req, ["GET"])

  const products = await getCollection("products")
  const orders = await getCollection("orders")
  const categories = await getCollection("categories")

  const totalProducts = await products.countDocuments()
  const totalCategories = await categories.countDocuments()
  const totalOrders = await orders.countDocuments()

  const recentOrders = await orders.find({}).sort({ createdAt: -1 }).limit(5).toArray()

  const totalRevenue = await orders.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]).toArray()

  return NextResponse.json({
    data: {
      totalProducts,
      totalCategories,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
    },
  })
})
