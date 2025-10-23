import { type NextRequest, NextResponse } from "next/server"

export function withErrorHandler(handler: Function) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error: any) {
      console.error("API Error:", error)
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: error.status || 500 })
    }
  }
}

export function validateMethod(req: NextRequest, allowedMethods: string[]) {
  if (!allowedMethods.includes(req.method)) {
    throw { status: 405, message: `Method ${req.method} not allowed` }
  }
}

export function validateAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  const adminToken = process.env.ADMIN_API_TOKEN

  if (!token || token !== adminToken) {
    throw { status: 401, message: "Unauthorized" }
  }
}
