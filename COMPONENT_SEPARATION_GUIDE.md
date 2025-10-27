# 📖 Component Separation Guide - Complete Reference

## 🎯 Problem & Solution

### The Problem
When you edited a product in `lib/categories/metabolic-syndrome.ts`, it affected:
- Homepage explore section ❌
- `/explore/categories` page ❌

This happened because both pages were using **product data** instead of **category data**.

### The Solution
Created a complete separation between:
- **Category Cards** - Display category information (used on homepage and categories page)
- **Product Cards** - Display product information (used on individual category pages)

---

## 📁 File Structure

### New Files (2)

#### 1. `lib/categories/category-data.ts`
**What it contains:**
- `CategoryData` interface
- `categoryDataList` array with 7 categories
- Helper functions

**Example:**
```typescript
export const categoryDataList: CategoryData[] = [
  {
    name: "Metabolic syndrome",
    slug: "metabolic-syndrome",
    description: "Research on innovative herbal formulations...",
    categoryImage: "/ginger.jpg",
  },
  // ... 6 more categories
]
```

**When to edit:**
- To change category name, description, or image
- To add/remove categories
- To update category-level information

#### 2. `components/category-card.tsx`
**What it contains:**
- `CategoryCard` component
- Two variants: "carousel" and "grid"

**Example:**
```typescript
<CategoryCard category={category} variant="carousel" />
<CategoryCard category={category} variant="grid" />
```

**When to use:**
- Homepage explore section (carousel variant)
- `/explore/categories` page (grid variant)

### Updated Files (2)

#### 1. `components/explore.tsx` (Homepage)
**Changed from:**
```typescript
const allProducts = getAllProducts()  // ALL products
filteredResearches.map((research) => (
  // Display product cards
))
```

**Changed to:**
```typescript
const categories = getAllCategoryData()  // Category data ONLY
filteredCategories.map((category) => (
  <CategoryCard category={category} variant="carousel" />
))
```

#### 2. `app/explore/categories/page.tsx` (Categories Page)
**Changed from:**
```typescript
const categories = getAllCategories()
categories.map((cat) => {
  const categoryProducts = getCategoryProducts(cat)
  const repr = categoryProducts[0]  // First product
  // Display product data
})
```

**Changed to:**
```typescript
const categories = getAllCategoryData()  // Category data ONLY
categories.map((category) => (
  <CategoryCard category={category} variant="grid" />
))
```

### Unchanged Files (1)

#### `app/explore/[slug]/page.tsx` (Individual Category Pages)
**Still uses:**
```typescript
const items = getCategoryProducts(matched)  // Products for that category
items.map((research) => (
  <ShopProductCard key={research.id} research={research} />
))
```

---

## 🔄 Data Flow

### Homepage
```
getAllCategoryData()
    ↓
[Category 1, Category 2, ..., Category 7]
    ↓
CategoryCard (carousel variant)
    ↓
Display category name, description, image
```

### Categories Page
```
getAllCategoryData()
    ↓
[Category 1, Category 2, ..., Category 7]
    ↓
CategoryCard (grid variant)
    ↓
Display category name, description, image
```

### Individual Category Page
```
getCategoryProducts("Metabolic syndrome")
    ↓
[Product 1, Product 2, Product 3, Product 4]
    ↓
ShopProductCard
    ↓
Display product title, description, price, image
```

---

## ✅ What Happens Now

### Scenario 1: Edit `lib/categories/metabolic-syndrome.ts`
**Changes product title from "A" to "B"**

Result:
- ✅ `/explore/metabolic-syndrome` shows "B"
- ❌ Homepage shows category info (NOT affected)
- ❌ `/explore/categories` shows category info (NOT affected)

### Scenario 2: Edit `lib/categories/category-data.ts`
**Changes category description**

Result:
- ✅ Homepage shows new description
- ✅ `/explore/categories` shows new description
- ❌ `/explore/metabolic-syndrome` shows product info (NOT affected)

### Scenario 3: Edit `lib/category-overrides.ts`
**Changes category page hero image**

Result:
- ✅ `/explore/metabolic-syndrome` shows new hero image
- ❌ Homepage shows category image (NOT affected)
- ❌ `/explore/categories` shows category image (NOT affected)

---

## 📝 How to Edit Each Type of Content

### To Edit Category Information
**File:** `lib/categories/category-data.ts`

**Example - Change category description:**
```typescript
{
  name: "Metabolic syndrome",
  slug: "metabolic-syndrome",
  description: "OLD DESCRIPTION",  // ← Change this
  categoryImage: "/ginger.jpg",
}
```

**Affects:** Homepage and categories page ONLY

### To Edit Product Information
**File:** `lib/categories/[category-name].ts`

**Example - Change product title:**
```typescript
{
  id: "1",
  title: "OLD TITLE",  // ← Change this
  category: "Metabolic syndrome",
  description: "...",
  image: "/ginger.jpg",
  price: { amount: 25500, currency: 'NGN' },
  // ...
}
```

**Affects:** Individual category page ONLY

### To Edit Category Page Layout
**File:** `lib/category-overrides.ts`

**Example - Change hero image:**
```typescript
"metabolic-syndrome": {
  title: "Metabolic Syndrome Solutions",
  description: "...",
  customLayout: true,
  heroImage: "/ginger.jpg",  // ← Change this
  downloadLink: "/downloads/metabolic-syndrome-research.pdf",
  publicationsLink: "https://example.org/publications"
}
```

**Affects:** Individual category page ONLY

---

## 🎯 Component Comparison

| Aspect | CategoryCard | ShopProductCard |
|--------|--------------|-----------------|
| **Purpose** | Display categories | Display products |
| **Data Source** | `lib/categories/category-data.ts` | `lib/categories/[category-name].ts` |
| **Used On** | Homepage, Categories page | Individual category pages |
| **Shows** | Category name, description, image | Product title, description, price, image |
| **Variants** | carousel, grid | None |

---

## ✅ Verification Checklist

- [x] Created `lib/categories/category-data.ts`
- [x] Created `components/category-card.tsx`
- [x] Updated `components/explore.tsx`
- [x] Updated `app/explore/categories/page.tsx`
- [x] Verified `app/explore/[slug]/page.tsx` unchanged
- [x] Build successful with no errors
- [x] No cross-contamination between pages
- [x] Complete separation achieved

---

## 🎉 Result

✅ **Complete separation** between category cards and product cards
✅ **No cross-contamination** between pages
✅ **Editing products** only affects that category page
✅ **Editing categories** only affects homepage and categories page
✅ **Clean architecture** with proper component reuse
✅ **Build successful** with no errors

---

## 📚 Related Files

- `COMPONENT_SEPARATION_FIX.md` - Detailed technical explanation
- `COMPONENT_SEPARATION_SUMMARY.md` - Quick summary
- `lib/categories/category-data.ts` - Category data
- `components/category-card.tsx` - Category card component
- `components/explore.tsx` - Homepage
- `app/explore/categories/page.tsx` - Categories page
- `app/explore/[slug]/page.tsx` - Individual category page

---

## 🚀 Testing

### Test 1: Homepage
1. Go to `localhost:3000`
2. Scroll to "Explore Our Latest Research" section
3. Should see category cards (not product cards)
4. Edit `lib/categories/category-data.ts` and change a category description
5. Refresh - homepage should update

### Test 2: Categories Page
1. Go to `localhost:3000/explore/categories`
2. Should see category cards (not product cards)
3. Edit `lib/categories/category-data.ts` and change a category description
4. Refresh - categories page should update

### Test 3: Individual Category Page
1. Go to `localhost:3000/explore/metabolic-syndrome`
2. Should see product cards
3. Edit `lib/categories/metabolic-syndrome.ts` and change a product title
4. Refresh - individual category page should update
5. Go back to homepage - should NOT be affected

---

**Everything is ready to use!** ✅

