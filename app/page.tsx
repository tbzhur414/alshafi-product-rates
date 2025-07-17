"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { ProductDetailDialog } from "@/components/product-detail-dialog"
import { getProducts, type Product } from "@/lib/data"

export default function SalesDashboard() {
  const allProducts = useMemo(() => getProducts(), [])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return allProducts
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.id.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [searchTerm, allProducts])

  // Define a preferred order for categories
  const categoryOrder = ["A-S", "CAN", "DAP", "JIPSUM", "MOP", "NP", "SOP", "SSPG", "UREA", "ZARKHAIZ", "ZINC"]

  // Group filtered products by category
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {}
    filteredProducts.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = []
      }
      groups[product.category].push(product)
    })

    // Sort products within each category by name
    for (const category in groups) {
      groups[category].sort((a, b) => a.name.localeCompare(b.name))
    }

    return groups
  }, [filteredProducts])

  // Get sorted list of categories
  const sortedCategories = useMemo(() => {
    const categoriesInData = Object.keys(groupedProducts)
    return categoryOrder
      .filter((category) => categoriesInData.includes(category))
      .concat(categoriesInData.filter((category) => !categoryOrder.includes(category)).sort())
  }, [groupedProducts, categoryOrder])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Product Sales Rates</h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">No products found matching your search.</div>
          ) : (
            <div className="grid gap-8">
              {sortedCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groupedProducts[category]?.map((product) => (
                      <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <ProductDetailDialog product={selectedProduct} isOpen={isDetailDialogOpen} onClose={handleCloseDetailDialog} />
    </div>
  )
}
