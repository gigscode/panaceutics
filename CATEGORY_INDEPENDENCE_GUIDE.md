# Category Independence Fix - Complete Guide

## Problem Identified

Previously, all 7 categories were sharing the **same hardcoded `researches` array** from `lib/researches.ts`. This meant:

- When you edited a product's image or information in one category's code
- That change would appear in ALL categories because they all referenced the same shared array
- Each category was not truly independent

**Example of the problem:**
```typescript
// OLD - All categories shared this array
export const researches: Research[] = [
  { id: "1", category: "Metabolic syndrome", image: "/ginger.jpg", ... },
  { id: "2", category: "Oncology", image: "/herbthree.jpg", ... },
  // ... all 7 categories mixed together
]

// In the category page:
const items = researches.filter((r) => r.category === matched) // Still shared!
```

## Solution Implemented

Each category now has its **own independent product data file** in `lib/categories/`:

```
lib/categories/
├── index.ts                    # Helper functions to access category products
├── metabolic-syndrome.ts       # Metabolic syndrome products ONLY
├── oncology.ts                 # Oncology products ONLY
├── neurology.ts                # Neurology products ONLY
├── nephrology.ts               # Nephrology products ONLY
├── hematology.ts               # Hematology products ONLY
├── infectiology.ts             # Infectiology products ONLY
└── retinology.ts               # Retinology products ONLY
```

## How It Works

### 1. Independent Product Files

Each category file contains ONLY that category's products:

**`lib/categories/metabolic-syndrome.ts`:**
```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    image: "/ginger.jpg",
    // ... only metabolic syndrome products here
  },
]
```

**`lib/categories/oncology.ts`:**
```typescript
export const oncologyProducts: Research[] = [
  {
    id: "2",
    title: "Synergistic Anticancer Effects of Herbs.",
    category: "Oncology",
    image: "/herbthree.jpg",
    // ... only oncology products here
  },
]
```

### 2. Central Index File

`lib/categories/index.ts` provides helper functions:

```typescript
// Map category names to their independent product arrays
const categoryProductsMap: Record<string, Research[]> = {
  'Metabolic syndrome': metabolicSyndromeProducts,
  'Oncology': oncologyProducts,
  'Neurology': neurologyProducts,
  // ... etc
}

// Get products for a specific category
export function getCategoryProducts(category: string): Research[] {
  return categoryProductsMap[category] || []
}

// Get all categories
export function getAllCategories(): string[] {
  return Object.keys(categoryProductsMap)
}

// Get all products across all categories
export function getAllProducts(): Research[] {
  return Object.values(categoryProductsMap).flat()
}
```

### 3. Updated Components

**`app/explore/[slug]/page.tsx`:**
```typescript
import { getCategoryProducts, getAllCategories } from "@/lib/categories"

// Now each category gets its OWN independent products
const items = matched ? getCategoryProducts(matched) : []
```

**`components/explore.tsx`:**
```typescript
import { getAllCategories, getAllProducts } from "@/lib/categories"

// Each category's products are independent
const allProducts = getAllProducts()
const filteredResearches = selectedCategory 
  ? allProducts.filter((r) => r.category === selectedCategory) 
  : allProducts
```

**`app/explore/categories/page.tsx`:**
```typescript
import { getAllCategories, getCategoryProducts } from "@/lib/categories"

// Get representative product from each category's independent data
const categoryProducts = getCategoryProducts(cat)
const repr = categoryProducts[0]
```

## How to Edit Products

Now when you want to edit a product for a specific category, you edit ONLY that category's file:

### Example: Edit Metabolic Syndrome Product

**File:** `lib/categories/metabolic-syndrome.ts`

```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    description: "YOUR NEW DESCRIPTION HERE", // ← Edit here
    image: "/your-new-image.jpg", // ← Edit here
    price: { amount: 25500, currency: 'NGN' },
    // ... other fields
  },
]
```

✅ **This change affects ONLY the Metabolic syndrome category**
✅ **Other categories (Oncology, Neurology, etc.) are NOT affected**

### Example: Edit Oncology Product

**File:** `lib/categories/oncology.ts`

```typescript
export const oncologyProducts: Research[] = [
  {
    id: "2",
    title: "Synergistic Anticancer Effects of Herbs.",
    category: "Oncology",
    description: "YOUR NEW DESCRIPTION HERE", // ← Edit here
    image: "/your-new-image.jpg", // ← Edit here
    // ... other fields
  },
]
```

✅ **This change affects ONLY the Oncology category**
✅ **Other categories are NOT affected**

## Adding New Products to a Category

To add a new product to a category, edit that category's file:

**`lib/categories/metabolic-syndrome.ts`:**
```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    // ... existing product
  },
  {
    id: "8", // ← New product
    title: "New Metabolic Syndrome Product",
    category: "Metabolic syndrome",
    description: "New product description",
    image: "/new-image.jpg",
    price: { amount: 20000, currency: 'NGN' },
    // ... other fields
  },
]
```

## Key Benefits

✅ **True Category Independence** - Each category has its own data file
✅ **No Cross-Contamination** - Editing one category doesn't affect others
✅ **Easy to Maintain** - Find and edit products in their category-specific file
✅ **Clear Organization** - Products are organized by category in the file structure
✅ **Scalable** - Easy to add new categories or products
✅ **Type-Safe** - All products still use the Research interface

## File Structure Summary

```
lib/
├── researches.ts              # Keep for interface definitions (Research type)
└── categories/
    ├── index.ts               # Helper functions (getCategoryProducts, etc.)
    ├── metabolic-syndrome.ts  # Metabolic syndrome products
    ├── oncology.ts            # Oncology products
    ├── neurology.ts           # Neurology products
    ├── nephrology.ts          # Nephrology products
    ├── hematology.ts          # Hematology products
    ├── infectiology.ts        # Infectiology products
    └── retinology.ts          # Retinology products

app/explore/
├── [slug]/page.tsx            # Uses getCategoryProducts()
├── categories/page.tsx        # Uses getAllCategories()
└── ...

components/
├── explore.tsx                # Uses getAllProducts()
└── ...
```

## Testing Category Independence

To verify that categories are now independent:

1. Edit a product image in `lib/categories/metabolic-syndrome.ts`
2. Check that the Metabolic syndrome category page shows the new image
3. Check that OTHER categories (Oncology, Neurology, etc.) are NOT affected
4. Repeat for different categories to confirm independence

All categories should now be completely independent! 🎉

