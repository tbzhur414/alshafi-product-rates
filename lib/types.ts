// This file defines shared types and constants that can be used by both server and client components.

export type Product = {
  id: string
  name: string
  category: string
  currentRate: number
  imageUrl: string
  policy: string
  regionRates: { region: string; rate: number }[]
  transhipmentInfo: { available: boolean; rates?: { location: string; cost: number }[] }
  isAvailable: boolean // New: Product availability status
}

// Define all major regions in Pakistan
export const PAKISTAN_REGIONS = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa", // KPK
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir", // AJK
]
