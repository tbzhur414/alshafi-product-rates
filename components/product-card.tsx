"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => onClick(product)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          width={40}
          height={40}
          alt={product.name}
          className="rounded-md"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rs. {product.currentRate.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{product.category}</p>
      </CardContent>
    </Card>
  )
}
