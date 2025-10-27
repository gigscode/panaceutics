# 📖 COMPLETE EDITING INSTRUCTIONS - Metabolic Syndrome Page

## 🎯 OVERVIEW

Your page is built from **2 files**:
1. **`lib/category-overrides.ts`** - Page heading, description, hero image, buttons
2. **`lib/categories/metabolic-syndrome.ts`** - Product cards, prices, images, details

---

## 📍 WHAT APPEARS WHERE

### On Your Page You See:

```
┌─────────────────────────────────────────────────────┐
│  PANACEUTICS                                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [HERO IMAGE]  Metabolic Syndrome Solutions        │
│                Discover our comprehensive range... │
│                [Download Research] [Publications]  │
│                                                     │
│  Products                                           │
│  Discover our scientifically-validated...          │
│                                                     │
│  ┌──────────────┐                                   │
│  │ [PRODUCT IMG]│                                   │
│  │ Product Title│                                   │
│  │ Description  │                                   │
│  │ NGN 25,500   │                                   │
│  │ [Add to Cart]│                                   │
│  └──────────────┘                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 WHERE EACH PART COMES FROM

### PART 1: Page Heading & Description
**File:** `lib/category-overrides.ts`
**Lines:** 12-13

```typescript
"metabolic-syndrome": {
  title: "Metabolic Syndrome Solutions",                    // ← Line 12
  description: "Discover our comprehensive range...",      // ← Line 13
```

### PART 2: Hero Image (Big Image)
**File:** `lib/category-overrides.ts`
**Line:** 15

```typescript
  heroImage: "/ginger.jpg",                                 // ← Line 15
```

### PART 3: Download & Publications Buttons
**File:** `lib/category-overrides.ts`
**Lines:** 16-17

```typescript
  downloadLink: "/downloads/metabolic-syndrome-research.pdf",  // ← Line 16
  publicationsLink: "https://example.org/publications"         // ← Line 17
```

### PART 4: Product Card Information
**File:** `lib/categories/metabolic-syndrome.ts`
**Lines:** 4-16

```typescript
{
  id: "1",                                                  // ← Line 5
  title: "Integrated Management of Metabolic Syndrome.",   // ← Line 6
  category: "Metabolic syndrome",                          // ← Line 7
  description: "Research on Sphenolax®...",               // ← Line 8-9
  image: "/ginger.jpg",                                    // ← Line 10
  price: { amount: 25500, currency: 'NGN' },             // ← Line 11
  comparePrice: { amount: 30000, currency: 'NGN' },      // ← Line 12
  rating: 4.8,                                            // ← Line 13
  details: "A combination herbal formulation...",         // ← Line 14-15
}
```

---

## ✏️ HOW TO EDIT EACH PART

### 1️⃣ EDIT PAGE HEADING

**What you see:** "Metabolic Syndrome Solutions"

**File:** `lib/category-overrides.ts`
**Line:** 12

**Current code:**
```typescript
title: "Metabolic Syndrome Solutions",
```

**To change it:**
1. Open `lib/category-overrides.ts`
2. Go to line 12
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

**Example:**
```typescript
title: "Premium Metabolic Support",
```

---

### 2️⃣ EDIT PAGE DESCRIPTION

**What you see:** "Discover our comprehensive range of herbal formulations..."

**File:** `lib/category-overrides.ts`
**Line:** 13

**Current code:**
```typescript
description: "Discover our comprehensive range of herbal formulations designed to support metabolic health and wellness.",
```

**To change it:**
1. Open `lib/category-overrides.ts`
2. Go to line 13
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

**Example:**
```typescript
description: "Advanced herbal solutions for optimal metabolic wellness.",
```

---

### 3️⃣ EDIT HERO IMAGE

**What you see:** The large green herb image at the top

**File:** `lib/category-overrides.ts`
**Line:** 15

**Current code:**
```typescript
heroImage: "/ginger.jpg",
```

**To change it:**
1. Put your image file in the `public/` folder
2. Open `lib/category-overrides.ts`
3. Go to line 15
4. Change the filename
5. Save the file
6. Refresh your browser

**Example:**
```typescript
heroImage: "/herbs-blend.jpg",
```

---

### 4️⃣ EDIT DOWNLOAD BUTTON LINK

**What you see:** "Download Research" button

**File:** `lib/category-overrides.ts`
**Line:** 16

**Current code:**
```typescript
downloadLink: "/downloads/metabolic-syndrome-research.pdf",
```

**To change it:**
1. Open `lib/category-overrides.ts`
2. Go to line 16
3. Change the path
4. Save the file
5. Refresh your browser

**Example:**
```typescript
downloadLink: "/downloads/my-research.pdf",
```

---

### 5️⃣ EDIT PUBLICATIONS LINK

**What you see:** "Publications from Research" link

**File:** `lib/category-overrides.ts`
**Line:** 17

**Current code:**
```typescript
publicationsLink: "https://example.org/publications"
```

**To change it:**
1. Open `lib/category-overrides.ts`
2. Go to line 17
3. Change the URL
4. Save the file
5. Refresh your browser

**Example:**
```typescript
publicationsLink: "https://mysite.com/research"
```

---

### 6️⃣ EDIT PRODUCT TITLE

**What you see:** "Integrated Management of Metabolic Syndrome."

**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 6

**Current code:**
```typescript
title: "Integrated Management of Metabolic Syndrome.",
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to line 6
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

**Example:**
```typescript
title: "Advanced Metabolic Formula",
```

---

### 7️⃣ EDIT PRODUCT DESCRIPTION

**What you see:** Short text under the product title

**File:** `lib/categories/metabolic-syndrome.ts`
**Lines:** 8-9

**Current code:**
```typescript
description:
  "Research on Sphenolax®, BPVomin®, and Nu-beta®, a series of innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity, key components of metabolic syndrome.",
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to lines 8-9
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

**Example:**
```typescript
description:
  "A powerful herbal blend designed to support healthy metabolism.",
```

---

### 8️⃣ EDIT PRODUCT IMAGE

**What you see:** The product card image

**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 10

**Current code:**
```typescript
image: "/ginger.jpg",
```

**To change it:**
1. Put your image file in the `public/` folder
2. Open `lib/categories/metabolic-syndrome.ts`
3. Go to line 10
4. Change the filename
5. Save the file
6. Refresh your browser

**Example:**
```typescript
image: "/metabolic-herbs.jpg",
```

---

### 9️⃣ EDIT REGULAR PRICE

**What you see:** "NGN 25,500.00"

**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 11

**Current code:**
```typescript
price: { amount: 25500, currency: 'NGN' },
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to line 11
3. Change only the number (25500)
4. Save the file
5. Refresh your browser

**Example:**
```typescript
price: { amount: 35000, currency: 'NGN' },
```

---

### 🔟 EDIT COMPARE PRICE

**What you see:** "NGN 30,000.00" (crossed out)

**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 12

**Current code:**
```typescript
comparePrice: { amount: 30000, currency: 'NGN' },
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to line 12
3. Change only the number (30000)
4. Save the file
5. Refresh your browser

**Example:**
```typescript
comparePrice: { amount: 40000, currency: 'NGN' },
```

---

### 1️⃣1️⃣ EDIT RATING

**What you see:** Star rating (4.8 stars)

**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 13

**Current code:**
```typescript
rating: 4.8,
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to line 13
3. Change the number
4. Save the file
5. Refresh your browser

**Example:**
```typescript
rating: 4.5,
```

---

### 1️⃣2️⃣ EDIT PRODUCT DETAILS

**What you see:** Longer description (shown in product details)

**File:** `lib/categories/metabolic-syndrome.ts`
**Lines:** 14-15

**Current code:**
```typescript
details:
  "A combination herbal formulation intended to support metabolic health. Clinical data suggests improvements in fasting glucose and blood pressure in preliminary studies. Consult a clinician for dosing and interactions.",
```

**To change it:**
1. Open `lib/categories/metabolic-syndrome.ts`
2. Go to lines 14-15
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

**Example:**
```typescript
details:
  "This premium formula combines three powerful herbs to support healthy metabolism and overall wellness.",
```

---

## 📋 QUICK CHECKLIST

- [ ] I know which file to edit
- [ ] I found the line number
- [ ] I changed the text
- [ ] I kept the quotes `"..."`
- [ ] I kept the commas `,`
- [ ] I saved the file
- [ ] I refreshed my browser
- [ ] I see my changes!

---

## 🎉 YOU'RE READY!

Pick any section above and start editing. Remember:
1. Open the file
2. Find the line
3. Change the text
4. Save
5. Refresh

**Happy editing!** 🚀

