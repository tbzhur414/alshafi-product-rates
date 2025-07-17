"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getProducts, getProductById, type Product } from "@/lib/data"
import { updateProductDetails } from "@/lib/actions"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, MinusCircle } from "lucide-react"

export function AdminProductEditor() {
  const { toast } = useToast()
  const allProducts = getProducts()
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedProductId) {
      const product = getProductById(selectedProductId)
      if (product) {
        setFormData({ ...product }) // Load all product data into form state
      }
    } else {
      setFormData({}) // Clear form if no product is selected
    }
  }, [selectedProductId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number.parseFloat(value) || 0 }))
  }

  const handleRegionRateChange = (index: number, field: "region" | "rate", value: string) => {
    const newRegionRates = [...(formData.regionRates || [])]
    if (field === "rate") {
      newRegionRates[index] = { ...newRegionRates[index], rate: Number.parseFloat(value) || 0 }
    } else {
      newRegionRates[index] = { ...newRegionRates[index], region: value }
    }
    setFormData((prev) => ({ ...prev, regionRates: newRegionRates }))
  }

  const addRegionRate = () => {
    setFormData((prev) => ({
      ...prev,
      regionRates: [...(prev.regionRates || []), { region: "", rate: 0 }],
    }))
  }

  const removeRegionRate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      regionRates: (prev.regionRates || []).filter((_, i) => i !== index),
    }))
  }

  const handleTranshipmentAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      transhipmentInfo: {
        ...prev.transhipmentInfo,
        available: checked,
        rates: checked ? prev.transhipmentInfo?.rates || [{ location: "", cost: 0 }] : undefined,
      },
    }))
  }

  const handleTranshipmentRateChange = (index: number, field: "location" | "cost", value: string) => {
    const newTranshipmentRates = [...(formData.transhipmentInfo?.rates || [])]
    if (field === "cost") {
      newTranshipmentRates[index] = { ...newTranshipmentRates[index], cost: Number.parseFloat(value) || 0 }
    } else {
      newTranshipmentRates[index] = { ...newTranshipmentRates[index], location: value }
    }
    setFormData((prev) => ({
      ...prev,
      transhipmentInfo: { ...prev.transhipmentInfo, rates: newTranshipmentRates },
    }))
  }

  const addTranshipmentRate = () => {
    setFormData((prev) => ({
      ...prev,
      transhipmentInfo: {
        ...prev.transhipmentInfo,
        rates: [...(prev.transhipmentInfo?.rates || []), { location: "", cost: 0 }],
      },
    }))
  }

  const removeTranshipmentRate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      transhipmentInfo: {
        ...prev.transhipmentInfo,
        rates: (prev.transhipmentInfo?.rates || []).filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProductId) {
      toast({
        title: "No Product Selected",
        description: "Please select a product to update.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const result = await updateProductDetails(selectedProductId, formData)

    if (result.success) {
      toast({
        title: "Product Updated!",
        description: `Details for ${result.product?.name} updated successfully.`,
      })
      // Optionally re-fetch products or update local state to reflect changes on dashboard
      // For this preview, changes are reflected by re-selecting the product or refreshing
    } else {
      toast({
        title: "Update Failed",
        description: result.message || "Could not update product details.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 p-6 border rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-semibold">Edit Product Details</h3>

      <div className="grid gap-2">
        <Label htmlFor="product-select">Select Product</Label>
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger id="product-select">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {allProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} (Category: {product.category})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProductId && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="currentRate">Current Rate (Rs.)</Label>
            <Input
              id="currentRate"
              type="number"
              step="0.01"
              value={formData.currentRate || ""}
              onChange={handleNumberInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="policy">Product Policy</Label>
            <Textarea
              id="policy"
              value={formData.policy || ""}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter product policy details..."
            />
          </div>

          <div className="grid gap-4 border p-4 rounded-md">
            <h4 className="font-semibold">Region-wise Rates</h4>
            {formData.regionRates?.map((item, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor={`region-${index}`}>Region</Label>
                  <Input
                    id={`region-${index}`}
                    value={item.region}
                    onChange={(e) => handleRegionRateChange(index, "region", e.target.value)}
                    placeholder="e.g., Punjab"
                  />
                </div>
                <div className="grid gap-2 flex-1">
                  <Label htmlFor={`rate-${index}`}>Rate (Rs.)</Label>
                  <Input
                    id={`rate-${index}`}
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleRegionRateChange(index, "rate", e.target.value)}
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeRegionRate(index)}>
                  <MinusCircle className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove region rate</span>
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addRegionRate} className="w-full bg-transparent">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Region Rate
            </Button>
          </div>

          <div className="grid gap-4 border p-4 rounded-md">
            <div className="flex items-center gap-2">
              <Checkbox
                id="transhipment-available"
                checked={formData.transhipmentInfo?.available || false}
                onCheckedChange={handleTranshipmentAvailabilityChange}
              />
              <Label htmlFor="transhipment-available">Transhipment Available</Label>
            </div>

            {formData.transhipmentInfo?.available && (
              <>
                <h4 className="font-semibold">Transhipment Rates</h4>
                {formData.transhipmentInfo.rates?.map((item, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="grid gap-2 flex-1">
                      <Label htmlFor={`trans-location-${index}`}>Location</Label>
                      <Input
                        id={`trans-location-${index}`}
                        value={item.location}
                        onChange={(e) => handleTranshipmentRateChange(index, "location", e.target.value)}
                        placeholder="e.g., Karachi Port"
                      />
                    </div>
                    <div className="grid gap-2 flex-1">
                      <Label htmlFor={`trans-cost-${index}`}>Cost (Rs.)</Label>
                      <Input
                        id={`trans-cost-${index}`}
                        type="number"
                        step="0.01"
                        value={item.cost}
                        onChange={(e) => handleTranshipmentRateChange(index, "cost", e.target.value)}
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTranshipmentRate(index)}>
                      <MinusCircle className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove transhipment rate</span>
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addTranshipmentRate} className="w-full bg-transparent">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Transhipment Rate
                </Button>
              </>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Note: In this preview environment, updates are not persistent across page refreshes. For a real application,
            you would connect this to a database.
          </p>
        </>
      )}
    </form>
  )
}
