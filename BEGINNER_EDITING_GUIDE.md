# 🎯 BEGINNER'S GUIDE - Edit Your Metabolic Syndrome Page

This guide shows you EXACTLY where to edit everything on your page. No technical knowledge needed!

---

## 📍 WHERE EVERYTHING COMES FROM

Your page has content from **2 files**:

1. **`lib/categories/metabolic-syndrome.ts`** - Product information (cards, prices, images)
2. **`lib/category-overrides.ts`** - Page heading and description text

---

## 🔤 PART 1: EDIT THE BIG HEADING & DESCRIPTION

### What You See:
```
"Metabolic Syndrome Solutions"
"Discover our comprehensive range of herbal formulations designed to support metabolic health and wellness."
```

### Where to Edit:
**File:** `lib/category-overrides.ts`
**Lines:** 11-13

### Current Code:
```typescript
"metabolic-syndrome": {
  title: "Metabolic Syndrome Solutions",
  description: "Discover our comprehensive range of herbal formulations designed to support metabolic health and wellness.",
```

### How to Change It:

**To change the heading:**
- Find: `title: "Metabolic Syndrome Solutions",`
- Change to: `title: "YOUR NEW HEADING HERE",`
- Example: `title: "Advanced Metabolic Support",`

**To change the description:**
- Find: `description: "Discover our comprehensive range..."`
- Change to: `description: "YOUR NEW DESCRIPTION HERE",`
- Example: `description: "Premium herbal solutions for metabolic wellness."`

### What Happens:
✅ The big heading and description on your page will update immediately when you save!

---

## 🖼️ PART 2: EDIT THE HERO IMAGE (Big Image at Top)

### What You See:
The large green herb image at the top of the page

### Where to Edit:
**File:** `lib/category-overrides.ts`
**Line:** 15

### Current Code:
```typescript
heroImage: "/ginger.jpg",
```

### How to Change It:

1. **Put your image file in:** `public/` folder
2. **Change the path:**
   - Find: `heroImage: "/ginger.jpg",`
   - Change to: `heroImage: "/YOUR-IMAGE-NAME.jpg",`
   - Example: `heroImage: "/herbs.jpg",`

### What Happens:
✅ The big image at the top will change to your new image!

---

## 🔗 PART 3: EDIT THE BUTTONS & LINKS

### What You See:
- "Download Research" button
- "Publications from Research" link

### Where to Edit:
**File:** `lib/category-overrides.ts`
**Lines:** 16-17

### Current Code:
```typescript
downloadLink: "/downloads/metabolic-syndrome-research.pdf",
publicationsLink: "https://example.org/publications"
```

### How to Change It:

**To change the Download button link:**
- Find: `downloadLink: "/downloads/metabolic-syndrome-research.pdf",`
- Change to: `downloadLink: "/YOUR-FILE-PATH.pdf",`
- Example: `downloadLink: "/downloads/my-research.pdf",`

**To change the Publications link:**
- Find: `publicationsLink: "https://example.org/publications"`
- Change to: `publicationsLink: "https://YOUR-WEBSITE.com/publications"`
- Example: `publicationsLink: "https://mysite.com/research"`

### What Happens:
✅ The buttons will link to your new URLs!

---

## 📦 PART 4: EDIT PRODUCT CARD INFORMATION

### What You See:
The product card with:
- Product image
- Product title
- Product description
- Price (NGN 25,500.00)

### Where to Edit:
**File:** `lib/categories/metabolic-syndrome.ts`
**Lines:** 4-16

### Current Code:
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

---

## 📝 EDIT PRODUCT TITLE

### What You See:
"Integrated Management of Metabolic Syndrome."

### How to Change It:
- Find: `title: "Integrated Management of Metabolic Syndrome.",`
- Change to: `title: "YOUR NEW TITLE HERE",`
- Example: `title: "Metabolic Health Formula",`

### What Happens:
✅ The product card title will change!

---

## 📄 EDIT PRODUCT DESCRIPTION (Short)

### What You See:
The short text under the product title on the card

### How to Change It:
- Find: `description: "Research on Sphenolax®, BPVomin®, and Nu-beta®..."`
- Change to: `description: "YOUR NEW DESCRIPTION HERE",`
- Example: `description: "A powerful herbal blend for metabolic support."`

### What Happens:
✅ The short description on the card will change!

---

## 📖 EDIT PRODUCT DETAILS (Long Description)

### What You See:
The longer description shown when viewing product details

### How to Change It:
- Find: `details: "A combination herbal formulation intended to support..."`
- Change to: `details: "YOUR NEW DETAILS HERE",`
- Example: `details: "This premium formula combines three powerful herbs to support healthy metabolism."`

### What Happens:
✅ The detailed description will change!

---

## 💰 PART 5: EDIT PRICES

### What You See:
- Regular Price: NGN 25,500.00
- Compare Price: NGN 30,000.00 (crossed out)

### Where to Edit:
**File:** `lib/categories/metabolic-syndrome.ts`
**Lines:** 11-12

### Current Code:
```typescript
price: { amount: 25500, currency: 'NGN' },
comparePrice: { amount: 30000, currency: 'NGN' },
```

### How to Change Regular Price:
- Find: `price: { amount: 25500, currency: 'NGN' },`
- Change to: `price: { amount: YOUR-NEW-PRICE, currency: 'NGN' },`
- Example: `price: { amount: 35000, currency: 'NGN' },`

### How to Change Compare Price:
- Find: `comparePrice: { amount: 30000, currency: 'NGN' },`
- Change to: `comparePrice: { amount: YOUR-NEW-PRICE, currency: 'NGN' },`
- Example: `comparePrice: { amount: 40000, currency: 'NGN' },`

### What Happens:
✅ The prices on the product card will update!

---

## 🖼️ PART 6: EDIT PRODUCT IMAGE

### What You See:
The green herb image on the product card

### Where to Edit:
**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 10

### Current Code:
```typescript
image: "/ginger.jpg",
```

### How to Change It:

1. **Put your image file in:** `public/` folder
2. **Change the path:**
   - Find: `image: "/ginger.jpg",`
   - Change to: `image: "/YOUR-IMAGE-NAME.jpg",`
   - Example: `image: "/herbs-blend.jpg",`

### What Happens:
✅ The product card image will change!

---

## ⭐ EDIT PRODUCT RATING

### What You See:
The star rating (4.8 stars)

### Where to Edit:
**File:** `lib/categories/metabolic-syndrome.ts`
**Line:** 13

### Current Code:
```typescript
rating: 4.8,
```

### How to Change It:
- Find: `rating: 4.8,`
- Change to: `rating: YOUR-NEW-RATING,`
- Example: `rating: 4.5,`

### What Happens:
✅ The star rating will update!

---

## 📋 QUICK REFERENCE TABLE

| What to Edit | File | Line | Find | Change To |
|---|---|---|---|---|
| Page Heading | `lib/category-overrides.ts` | 12 | `title: "..."` | `title: "YOUR TEXT"` |
| Page Description | `lib/category-overrides.ts` | 13 | `description: "..."` | `description: "YOUR TEXT"` |
| Hero Image | `lib/category-overrides.ts` | 15 | `heroImage: "..."` | `heroImage: "/image.jpg"` |
| Download Link | `lib/category-overrides.ts` | 16 | `downloadLink: "..."` | `downloadLink: "/path"` |
| Publications Link | `lib/category-overrides.ts` | 17 | `publicationsLink: "..."` | `publicationsLink: "url"` |
| Product Title | `lib/categories/metabolic-syndrome.ts` | 6 | `title: "..."` | `title: "YOUR TEXT"` |
| Product Description | `lib/categories/metabolic-syndrome.ts` | 8-9 | `description: "..."` | `description: "YOUR TEXT"` |
| Product Details | `lib/categories/metabolic-syndrome.ts` | 14-15 | `details: "..."` | `details: "YOUR TEXT"` |
| Product Image | `lib/categories/metabolic-syndrome.ts` | 10 | `image: "..."` | `image: "/image.jpg"` |
| Regular Price | `lib/categories/metabolic-syndrome.ts` | 11 | `amount: 25500` | `amount: YOUR-PRICE` |
| Compare Price | `lib/categories/metabolic-syndrome.ts` | 12 | `amount: 30000` | `amount: YOUR-PRICE` |
| Rating | `lib/categories/metabolic-syndrome.ts` | 13 | `rating: 4.8` | `rating: YOUR-RATING` |

---

## ✅ STEP-BY-STEP EXAMPLE

### Let's say you want to:
1. Change the heading to "Premium Metabolic Support"
2. Change the price to 40,000 NGN
3. Change the product title to "Advanced Formula"

### Steps:

**Step 1:** Open `lib/category-overrides.ts`
- Find line 12: `title: "Metabolic Syndrome Solutions",`
- Change to: `title: "Premium Metabolic Support",`
- Save the file

**Step 2:** Open `lib/categories/metabolic-syndrome.ts`
- Find line 11: `price: { amount: 25500, currency: 'NGN' },`
- Change to: `price: { amount: 40000, currency: 'NGN' },`
- Save the file

**Step 3:** Same file, find line 6: `title: "Integrated Management of Metabolic Syndrome.",`
- Change to: `title: "Advanced Formula",`
- Save the file

**Result:** Your page will show all three changes! ✅

---

## 🎉 YOU'RE READY!

Now you know exactly where to edit everything on your page. Just:
1. Open the file
2. Find the text you want to change
3. Change it
4. Save the file
5. Refresh your browser to see the changes

**Happy editing!** 🚀

