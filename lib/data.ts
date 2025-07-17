// This file simulates a database or API for your product data.
// In a real application, you would fetch this data from a backend.

export type Product = {
  id: string
  name: string
  category: string
  currentRate: number
  imageUrl: string
  policy: string
  regionRates: { region: string; rate: number }[]
  transhipmentInfo: { available: boolean; rates?: { location: string; cost: number }[] }
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

// Helper to generate initial region rates for a product
const generateInitialRegionRates = (baseRate: number) => {
  return PAKISTAN_REGIONS.map((region) => ({
    region,
    rate: baseRate + Math.floor(Math.random() * 100) - 50, // Random variation
  }))
}

// Initial mock data for products based on user's provided list
const initialProducts: Product[] = [
  // A-S Category
  {
    id: "A-S BARKAT",
    name: "A-S BARKAT",
    category: "A-S",
    currentRate: 1200,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "Standard policy for A-S BARKAT. Refer to sales guidelines for terms.",
    regionRates: generateInitialRegionRates(1200),
    transhipmentInfo: { available: false },
  },
  {
    id: "A-S VAH",
    name: "A-S VAH",
    category: "A-S",
    currentRate: 1300,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "Premium A-S VAH product. Limited stock, advance booking recommended.",
    regionRates: generateInitialRegionRates(1300),
    transhipmentInfo: { available: false },
  },
  {
    id: "A-S 7STAR",
    name: "A-S 7STAR",
    category: "A-S",
    currentRate: 850,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "A-S 7STAR: Available in various sizes. Check packaging details.",
    regionRates: generateInitialRegionRates(850),
    transhipmentInfo: { available: true, rates: [{ location: "Lahore Warehouse", cost: 30 }] },
  },

  // CAN Category
  {
    id: "CAN F PAKARAB",
    name: "CAN F PAKARAB",
    category: "CAN",
    currentRate: 900,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "PAKARAB CAN: High-fat content variant. Ideal for specific industrial applications.",
    regionRates: generateInitialRegionRates(900),
    transhipmentInfo: { available: false },
  },
  {
    id: "CAN G FATIMA",
    name: "CAN G FATIMA",
    category: "CAN",
    currentRate: 2500,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FATIMA CAN: Premium fertilizer. Bulk purchase options available.",
    regionRates: generateInitialRegionRates(2500),
    transhipmentInfo: { available: true, rates: [{ location: "Karachi Port", cost: 100 }] },
  },

  // DAP Category
  {
    id: "DAP BARKET-SV",
    name: "DAP BARKET-SV",
    category: "DAP",
    currentRate: 2450,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "BARKET DAP: Standard grade DAP. Widely available.",
    regionRates: generateInitialRegionRates(2450),
    transhipmentInfo: { available: false },
  },
  {
    id: "DAP ENGRO",
    name: "DAP ENGRO",
    category: "DAP",
    currentRate: 2600,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "ENGRO DAP: High-quality DAP. Preferred by large-scale farms.",
    regionRates: generateInitialRegionRates(2600),
    transhipmentInfo: { available: true, rates: [{ location: "Faisalabad Logistics", cost: 120 }] },
  },
  {
    id: "DAP FFBL",
    name: "DAP FFBL",
    category: "DAP",
    currentRate: 2580,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FFBL DAP: Reliable and consistent performance. Bulk order discounts.",
    regionRates: generateInitialRegionRates(2580),
    transhipmentInfo: { available: false },
  },
  {
    id: "DAP FFC",
    name: "DAP FFC",
    category: "DAP",
    currentRate: 2570,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FFC DAP: Trusted brand in agriculture. Available nationwide.",
    regionRates: generateInitialRegionRates(2570),
    transhipmentInfo: { available: true, rates: [{ location: "Multan Depot", cost: 90 }] },
  },
  {
    id: "DAP SARSABZ(FAT)",
    name: "DAP SARSABZ(FAT)",
    category: "DAP",
    currentRate: 2590,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SARSABZ DAP: Enriched formula for better yield. Seasonal availability.",
    regionRates: generateInitialRegionRates(2590),
    transhipmentInfo: { available: false },
  },
  {
    id: "DAP SONA",
    name: "DAP SONA",
    category: "DAP",
    currentRate: 2560,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA DAP: Cost-effective solution for general farming. Large quantities available.",
    regionRates: generateInitialRegionRates(2560),
    transhipmentInfo: { available: true, rates: [{ location: "Peshawar Distribution", cost: 80 }] },
  },

  // JIPSUM Category
  {
    id: "VAH AUSTRALIAN",
    name: "VAH AUSTRALIAN",
    category: "JIPSUM",
    currentRate: 700,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "Australian Jipsum: Imported quality. Best for soil conditioning.",
    regionRates: generateInitialRegionRates(700),
    transhipmentInfo: { available: false },
  },

  // MOP Category
  {
    id: "MOP BARKAT-PINK-G",
    name: "MOP BARKAT-PINK-G",
    category: "MOP",
    currentRate: 1850,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "BARKAT Pink MOP: Granular form, easy application. Limited edition.",
    regionRates: generateInitialRegionRates(1850),
    transhipmentInfo: { available: false },
  },
  {
    id: "MOP BARKAT-WHITE-G",
    name: "MOP BARKAT-WHITE-G",
    category: "MOP",
    currentRate: 1800,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "BARKAT White MOP: Standard MOP product. Essential for potassium deficiency.",
    regionRates: generateInitialRegionRates(1800),
    transhipmentInfo: { available: true, rates: [{ location: "Quetta Agri Port", cost: 60 }] },
  },

  // NP Category
  {
    id: "NP ENGRO PLUS-18:18",
    name: "NP ENGRO PLUS-18:18",
    category: "NP",
    currentRate: 1600,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "ENGRO PLUS NP: 18:18 ratio. Enhanced formula for robust plant development.",
    regionRates: generateInitialRegionRates(1600),
    transhipmentInfo: { available: false },
  },
  {
    id: "NP PAKARAB",
    name: "NP PAKARAB",
    category: "NP",
    currentRate: 1550,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "PAKARAB NP: Fat-enriched NP. Improves soil fertility and crop yield.",
    regionRates: generateInitialRegionRates(1550),
    transhipmentInfo: { available: true, rates: [{ location: "Hyderabad Depot", cost: 35 }] },
  },

  // SOP Category
  {
    id: "SARSABZ(SOP)",
    name: "SARSABZ(SOP)",
    category: "SOP",
    currentRate: 2200,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SARSABZ SOP: Granular SOP. Ideal for crops sensitive to chloride.",
    regionRates: generateInitialRegionRates(2200),
    transhipmentInfo: { available: false },
  },
  {
    id: "SOP-G BARKAT",
    name: "SOP-G BARKAT",
    category: "SOP",
    currentRate: 2150,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "BARKAT SOP-G: Standard granular SOP. Consistent quality.",
    regionRates: generateInitialRegionRates(2150),
    transhipmentInfo: { available: true, rates: [{ location: "Sialkot Port", cost: 70 }] },
  },
  {
    id: "SOP-G FFC",
    name: "SOP-G FFC",
    category: "SOP",
    currentRate: 2180,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FFC SOP-G: Reliable granular SOP. Widely used in horticulture.",
    regionRates: generateInitialRegionRates(2180),
    transhipmentInfo: { available: false },
  },
  {
    id: "SOP-P BARKAT",
    name: "SOP-P BARKAT",
    category: "SOP",
    currentRate: 2250,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "BARKAT SOP-P: Powder form. Suitable for foliar application.",
    regionRates: generateInitialRegionRates(2250),
    transhipmentInfo: { available: false },
  },
  {
    id: "SOP-P VAH",
    name: "SOP-P VAH",
    category: "SOP",
    currentRate: 2300,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "VAH SOP-P: Powder form, 25-KG bags. Quick dissolution.",
    regionRates: generateInitialRegionRates(2300),
    transhipmentInfo: { available: true, rates: [{ location: "Rawalpindi Warehouse", cost: 55 }] },
  },

  // SSPG Category
  {
    id: "SSPG TARA",
    name: "SSPG TARA",
    category: "SSPG",
    currentRate: 950,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SSPG TARA: Single Super Phosphate Granular. Essential for phosphorus supply.",
    regionRates: generateInitialRegionRates(950),
    transhipmentInfo: { available: true, rates: [{ location: "Sukkur Hub", cost: 25 }] },
  },

  // UREA Category
  {
    id: "UREA B-S (FAT)",
    name: "UREA B-S (FAT)",
    category: "UREA",
    currentRate: 3600,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "B-S FAT UREA: Fat-coated urea for slow release. Reduces nitrogen loss.",
    regionRates: generateInitialRegionRates(3600),
    transhipmentInfo: { available: true, rates: [{ location: "Multan Specialty Depot", cost: 150 }] },
  },
  {
    id: "UREA ENGRO",
    name: "UREA ENGRO",
    category: "UREA",
    currentRate: 3700,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "ENGRO UREA: Premium urea. Widely trusted brand.",
    regionRates: generateInitialRegionRates(3700),
    transhipmentInfo: { available: false },
  },
  {
    id: "UREA ENGRO (NFML)",
    name: "UREA ENGRO (NFML)",
    category: "UREA",
    currentRate: 3720,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "ENGRO NFML UREA: Non-Farm Mechanized Logistics. Specific distribution channels.",
    regionRates: generateInitialRegionRates(3720),
    transhipmentInfo: { available: true, rates: [{ location: "Remote Hub AJK", cost: 180 }] },
  },
  {
    id: "UREA FATIMA (NFML)(FAT)",
    name: "UREA FATIMA (NFML)(FAT)",
    category: "UREA",
    currentRate: 3680,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FATIMA NFML FAT UREA: Fat-coated, non-farm logistics. Enhanced efficiency.",
    regionRates: generateInitialRegionRates(3680),
    transhipmentInfo: { available: false },
  },
  {
    id: "UREA FATIMA(FAT)",
    name: "UREA FATIMA(FAT)",
    category: "UREA",
    currentRate: 3650,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "FATIMA FAT UREA: Fat-coated urea. Improved nutrient uptake.",
    regionRates: generateInitialRegionRates(3650),
    transhipmentInfo: { available: true, rates: [{ location: "Islamabad Distribution", cost: 130 }] },
  },
  {
    id: "UREA IMP.",
    name: "UREA IMP.",
    category: "UREA",
    currentRate: 3400,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "IMP. UREA: Imported urea. Competitive pricing.",
    regionRates: generateInitialRegionRates(3400),
    transhipmentInfo: { available: false },
  },
  {
    id: "UREA SONA-G",
    name: "UREA SONA-G",
    category: "UREA",
    currentRate: 3550,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA-G UREA: Granular urea. Easy to spread.",
    regionRates: generateInitialRegionRates(3550),
    transhipmentInfo: { available: true, rates: [{ location: "Local Farm Store KPK", cost: 110 }] },
  },
  {
    id: "UREA SONA-NEEM COATED",
    name: "UREA SONA-NEEM COATED",
    category: "UREA",
    currentRate: 3620,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA Neem Coated UREA: Neem coated for slow release and pest deterrence.",
    regionRates: generateInitialRegionRates(3620),
    transhipmentInfo: { available: false },
  },
  {
    id: "UREA SONA-P",
    name: "UREA SONA-P",
    category: "UREA",
    currentRate: 3580,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA-P UREA: Powdered urea. Quick action.",
    regionRates: generateInitialRegionRates(3580),
    transhipmentInfo: { available: true, rates: [{ location: "Agri-Service Point Balochistan", cost: 105 }] },
  },
  {
    id: "UREA SONA-P (NFML)",
    name: "UREA SONA-P (NFML)",
    category: "UREA",
    currentRate: 3600,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA-P NFML UREA: Powdered, non-farm logistics. Efficient delivery.",
    regionRates: generateInitialRegionRates(3600),
    transhipmentInfo: { available: false },
  },
  {
    id: "UREA TARA",
    name: "UREA TARA",
    category: "UREA",
    currentRate: 3530,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "TARA UREA: Standard urea. High nitrogen content.",
    regionRates: generateInitialRegionRates(3530),
    transhipmentInfo: { available: true, rates: [{ location: "Regional Hub Gilgit", cost: 95 }] },
  },
  {
    id: "UREA TARA (NFML)",
    name: "UREA TARA (NFML)",
    category: "UREA",
    currentRate: 3560,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "TARA NFML UREA: Non-Farm Mechanized Logistics. Specific distribution channels.",
    regionRates: generateInitialRegionRates(3560),
    transhipmentInfo: { available: false },
  },

  // ZARKHAIZ Category
  {
    id: "ZABARDAST ZARKHAIZ",
    name: "ZABARDAST ZARKHAIZ",
    category: "ZARKHAIZ",
    currentRate: 1900,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "ZABARDAST ZARKHAIZ: Premium soil enhancer. Boosts overall plant health.",
    regionRates: generateInitialRegionRates(1900),
    transhipmentInfo: { available: true, rates: [{ location: "Specialty Farm Sindh", cost: 65 }] },
  },

  // ZINC Category
  {
    id: "PLUS(MOP) ZINC",
    name: "PLUS(MOP) ZINC",
    category: "ZINC",
    currentRate: 1050,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "PLUS ZINC: MOP-enriched zinc. Corrects zinc deficiencies.",
    regionRates: generateInitialRegionRates(1050),
    transhipmentInfo: { available: false },
  },
  {
    id: "ZINC SONA",
    name: "ZINC SONA",
    category: "ZINC",
    currentRate: 1220,
    imageUrl: "/placeholder.svg?height=100&width=100",
    policy: "SONA ZINC: High-quality Zinc. Consistent performance.",
    regionRates: generateInitialRegionRates(1220),
    transhipmentInfo: { available: true, rates: [{ location: "Main Port Karachi", cost: 45 }] },
  },
]

// Use a mutable array for demonstration purposes in v0 preview
// In a real application, this would be a database or state management solution
const products: Product[] = initialProducts

export const getProducts = (): Product[] => {
  return products
}

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}
