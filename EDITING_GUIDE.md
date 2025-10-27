# How to Edit Products - Step by Step Guide

## Overview

Each of the 7 categories now has its own independent product file. When you edit a product in one category's file, **only that category is affected**.

## Step-by-Step: Edit a Product

### Step 1: Find the Category File

Open the file for the category you want to edit:

| Category | File Path |
|----------|-----------|
| Metabolic syndrome | `lib/categories/metabolic-syndrome.ts` |
| Oncology | `lib/categories/oncology.ts` |
| Neurology | `lib/categories/neurology.ts` |
| Nephrology | `lib/categories/nephrology.ts` |
| Hematology | `lib/categories/hematology.ts` |
| Infectiology | `lib/categories/infectiology.ts` |
| Retinology | `lib/categories/retinology.ts` |

### Step 2: Locate the Product

Find the product you want to edit in the array. Each file contains products for that category only.

**Example:** `lib/categories/metabolic-syndrome.ts`
```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    description: "...",
    image: "/ginger.jpg",
    price: { amount: 25500, currency: 'NGN' },
    // ... other fields
  },
]
```

### Step 3: Make Your Changes

Edit the fields you want to change:

#### Change Product Image
```typescript
image: "/new-image.jpg", // ← Change this
```

#### Change Product Title
```typescript
title: "New Product Title", // ← Change this
```

#### Change Product Description
```typescript
description: "New description text", // ← Change this
```

#### Change Product Price
```typescript
price: { amount: 50000, currency: 'NGN' }, // ← Change amount
```

#### Change Product Details
```typescript
details: "New detailed information", // ← Change this
```

### Step 4: Save the File

Save the file (Ctrl+S or Cmd+S). The changes will be reflected immediately.

## Example: Complete Edit

### Before
```typescript
// lib/categories/metabolic-syndrome.ts
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Integrated Management of Metabolic Syndrome.",
    category: "Metabolic syndrome",
    description: "Research on Sphenolax®, BPVomin®, and Nu-beta®...",
    image: "/ginger.jpg",
    price: { amount: 25500, currency: 'NGN' },
    comparePrice: { amount: 30000, currency: 'NGN' },
    rating: 4.8,
    details: "A combination herbal formulation...",
  },
]
```

### After (Edited)
```typescript
// lib/categories/metabolic-syndrome.ts
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Advanced Metabolic Syndrome Management.", // ← Changed
    category: "Metabolic syndrome",
    description: "Cutting-edge research on herbal formulations...", // ← Changed
    image: "/new-metabolic-image.jpg", // ← Changed
    price: { amount: 35000, currency: 'NGN' }, // ← Changed
    comparePrice: { amount: 40000, currency: 'NGN' }, // ← Changed
    rating: 4.9, // ← Changed
    details: "Advanced formulation with enhanced bioavailability...", // ← Changed
  },
]
```

✅ **Result:** Only the Metabolic syndrome category is affected
✅ **Other categories:** Oncology, Neurology, etc. remain unchanged

## Adding a New Product

### Step 1: Open the Category File

Open the file for the category where you want to add a product.

### Step 2: Add a New Product Object

Add a new object to the array with a unique ID:

```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Existing Product",
    // ... existing product
  },
  {
    id: "8", // ← New unique ID
    title: "New Metabolic Syndrome Product",
    category: "Metabolic syndrome",
    description: "Description of the new product",
    image: "/new-product-image.jpg",
    price: { amount: 20000, currency: 'NGN' },
    comparePrice: { amount: 25000, currency: 'NGN' },
    rating: 4.7,
    details: "Detailed information about the new product",
  },
]
```

### Step 3: Save the File

Save the file. The new product will appear in that category.

## Deleting a Product

### Step 1: Open the Category File

Open the file for the category containing the product to delete.

### Step 2: Remove the Product Object

Delete the entire product object from the array:

```typescript
export const metabolicSyndromeProducts: Research[] = [
  {
    id: "1",
    title: "Keep This Product",
    // ... product to keep
  },
  // ← Delete the product object you don't want
]
```

### Step 3: Save the File

Save the file. The product will no longer appear in that category.

## Important Notes

✅ **Each file is independent** - Changes only affect that category
✅ **Use unique IDs** - Each product needs a unique `id` value
✅ **Keep the structure** - All products must have the same fields
✅ **Currency is NGN** - All prices use Nigerian Naira
✅ **Category name must match** - The `category` field must match the file's category

## Product Fields Reference

```typescript
interface Research {
  id: string                    // Unique identifier (required)
  title: string                 // Product name (required)
  category: string              // Category name (required)
  description: string           // Short description (required)
  image: string                 // Image path (required)
  price?: Price                 // Price object (optional)
  comparePrice?: Price          // Original/compare price (optional)
  rating?: number               // Product rating 0-5 (optional)
  details?: string              // Detailed description (optional)
  date?: string                 // Optional date
  readTime?: string             // Optional read time
}

interface Price {
  amount: number                // Price amount
  currency: 'NGN' | 'USD'       // Currency code
}
```

## Verification

After making changes:

1. **Check the category page** - Visit `/explore/[category-slug]` to see your changes
2. **Check other categories** - Verify they are NOT affected
3. **Check the explore page** - Visit `/explore` to see all categories

All changes should be visible immediately after saving!

## Troubleshooting

**Q: I edited a product but don't see the change**
A: Make sure you saved the file. Check that you edited the correct category file.

**Q: My changes affected other categories**
A: This shouldn't happen. Verify you edited the correct file in `lib/categories/`.

**Q: I want to copy a product to another category**
A: Add the product to the other category's file separately. Each category has independent data.

**Q: The product doesn't appear on the page**
A: Check that the `category` field matches the category name exactly (case-sensitive).

---

**Need more help?** See `QUICK_REFERENCE.md` or `CATEGORY_INDEPENDENCE_GUIDE.md`

