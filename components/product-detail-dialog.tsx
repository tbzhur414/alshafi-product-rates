import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/lib/data"
import Image from "next/image"

interface ProductDetailDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailDialog({ product, isOpen, onClose }: ProductDetailDialogProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name} Details</DialogTitle>
          <DialogDescription>Comprehensive information about {product.name}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              width={80}
              height={80}
              alt={product.name}
              className="rounded-md object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-muted-foreground">Current Rate: Rs. {product.currentRate.toFixed(2)}</p>
              <p className="text-muted-foreground">Category: {product.category}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <h4 className="font-semibold">Product Policy</h4>
            <p className="text-sm text-muted-foreground">{product.policy}</p>
          </div>

          <div className="grid gap-2">
            <h4 className="font-semibold">Region-wise Rates</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Rate (Rs.)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.regionRates.map((item) => (
                  <TableRow key={item.region}>
                    <TableCell>{item.region}</TableCell>
                    <TableCell className="text-right">{item.rate.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {product.transhipmentInfo.available && product.transhipmentInfo.rates && (
            <div className="grid gap-2">
              <h4 className="font-semibold">Transhipment Rates</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Cost (Rs.)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.transhipmentInfo.rates.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">{item.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!product.transhipmentInfo.available && (
            <div className="text-sm text-muted-foreground">
              No specific transhipment information available for this product.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
