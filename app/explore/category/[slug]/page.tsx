import { redirect } from "next/navigation"

export default function CategoryRedirect({ params }: { params: { slug: string } }) {
  const { slug } = params
  // Redirect old /explore/category/:slug to new /explore/:slug
  redirect(`/explore/${slug}`)
}
