"use server"

import { getProducts, type Product } from "./data"

// This Server Action updates product details.
// In a real application, this would interact with a database.
export async function updateProductDetails(productId: string, updates: Partial<Product>) {
  const products = getProducts() // Get the current state of products
  const productIndex = products.findIndex((p) => p.id === productId)

  if (productIndex !== -1) {
    // Merge updates into the existing product
    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      // Ensure nested objects are merged correctly if they exist in updates
      regionRates: updates.regionRates || products[productIndex].regionRates,
      transhipmentInfo: updates.transhipmentInfo
        ? { ...products[productIndex].transhipmentInfo, ...updates.transhipmentInfo }
        : products[productIndex].transhipmentInfo,
    }
    return { success: true, product: products[productIndex] }
  }
  return { success: false, message: "Product not found" }
}

export async function updateProductRate(productId: string, newRate: number) {
  const products = getProducts()
  const productIndex = products.findIndex((p) => p.id === productId)

  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      currentRate: newRate,
    }
    return { success: true, product: products[productIndex] }
  }
  return { success: false, message: "Product not found" }
}
