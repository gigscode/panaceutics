# Quick Reference - Editing Category Products

## Where to Edit Each Category's Products

| Category | File Path |
|----------|-----------|
| Metabolic syndrome | `lib/categories/metabolic-syndrome.ts` |
| Oncology | `lib/categories/oncology.ts` |
| Neurology | `lib/categories/neurology.ts` |
| Nephrology | `lib/categories/nephrology.ts` |
| Hematology | `lib/categories/hematology.ts` |
| Infectiology | `lib/categories/infectiology.ts` |
| Retinology | `lib/categories/retinology.ts` |

## Common Edits

### Edit Product Image
```typescript
// In lib/categories/[category-name].ts
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    title: "Product Title",
    image: "/new-image.jpg", // ← Change this
    // ... rest of product
  },
]
```

### Edit Product Title
```typescript
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    title: "New Product Title", // ← Change this
    // ... rest of product
  },
]
```

### Edit Product Description
```typescript
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    description: "New description text", // ← Change this
    // ... rest of product
  },
]
```

### Edit Product Price
```typescript
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    price: { amount: 50000, currency: 'NGN' }, // ← Change amount
    // ... rest of product
  },
]
```

### Edit Product Details
```typescript
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    details: "New detailed information", // ← Change this
    // ... rest of product
  },
]
```

## Add New Product to a Category

1. Open the category file: `lib/categories/[category-name].ts`
2. Add a new object to the array:

```typescript
export const [categoryName]Products: Research[] = [
  {
    id: "1",
    title: "Existing Product",
    // ... existing product
  },
  {
    id: "8", // ← New ID (increment from last)
    title: "New Product Title",
    category: "Category Name",
    description: "Product description",
    image: "/image-path.jpg",
    price: { amount: 25000, currency: 'NGN' },
    comparePrice: { amount: 30000, currency: 'NGN' },
    rating: 4.8,
    details: "Detailed product information",
  },
]
```

## Important Notes

✅ **Each category file is INDEPENDENT** - Changes only affect that category
✅ **Use the correct category name** - Must match exactly (case-sensitive)
✅ **Keep the same structure** - All products must have the same fields
✅ **Use unique IDs** - Each product needs a unique `id` value
✅ **Currency is NGN** - All prices use Nigerian Naira

## Product Fields Reference

```typescript
interface Research {
  id: string                    // Unique identifier
  title: string                 // Product name
  category: string              // Category name (must match file)
  description: string           // Short description
  image: string                 // Image path (e.g., "/ginger.jpg")
  price?: Price                 // Price object
  comparePrice?: Price          // Original/compare price
  rating?: number               // Product rating (0-5)
  details?: string              // Detailed description
  date?: string                 // Optional date
  readTime?: string             // Optional read time
}

interface Price {
  amount: number                // Price amount
  currency: 'NGN' | 'USD'       // Currency code
}
```

## Example: Complete Product

```typescript
{
  id: "1",
  title: "Integrated Management of Metabolic Syndrome.",
  category: "Metabolic syndrome",
  description: "Research on Sphenolax®, BPVomin®, and Nu-beta®, a series of innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity, key components of metabolic syndrome.",
  image: "/ginger.jpg",
  price: { amount: 25500, currency: 'NGN' },
  comparePrice: { amount: 30000, currency: 'NGN' },
  rating: 4.8,
  details: "A combination herbal formulation intended to support metabolic health. Clinical data suggests improvements in fasting glucose and blood pressure in preliminary studies. Consult a clinician for dosing and interactions.",
}
```

## Troubleshooting

**Q: I edited a product but the change doesn't show up**
A: Make sure you edited the correct category file and saved the file.

**Q: Changes to one category are affecting another**
A: This shouldn't happen with the new structure. Check that you edited the right file.

**Q: I want to add a product to multiple categories**
A: Add the product to each category's file separately. Each category has independent data.

**Q: How do I delete a product?**
A: Remove the product object from the category's array in `lib/categories/[category-name].ts`

## Need Help?

See `CATEGORY_INDEPENDENCE_GUIDE.md` for detailed explanation of how the system works.

