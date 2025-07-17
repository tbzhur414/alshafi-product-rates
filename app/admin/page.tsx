import { AdminProductEditor } from "@/components/admin-product-editor"
import { AdminRateForm } from "@/components/admin-rate-form" // Import AdminRateForm
import Link from "next/link"
import { ArrowLeft, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { signOut } from "@/lib/actions"
import { getProducts } from "@/lib/data" // Import getProducts

export default async function AdminPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if the user is an admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (profileError || !profile?.is_admin) {
    console.error("User is not an admin or profile not found:", profileError)
    redirect("/")
  }

  // Fetch all products on the server for the admin forms
  const allProducts = await getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="AL-Shhafi Group Global Logo"
              className="rounded-full"
            />
            <span className="text-lg">AL-Shhafi Group Global</span>
          </Link>
          <h1 className="text-xl font-bold">Admin Portal</h1>
          <div className="flex items-center gap-2">
            <Link href="/" passHref>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-3xl grid gap-6">
          {" "}
          {/* Added grid gap for spacing */}
          <AdminProductEditor initialProducts={allProducts} />
          <AdminRateForm initialProducts={allProducts} /> {/* Added AdminRateForm */}
        </div>
      </main>
    </div>
  )
}
