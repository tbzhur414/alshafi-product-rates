import os
import json
from supabase import create_client, Client

# Ensure you have the supabase-py library installed: pip install supabase-py
# This script assumes your Supabase URL and ANON_KEY are set as environment variables.

# Load initial product data from the lib/data.ts file
# In a real scenario, you might parse the TS file or have a separate JSON data source.
# For this example, we'll simulate reading the data structure.
# You would copy the `initialProducts` array content from lib/data.ts here.

initial_products_data = [
    # A-S Category
    {
        "id": "A-S BARKAT",
        "name": "A-S BARKAT",
        "category": "A-S",
        "currentRate": 1200,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "Standard policy for A-S BARKAT. Refer to sales guidelines for terms.",
        "regionRates": [
            {"region": "Punjab", "rate": 1180}, {"region": "Sindh", "rate": 1230},
            {"region": "Khyber Pakhtunkhwa", "rate": 1210}, {"region": "Balochistan", "rate": 1190},
            {"region": "Gilgit-Baltistan", "rate": 1240}, {"region": "Azad Jammu and Kashmir", "rate": 1220}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "A-S VAH",
        "name": "A-S VAH",
        "category": "A-S",
        "currentRate": 1300,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "Premium A-S VAH product. Limited stock, advance booking recommended.",
        "regionRates": [
            {"region": "Punjab", "rate": 1280}, {"region": "Sindh", "rate": 1330},
            {"region": "Khyber Pakhtunkhwa", "rate": 1310}, {"region": "Balochistan", "rate": 1290},
            {"region": "Gilgit-Baltistan", "rate": 1340}, {"region": "Azad Jammu and Kashmir", "rate": 1320}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "A-S 7STAR",
        "name": "A-S 7STAR",
        "category": "A-S",
        "currentRate": 850,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "A-S 7STAR: Available in various sizes. Check packaging details.",
        "regionRates": [
            {"region": "Punjab", "rate": 830}, {"region": "Sindh", "rate": 880},
            {"region": "Khyber Pakhtunkhwa", "rate": 860}, {"region": "Balochistan", "rate": 840},
            {"region": "Gilgit-Baltistan", "rate": 890}, {"region": "Azad Jammu and Kashmir", "rate": 870}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Lahore Warehouse", "cost": 30}]},
        "isAvailable": True, # Default availability
    },

    # CAN Category
    {
        "id": "CAN F PAKARAB",
        "name": "CAN F PAKARAB",
        "category": "CAN",
        "currentRate": 900,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "PAKARAB CAN: High-fat content variant. Ideal for specific industrial applications.",
        "regionRates": [
            {"region": "Punjab", "rate": 880}, {"region": "Sindh", "rate": 930},
            {"region": "Khyber Pakhtunkhwa", "rate": 910}, {"region": "Balochistan", "rate": 890},
            {"region": "Gilgit-Baltistan", "rate": 940}, {"region": "Azad Jammu and Kashmir", "rate": 920}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "CAN G FATIMA",
        "name": "CAN G FATIMA",
        "category": "CAN",
        "currentRate": 2500,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FATIMA CAN: Premium fertilizer. Bulk purchase options available.",
        "regionRates": [
            {"region": "Punjab", "rate": 2480}, {"region": "Sindh", "rate": 2530},
            {"region": "Khyber Pakhtunkhwa", "rate": 2510}, {"region": "Balochistan", "rate": 2490},
            {"region": "Gilgit-Baltistan", "rate": 2540}, {"region": "Azad Jammu and Kashmir", "rate": 2520}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Karachi Port", "cost": 100}]},
        "isAvailable": True, # Default availability
    },

    # DAP Category
    {
        "id": "DAP BARKET-SV",
        "name": "DAP BARKET-SV",
        "category": "DAP",
        "currentRate": 2450,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "BARKET DAP: Standard grade DAP. Widely available.",
        "regionRates": [
            {"region": "Punjab", "rate": 2430}, {"region": "Sindh", "rate": 2480},
            {"region": "Khyber Pakhtunkhwa", "rate": 2460}, {"region": "Balochistan", "rate": 2440},
            {"region": "Gilgit-Baltistan", "rate": 2490}, {"region": "Azad Jammu and Kashmir", "rate": 2470}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "DAP ENGRO",
        "name": "DAP ENGRO",
        "category": "DAP",
        "currentRate": 2600,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "ENGRO DAP: High-quality DAP. Preferred by large-scale farms.",
        "regionRates": [
            {"region": "Punjab", "rate": 2580}, {"region": "Sindh", "rate": 2630},
            {"region": "Khyber Pakhtunkhwa", "rate": 2610}, {"region": "Balochistan", "rate": 2590},
            {"region": "Gilgit-Baltistan", "rate": 2640}, {"region": "Azad Jammu and Kashmir", "rate": 2620}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Faisalabad Logistics", "cost": 120}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "DAP FFBL",
        "name": "DAP FFBL",
        "category": "DAP",
        "currentRate": 2580,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FFBL DAP: Reliable and consistent performance. Bulk order discounts.",
        "regionRates": [
            {"region": "Punjab", "rate": 2560}, {"region": "Sindh", "rate": 2610},
            {"region": "Khyber Pakhtunkhwa", "rate": 2590}, {"region": "Balochistan", "rate": 2570},
            {"region": "Gilgit-Baltistan", "rate": 2620}, {"region": "Azad Jammu and Kashmir", "rate": 2600}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "DAP FFC",
        "name": "DAP FFC",
        "category": "DAP",
        "currentRate": 2570,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FFC DAP: Trusted brand in agriculture. Available nationwide.",
        "regionRates": [
            {"region": "Punjab", "rate": 2550}, {"region": "Sindh", "rate": 2600},
            {"region": "Khyber Pakhtunkhwa", "rate": 2580}, {"region": "Balochistan", "rate": 2560},
            {"region": "Gilgit-Baltistan", "rate": 2610}, {"region": "Azad Jammu and Kashmir", "rate": 2590}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Multan Depot", "cost": 90}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "DAP SARSABZ(FAT)",
        "name": "DAP SARSABZ(FAT)",
        "category": "DAP",
        "currentRate": 2590,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SARSABZ DAP: Enriched formula for better yield. Seasonal availability.",
        "regionRates": [
            {"region": "Punjab", "rate": 2570}, {"region": "Sindh", "rate": 2620},
            {"region": "Khyber Pakhtunkhwa", "rate": 2600}, {"region": "Balochistan", "rate": 2580},
            {"region": "Gilgit-Baltistan", "rate": 2630}, {"region": "Azad Jammu and Kashmir", "rate": 2610}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "DAP SONA",
        "name": "DAP SONA",
        "category": "DAP",
        "currentRate": 2560,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA DAP: Cost-effective solution for general farming. Large quantities available.",
        "regionRates": [
            {"region": "Punjab", "rate": 2540}, {"region": "Sindh", "rate": 2590},
            {"region": "Khyber Pakhtunkhwa", "rate": 2570}, {"region": "Balochistan", "rate": 2550},
            {"region": "Gilgit-Baltistan", "rate": 2600}, {"region": "Azad Jammu and Kashmir", "rate": 2580}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Peshawar Distribution", "cost": 80}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "VAH AUSTRALIAN",
        "name": "VAH AUSTRALIAN",
        "category": "DAP",
        "currentRate": 700,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "VAH Australian: Imported quality DAP. Best for soil conditioning.",
        "regionRates": [
            {"region": "Punjab", "rate": 680}, {"region": "Sindh", "rate": 730},
            {"region": "Khyber Pakhtunkhwa", "rate": 710}, {"region": "Balochistan", "rate": 690},
            {"region": "Gilgit-Baltistan", "rate": 740}, {"region": "Azad Jammu and Kashmir", "rate": 720}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },

    # MOP Category
    {
        "id": "MOP BARKAT-PINK-G",
        "name": "MOP BARKAT-PINK-G",
        "category": "MOP",
        "currentRate": 1850,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "BARKAT Pink MOP: Granular form, easy application. Limited edition.",
        "regionRates": [
            {"region": "Punjab", "rate": 1830}, {"region": "Sindh", "rate": 1880},
            {"region": "Khyber Pakhtunkhwa", "rate": 1860}, {"region": "Balochistan", "rate": 1840},
            {"region": "Gilgit-Baltistan", "rate": 1890}, {"region": "Azad Jammu and Kashmir", "rate": 1870}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "MOP BARKAT-WHITE-G",
        "name": "MOP BARKAT-WHITE-G",
        "category": "MOP",
        "currentRate": 1800,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "BARKAT White MOP: Standard MOP product. Essential for potassium deficiency.",
        "regionRates": [
            {"region": "Punjab", "rate": 1780}, {"region": "Sindh", "rate": 1830},
            {"region": "Khyber Pakhtunkhwa", "rate": 1810}, {"region": "Balochistan", "rate": 1790},
            {"region": "Gilgit-Baltistan", "rate": 1840}, {"region": "Azad Jammu and Kashmir", "rate": 1820}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Quetta Agri Port", "cost": 60}]},
        "isAvailable": True, # Default availability
    },

    # NP Category
    {
        "id": "NP ENGRO PLUS-18:18",
        "name": "NP ENGRO PLUS-18:18",
        "category": "NP",
        "currentRate": 1600,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "ENGRO PLUS NP: 18:18 ratio. Enhanced formula for robust plant development.",
        "regionRates": [
            {"region": "Punjab", "rate": 1580}, {"region": "Sindh", "rate": 1630},
            {"region": "Khyber Pakhtunkhwa", "rate": 1610}, {"region": "Balochistan", "rate": 1590},
            {"region": "Gilgit-Baltistan", "rate": 1640}, {"region": "Azad Jammu and Kashmir", "rate": 1620}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "NP PAKARAB",
        "name": "NP PAKARAB",
        "category": "NP",
        "currentRate": 1550,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "PAKARAB NP: Fat-enriched NP. Improves soil fertility and crop yield.",
        "regionRates": [
            {"region": "Punjab", "rate": 1530}, {"region": "Sindh", "rate": 1580},
            {"region": "Khyber Pakhtunkhwa", "rate": 1560}, {"region": "Balochistan", "rate": 1540},
            {"region": "Gilgit-Baltistan", "rate": 1590}, {"region": "Azad Jammu and Kashmir", "rate": 1570}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Hyderabad Depot", "cost": 35}]},
        "isAvailable": True, # Default availability
    },

    # SOP Category
    {
        "id": "SARSABZ(SOP)",
        "name": "SARSABZ(SOP)",
        "category": "SOP",
        "currentRate": 2200,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SARSABZ SOP: Granular SOP. Ideal for crops sensitive to chloride.",
        "regionRates": [
            {"region": "Punjab", "rate": 2180}, {"region": "Sindh", "rate": 2230},
            {"region": "Khyber Pakhtunkhwa", "rate": 2210}, {"region": "Balochistan", "rate": 2190},
            {"region": "Gilgit-Baltistan", "rate": 2240}, {"region": "Azad Jammu and Kashmir", "rate": 2220}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "SOP-G BARKAT",
        "name": "SOP-G BARKAT",
        "category": "SOP",
        "currentRate": 2150,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "BARKAT SOP-G: Standard granular SOP. Consistent quality.",
        "regionRates": [
            {"region": "Punjab", "rate": 2130}, {"region": "Sindh", "rate": 2180},
            {"region": "Khyber Pakhtunkhwa", "rate": 2160}, {"region": "Balochistan", "rate": 2140},
            {"region": "Gilgit-Baltistan", "rate": 2190}, {"region": "Azad Jammu and Kashmir", "rate": 2170}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Sialkot Port", "cost": 70}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "SOP-G FFC",
        "name": "SOP-G FFC",
        "category": "SOP",
        "currentRate": 2180,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FFC SOP-G: Reliable granular SOP. Widely used in horticulture.",
        "regionRates": [
            {"region": "Punjab", "rate": 2160}, {"region": "Sindh", "rate": 2210},
            {"region": "Khyber Pakhtunkhwa", "rate": 2190}, {"region": "Balochistan", "rate": 2170},
            {"region": "Gilgit-Baltistan", "rate": 2220}, {"region": "Azad Jammu and Kashmir", "rate": 2200}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "SOP-P BARKAT",
        "name": "SOP-P BARKAT",
        "category": "SOP",
        "currentRate": 2250,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "BARKAT SOP-P: Powder form. Suitable for foliar application.",
        "regionRates": [
            {"region": "Punjab", "rate": 2230}, {"region": "Sindh", "rate": 2280},
            {"region": "Khyber Pakhtunkhwa", "rate": 2260}, {"region": "Balochistan", "rate": 2240},
            {"region": "Gilgit-Baltistan", "rate": 2290}, {"region": "Azad Jammu and Kashmir", "rate": 2270}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "SOP-P VAH",
        "name": "SOP-P VAH",
        "category": "SOP",
        "currentRate": 2300,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "VAH SOP-P: Powder form, 25-KG bags. Quick dissolution.",
        "regionRates": [
            {"region": "Punjab", "rate": 2280}, {"region": "Sindh", "rate": 2330},
            {"region": "Khyber Pakhtunkhwa", "rate": 2310}, {"region": "Balochistan", "rate": 2290},
            {"region": "Gilgit-Baltistan", "rate": 2340}, {"region": "Azad Jammu and Kashmir", "rate": 2320}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Rawalpindi Warehouse", "cost": 55}]},
        "isAvailable": True, # Default availability
    },

    # SSPG Category
    {
        "id": "SSPG TARA",
        "name": "SSPG TARA",
        "category": "SSPG",
        "currentRate": 950,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SSPG TARA: Single Super Phosphate Granular. Essential for phosphorus supply.",
        "regionRates": [
            {"region": "Punjab", "rate": 930}, {"region": "Sindh", "rate": 980},
            {"region": "Khyber Pakhtunkhwa", "rate": 960}, {"region": "Balochistan", "rate": 940},
            {"region": "Gilgit-Baltistan", "rate": 990}, {"region": "Azad Jammu and Kashmir", "rate": 970}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Sukkur Hub", "cost": 25}]},
        "isAvailable": True, # Default availability
    },

    # UREA Category
    {
        "id": "UREA B-S (FAT)",
        "name": "UREA B-S (FAT)",
        "category": "UREA",
        "currentRate": 3600,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "B-S FAT UREA: Fat-coated urea for slow release. Reduces nitrogen loss.",
        "regionRates": [
            {"region": "Punjab", "rate": 3580}, {"region": "Sindh", "rate": 3630},
            {"region": "Khyber Pakhtunkhwa", "rate": 3610}, {"region": "Balochistan", "rate": 3590},
            {"region": "Gilgit-Baltistan", "rate": 3640}, {"region": "Azad Jammu and Kashmir", "rate": 3620}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Multan Specialty Depot", "cost": 150}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA ENGRO",
        "name": "UREA ENGRO",
        "category": "UREA",
        "currentRate": 3700,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "ENGRO UREA: Premium urea. Widely trusted brand.",
        "regionRates": [
            {"region": "Punjab", "rate": 3680}, {"region": "Sindh", "rate": 3730},
            {"region": "Khyber Pakhtunkhwa", "rate": 3710}, {"region": "Balochistan", "rate": 3690},
            {"region": "Gilgit-Baltistan", "rate": 3740}, {"region": "Azad Jammu and Kashmir", "rate": 3720}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA ENGRO (NFML)",
        "name": "UREA ENGRO (NFML)",
        "category": "UREA",
        "currentRate": 3720,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "ENGRO NFML UREA: Non-Farm Mechanized Logistics. Specific distribution channels.",
        "regionRates": [
            {"region": "Punjab", "rate": 3700}, {"region": "Sindh", "rate": 3750},
            {"region": "Khyber Pakhtunkhwa", "rate": 3730}, {"region": "Balochistan", "rate": 3710},
            {"region": "Gilgit-Baltistan", "rate": 3760}, {"region": "Azad Jammu and Kashmir", "rate": 3740}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Remote Hub AJK", "cost": 180}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA FATIMA (NFML)(FAT)",
        "name": "UREA FATIMA (NFML)(FAT)",
        "category": "UREA",
        "currentRate": 3680,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FATIMA NFML FAT UREA: Fat-coated, non-farm logistics. Enhanced efficiency.",
        "regionRates": [
            {"region": "Punjab", "rate": 3660}, {"region": "Sindh", "rate": 3710},
            {"region": "Khyber Pakhtunkhwa", "rate": 3690}, {"region": "Balochistan", "rate": 3670},
            {"region": "Gilgit-Baltistan", "rate": 3720}, {"region": "Azad Jammu and Kashmir", "rate": 3700}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA FATIMA(FAT)",
        "name": "UREA FATIMA(FAT)",
        "category": "UREA",
        "currentRate": 3650,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "FATIMA FAT UREA: Fat-coated urea. Improved nutrient uptake.",
        "regionRates": [
            {"region": "Punjab", "rate": 3630}, {"region": "Sindh", "rate": 3680},
            {"region": "Khyber Pakhtunkhwa", "rate": 3660}, {"region": "Balochistan", "rate": 3640},
            {"region": "Gilgit-Baltistan", "rate": 3690}, {"region": "Azad Jammu and Kashmir", "rate": 3670}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Islamabad Distribution", "cost": 130}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA IMP.",
        "name": "UREA IMP.",
        "category": "UREA",
        "currentRate": 3400,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "IMP. UREA: Imported urea. Competitive pricing.",
        "regionRates": [
            {"region": "Punjab", "rate": 3380}, {"region": "Sindh", "rate": 3430},
            {"region": "Khyber Pakhtunkhwa", "rate": 3410}, {"region": "Balochistan", "rate": 3390},
            {"region": "Gilgit-Baltistan", "rate": 3440}, {"region": "Azad Jammu and Kashmir", "rate": 3420}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA SONA-G",
        "name": "UREA SONA-G",
        "category": "UREA",
        "currentRate": 3550,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA-G UREA: Granular urea. Easy to spread.",
        "regionRates": [
            {"region": "Punjab", "rate": 3530}, {"region": "Sindh", "rate": 3580},
            {"region": "Khyber Pakhtunkhwa", "rate": 3560}, {"region": "Balochistan", "rate": 3540},
            {"region": "Gilgit-Baltistan", "rate": 3590}, {"region": "Azad Jammu and Kashmir", "rate": 3570}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Local Farm Store KPK", "cost": 110}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA SONA-NEEM COATED",
        "name": "UREA SONA-NEEM COATED",
        "category": "UREA",
        "currentRate": 3620,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA Neem Coated UREA: Neem coated for slow release and pest deterrence.",
        "regionRates": [
            {"region": "Punjab", "rate": 3600}, {"region": "Sindh", "rate": 3650},
            {"region": "Khyber Pakhtunkhwa", "rate": 3630}, {"region": "Balochistan", "rate": 3610},
            {"region": "Gilgit-Baltistan", "rate": 3660}, {"region": "Azad Jammu and Kashmir", "rate": 3640}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA SONA-P",
        "name": "UREA SONA-P",
        "category": "UREA",
        "currentRate": 3580,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA-P UREA: Powdered urea. Quick action.",
        "regionRates": [
            {"region": "Punjab", "rate": 3560}, {"region": "Sindh", "rate": 3610},
            {"region": "Khyber Pakhtunkhwa", "rate": 3590}, {"region": "Balochistan", "rate": 3570},
            {"region": "Gilgit-Baltistan", "rate": 3620}, {"region": "Azad Jammu and Kashmir", "rate": 3600}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Agri-Service Point Balochistan", "cost": 105}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA SONA-P (NFML)",
        "name": "UREA SONA-P (NFML)",
        "category": "UREA",
        "currentRate": 3600,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA-P NFML UREA: Powdered, non-farm logistics. Efficient delivery.",
        "regionRates": [
            {"region": "Punjab", "rate": 3580}, {"region": "Sindh", "rate": 3630},
            {"region": "Khyber Pakhtunkhwa", "rate": 3610}, {"region": "Balochistan", "rate": 3590},
            {"region": "Gilgit-Baltistan", "rate": 3640}, {"region": "Azad Jammu and Kashmir", "rate": 3620}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA TARA",
        "name": "UREA TARA",
        "category": "UREA",
        "currentRate": 3530,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "TARA UREA: Standard urea. High nitrogen content.",
        "regionRates": [
            {"region": "Punjab", "rate": 3510}, {"region": "Sindh", "rate": 3560},
            {"region": "Khyber Pakhtunkhwa", "rate": 3540}, {"region": "Balochistan", "rate": 3520},
            {"region": "Gilgit-Baltistan", "rate": 3570}, {"region": "Azad Jammu and Kashmir", "rate": 3550}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Regional Hub Gilgit", "cost": 95}]},
        "isAvailable": True, # Default availability
    },
    {
        "id": "UREA TARA (NFML)",
        "name": "UREA TARA (NFML)",
        "category": "UREA",
        "currentRate": 3560,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "TARA NFML UREA: Non-Farm Mechanized Logistics. Specific distribution channels.",
        "regionRates": [
            {"region": "Punjab", "rate": 3540}, {"region": "Sindh", "rate": 3590},
            {"region": "Khyber Pakhtunkhwa", "rate": 3570}, {"region": "Balochistan", "rate": 3550},
            {"region": "Gilgit-Baltistan", "rate": 3600}, {"region": "Azad Jammu and Kashmir", "rate": 3580}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },

    # ZARKHAIZ Category
    {
        "id": "ZABARDAST ZARKHAIZ",
        "name": "ZABARDAST ZARKHAIZ",
        "category": "ZARKHAIZ",
        "currentRate": 1900,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "ZABARDAST ZARKHAIZ: Premium soil enhancer. Boosts overall plant health.",
        "regionRates": [
            {"region": "Punjab", "rate": 1880}, {"region": "Sindh", "rate": 1930},
            {"region": "Khyber Pakhtunkhwa", "rate": 1910}, {"region": "Balochistan", "rate": 1890},
            {"region": "Gilgit-Baltistan", "rate": 1940}, {"region": "Azad Jammu and Kashmir", "rate": 1920}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Specialty Farm Sindh", "cost": 65}]},
        "isAvailable": True, # Default availability
    },

    # ZINC Category
    {
        "id": "PLUS(MOP) ZINC",
        "name": "PLUS(MOP) ZINC",
        "category": "ZINC",
        "currentRate": 1050,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "PLUS ZINC: MOP-enriched zinc. Corrects zinc deficiencies.",
        "regionRates": [
            {"region": "Punjab", "rate": 1030}, {"region": "Sindh", "rate": 1080},
            {"region": "Khyber Pakhtunkhwa", "rate": 1060}, {"region": "Balochistan", "rate": 1040},
            {"region": "Gilgit-Baltistan", "rate": 1090}, {"region": "Azad Jammu and Kashmir", "rate": 1070}
        ],
        "transhipmentInfo": {"available": False},
        "isAvailable": True, # Default availability
    },
    {
        "id": "ZINC SONA",
        "name": "ZINC SONA",
        "category": "ZINC",
        "currentRate": 1220,
        "imageUrl": "/placeholder.svg?height=100&width=100",
        "policy": "SONA ZINC: High-quality Zinc. Consistent performance.",
        "regionRates": [
            {"region": "Punjab", "rate": 1200}, {"region": "Sindh", "rate": 1250},
            {"region": "Khyber Pakhtunkhwa", "rate": 1230}, {"region": "Balochistan", "rate": 1210},
            {"region": "Gilgit-Baltistan", "rate": 1260}, {"region": "Azad Jammu and Kashmir", "rate": 1240}
        ],
        "transhipmentInfo": {"available": True, "rates": [{"location": "Main Port Karachi", "cost": 45}]},
        "isAvailable": True, # Default availability
    },
]


def seed_products_to_supabase():
    url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    if not url or not key:
        print("Error: Supabase URL or ANON Key not found in environment variables.")
        print("Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
        return

    supabase: Client = create_client(url, key)

    print("Attempting to connect to Supabase and seed data...")

    try:
        # Clear existing data (optional, for fresh seeding)
        # response = supabase.from('products').delete().neq('id', 'null').execute()
        # if response.data:
        #     print(f"Deleted {len(response.data)} existing records.")
        # else:
        #     print("No existing records to delete or deletion failed.")

        for product in initial_products_data:
            # Convert camelCase keys to snake_case for Supabase table
            supabase_product = {
                "id": product["id"],
                "name": product["name"],
                "category": product["category"],
                "current_rate": product["currentRate"],
                "image_url": product["imageUrl"],
                "policy": product["policy"],
                "region_rates": json.dumps(product["regionRates"]), # Store JSONB as string
                "transhipment_info": json.dumps(product["transhipmentInfo"]), # Store JSONB as string
                "is_available": product["isAvailable"], # New: Include availability
            }
            
            # Check if product already exists to avoid duplicates on re-run
            existing_product = supabase.from('products').select('id').eq('id', product['id']).execute()
            if existing_product.data:
                print(f"Product {product['id']} already exists. Skipping insertion.")
                continue

            response = supabase.from('products').insert(supabase_product).execute()
            if response.data:
                print(f"Successfully inserted: {product['name']}")
            elif response.error:
                print(f"Error inserting {product['name']}: {response.error}")
            else:
                print(f"Unknown response for {product['name']}: {response}")

        print("Data seeding process completed.")

    except Exception as e:
        print(f"An error occurred during Supabase operation: {e}")

if __name__ == "__main__":
    seed_products_to_supabase()
