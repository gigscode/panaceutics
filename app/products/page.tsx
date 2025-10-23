export const dynamic = "force-dynamic"

import { getStorePreferences } from "@/lib/api"
import ProductsClient from "../../components/product-clients"

export default async function ProductsPage() {


  return <ProductsClient />
}
