"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types" // Updated import path
import { updateProductRate } from "@/lib/actions" // Import the server action from actions.ts

interface AdminRateFormProps {
  initialProducts: Product[]
}

export function AdminRateForm({ initialProducts }: AdminRateFormProps) {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>(initialProducts) // Initialize with prop
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [newRate, setNewRate] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update products state if initialProducts prop changes (e.g., after a revalidation)
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProductId || !newRate) {
      toast({
        title: "Missing Information",
        description: "Please select a product and enter a new rate.",
        variant: "destructive",
      })
      return
    }

    const rateValue = Number.parseFloat(newRate)
    if (isNaN(rateValue) || rateValue <= 0) {
      toast({
        title: "Invalid Rate",
        description: "Please enter a valid positive number for the rate.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const result = await updateProductRate(selectedProductId, rateValue) // Call the server action

    if (result.success) {
      toast({
        title: "Rate Updated!",
        description: `Rate for ${result.product?.name} updated to Rs. ${result.product?.currentRate.toFixed(2)}.`,
      })
      setSelectedProductId("")
      setNewRate("")
      // Update the local state with the new product data
      setProducts((prevProducts) => prevProducts.map((p) => (p.id === result.product?.id ? result.product : p)))
    } else {
      toast({
        title: "Update Failed",
        description: result.message || "Could not update product rate.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-6 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Update Product Rates</h3>
      <div className="grid gap-2">
        <Label htmlFor="product-select">Select Product</Label>
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger id="product-select">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} (Category: {product.category})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new-rate">New Rate (Rs.)</Label>
        <Input
          id="new-rate"
          type="number"
          step="0.01"
          placeholder="e.g., 1250.00"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Rate"}
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Note: In this preview environment, rate updates are not persistent across page refreshes. For a real
        application, you would connect this to a database.
      </p>
    </form>
  )
}
