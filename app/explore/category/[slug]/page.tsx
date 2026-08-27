import { redirect } from "next/navigation"
import { use } from "react"

export default function CategoryRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  redirect(`/explore/${slug}`)
}
