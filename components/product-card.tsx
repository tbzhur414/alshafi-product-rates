"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/types" // Updated import path
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn for conditional class names

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
  isAdmin: boolean // New prop to determine if the user is an admin
  onEditClick: (product: Product) => void // New prop for edit action
}

export function ProductCard({ product, onClick, isAdmin, onEditClick }: ProductCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col",
        !product.isAvailable && "opacity-60 grayscale", // Visually indicate if not available
      )}
      onClick={() => onClick(product)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          width={64} // Increased size
          height={64} // Increased size
          alt={product.name}
          className="rounded-md object-cover"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">Rs. {product.currentRate.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <p className={cn("text-sm font-semibold mt-2", product.isAvailable ? "text-green-600" : "text-red-600")}>
          {product.isAvailable ? "Available" : "Not Available"}
        </p>
      </CardContent>
      {isAdmin && (
        <div className="p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={(e) => {
              e.stopPropagation() // Prevent card click from firing
              onEditClick(product)
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </div>
      )}
    </Card>
  )
}
