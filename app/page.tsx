import { getProducts } from "@/lib/data"
import { ProductDisplay } from "@/components/product-display"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function SalesDashboard() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isAdmin = false
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()
    if (!profileError && profile?.is_admin) {
      isAdmin = true
    }
  }

  const allProducts = await getProducts()

  return <ProductDisplay initialProducts={allProducts} isAdmin={isAdmin} />
}
