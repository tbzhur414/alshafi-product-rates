import { AdminProductEditor } from "@/components/admin-product-editor" // Renamed component
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
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
          <Link href="/" passHref>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <AdminProductEditor />
        </div>
      </main>
    </div>
  )
}
