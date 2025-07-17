"use client"

import type React from "react"

import { useActionState } from "react"
import { signIn } from "@/lib/actions" // Only import signIn
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [signInState, signInAction, signInPending] = useActionState(signIn, null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (signInState?.success) {
      toast({
        title: "Login Successful",
        description: signInState.message,
      })
      router.push("/admin") // Redirect to admin page on successful login
    } else if (signInState?.message) {
      toast({
        title: "Login Failed",
        description: signInState.message,
        variant: "destructive",
      })
    }
  }, [signInState, router, toast])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default browser form submission
    const formData = new FormData(event.currentTarget) // Manually create FormData from the form
    await signInAction(formData) // Call the Server Action with the created FormData
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin portal and manage product rates.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email-signin">Email</Label>
              <Input id="email-signin" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-signin">Password</Label>
              <Input id="password-signin" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={signInPending}>
              {signInPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
