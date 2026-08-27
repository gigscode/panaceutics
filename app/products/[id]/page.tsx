import { redirect } from "next/navigation"

// The canonical product page lives at /product/[id]
// Redirect legacy /products/[id] URLs to the correct route
export default async function ProductsLegacyRedirect({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/product/${id}`)
}
