"use server"

import { createSupabaseServerClient } from "./supabase/server"
import { revalidatePath } from "next/cache"
import type { Product } from "./types" // Updated import path

export async function updateProductDetails(productId: string, updates: Partial<Product>) {
  const supabase = createSupabaseServerClient()

  // Map camelCase to snake_case for database insertion
  const dbUpdates: Record<string, any> = {
    name: updates.name,
    category: updates.category,
    current_rate: updates.currentRate,
    image_url: updates.imageUrl,
    policy: updates.policy,
    region_rates: updates.regionRates,
    transhipment_info: updates.transhipmentInfo,
    is_available: updates.isAvailable, // New: Include availability
  }

  const { data, error } = await supabase.from("products").update(dbUpdates).eq("id", productId).select().single()

  if (error) {
    console.error("Error updating product details:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/") // Revalidate the dashboard page to show updated data
  revalidatePath("/admin") // Revalidate the admin page
  return { success: true, product: data as Product }
}

export async function updateProductRate(productId: string, newRate: number) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("products")
    .update({ current_rate: newRate })
    .eq("id", productId)
    .select()
    .single()

  if (error) {
    console.error("Error updating product rate:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/") // Revalidate the dashboard page to show updated data
  revalidatePath("/admin") // Revalidate the admin page
  return { success: true, product: data as Product }
}

// Server Action for user sign-in
// Add a defensive check for formData at the beginning of the function
// Also add checks for email and password being null/empty strings
// Replace the existing signIn function with this updated version:

export async function signIn(formData: FormData) {
  // Defensive check: Ensure formData is a valid FormData object
  if (!formData || !(formData instanceof FormData)) {
    console.error("signIn: Invalid formData received. Expected FormData object.")
    return { success: false, message: "Invalid form submission. Please try again." }
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Add checks for email and password being null/empty strings
  if (!email) {
    return { success: false, message: "Email is required." }
  }
  if (!password) {
    return { success: false, message: "Password is required." }
  }

  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Sign-in error:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/")
  return { success: true, message: "Signed in successfully!" }
}

// Server Action for user sign-up
export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Sign-up error:", error)
    return { success: false, message: error.message }
  }

  // Automatically create a profile for the new user
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      email: data.user.email,
      is_admin: false, // New users are not admins by default
    })
    if (profileError) {
      console.error("Error creating user profile:", profileError)
      // You might want to handle this more robustly, e.g., delete the user if profile creation fails
    }
  }

  revalidatePath("/")
  return { success: true, message: "Signed up successfully! Please check your email for confirmation." }
}

// Server Action for user sign-out
export async function signOut() {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign-out error:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/")
  return { success: true, message: "Signed out successfully!" }
}
