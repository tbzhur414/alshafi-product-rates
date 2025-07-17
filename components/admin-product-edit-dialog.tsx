"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminProductEditor } from "@/components/admin-product-editor"
import type { Product } from "@/lib/types" // Updated import path

interface AdminProductEditDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onProductUpdated: (updatedProduct: Product) => void
}

export function AdminProductEditDialog({ product, isOpen, onClose, onProductUpdated }: AdminProductEditDialogProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {product.name}</DialogTitle>
        </DialogHeader>
        <AdminProductEditor
          initialProducts={[product]} // Pass only the product to be edited
          productToEditId={product.id} // Indicate which product to edit
          onClose={onClose}
          onProductUpdated={onProductUpdated}
        />
      </DialogContent>
    </Dialog>
  )
}
