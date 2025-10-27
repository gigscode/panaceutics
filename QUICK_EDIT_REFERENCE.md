# ⚡ QUICK EDIT REFERENCE - Metabolic Syndrome Page

## 🎯 TWO FILES TO EDIT

### File 1: `lib/category-overrides.ts`
For: Page heading, description, hero image, buttons, links

### File 2: `lib/categories/metabolic-syndrome.ts`
For: Product cards, prices, images, titles, descriptions

---

## 📋 COPY-PASTE EXAMPLES

### EXAMPLE 1: Change Page Heading

**File:** `lib/category-overrides.ts` (Line 12)

**Current:**
```typescript
title: "Metabolic Syndrome Solutions",
```

**Change to:**
```typescript
title: "Premium Metabolic Support",
```

---

### EXAMPLE 2: Change Page Description

**File:** `lib/category-overrides.ts` (Line 13)

**Current:**
```typescript
description: "Discover our comprehensive range of herbal formulations designed to support metabolic health and wellness.",
```

**Change to:**
```typescript
description: "Advanced herbal solutions for optimal metabolic wellness.",
```

---

### EXAMPLE 3: Change Hero Image

**File:** `lib/category-overrides.ts` (Line 15)

**Current:**
```typescript
heroImage: "/ginger.jpg",
```

**Change to:**
```typescript
heroImage: "/herbs-blend.jpg",
```

**Note:** Image file must be in `public/` folder

---

### EXAMPLE 4: Change Download Link

**File:** `lib/category-overrides.ts` (Line 16)

**Current:**
```typescript
downloadLink: "/downloads/metabolic-syndrome-research.pdf",
```

**Change to:**
```typescript
downloadLink: "/downloads/my-research.pdf",
```

---

### EXAMPLE 5: Change Publications Link

**File:** `lib/category-overrides.ts` (Line 17)

**Current:**
```typescript
publicationsLink: "https://example.org/publications"
```

**Change to:**
```typescript
publicationsLink: "https://mysite.com/research"
```

---

### EXAMPLE 6: Change Product Title

**File:** `lib/categories/metabolic-syndrome.ts` (Line 6)

**Current:**
```typescript
title: "Integrated Management of Metabolic Syndrome.",
```

**Change to:**
```typescript
title: "Advanced Metabolic Formula",
```

---

### EXAMPLE 7: Change Product Description

**File:** `lib/categories/metabolic-syndrome.ts` (Lines 8-9)

**Current:**
```typescript
description:
  "Research on Sphenolax®, BPVomin®, and Nu-beta®, a series of innovative herbal formulations designed to manage hyperglycemia, hypertension, and obesity, key components of metabolic syndrome.",
```

**Change to:**
```typescript
description:
  "A powerful herbal blend designed to support healthy metabolism and wellness.",
```

---

### EXAMPLE 8: Change Product Image

**File:** `lib/categories/metabolic-syndrome.ts` (Line 10)

**Current:**
```typescript
image: "/ginger.jpg",
```

**Change to:**
```typescript
image: "/metabolic-herbs.jpg",
```

**Note:** Image file must be in `public/` folder

---

### EXAMPLE 9: Change Regular Price

**File:** `lib/categories/metabolic-syndrome.ts` (Line 11)

**Current:**
```typescript
price: { amount: 25500, currency: 'NGN' },
```

**Change to:**
```typescript
price: { amount: 35000, currency: 'NGN' },
```

**Note:** Only change the number, keep `currency: 'NGN'`

---

### EXAMPLE 10: Change Compare Price

**File:** `lib/categories/metabolic-syndrome.ts` (Line 12)

**Current:**
```typescript
comparePrice: { amount: 30000, currency: 'NGN' },
```

**Change to:**
```typescript
comparePrice: { amount: 40000, currency: 'NGN' },
```

**Note:** This is the "crossed out" price

---

### EXAMPLE 11: Change Product Rating

**File:** `lib/categories/metabolic-syndrome.ts` (Line 13)

**Current:**
```typescript
rating: 4.8,
```

**Change to:**
```typescript
rating: 4.5,
```

**Note:** Use numbers between 0 and 5

---

### EXAMPLE 12: Change Product Details

**File:** `lib/categories/metabolic-syndrome.ts` (Lines 14-15)

**Current:**
```typescript
details:
  "A combination herbal formulation intended to support metabolic health. Clinical data suggests improvements in fasting glucose and blood pressure in preliminary studies. Consult a clinician for dosing and interactions.",
```

**Change to:**
```typescript
details:
  "This premium formula combines three powerful herbs to support healthy metabolism and overall wellness.",
```

---

## 🚀 QUICK STEPS

1. **Open the file** you need to edit
2. **Find the line** with the text you want to change
3. **Replace the text** between the quotes `"..."`
4. **Save the file** (Ctrl+S)
5. **Refresh your browser** to see the changes

---

## ✅ CHECKLIST

- [ ] I found the file I need to edit
- [ ] I found the line number with the text
- [ ] I changed the text between the quotes
- [ ] I saved the file
- [ ] I refreshed my browser
- [ ] I see my changes on the page

---

## 💡 TIPS

✅ **Always keep the quotes** - Don't remove the `"` marks
✅ **Keep the commas** - Don't remove the `,` at the end of lines
✅ **Keep the structure** - Don't change `title:` to something else
✅ **For prices** - Only change the number, keep `currency: 'NGN'`
✅ **For images** - Put image files in the `public/` folder first
✅ **Save and refresh** - Always save the file and refresh your browser

---

## ❌ COMMON MISTAKES

❌ Removing quotes: `title: Metabolic Syndrome` (WRONG)
✅ Keep quotes: `title: "Metabolic Syndrome"` (RIGHT)

❌ Removing commas: `title: "Metabolic Syndrome"` (WRONG)
✅ Keep commas: `title: "Metabolic Syndrome",` (RIGHT)

❌ Changing structure: `heading: "Metabolic Syndrome"` (WRONG)
✅ Keep structure: `title: "Metabolic Syndrome"` (RIGHT)

---

## 📞 NEED HELP?

**Question:** Where do I put image files?
**Answer:** In the `public/` folder at the root of your project

**Question:** What happens if I make a mistake?
**Answer:** The page might show an error. Just fix the mistake and save again.

**Question:** Do I need to restart anything?
**Answer:** No, just save the file and refresh your browser

**Question:** Can I add more products?
**Answer:** Yes! Copy the entire product object and paste it below, then change the ID and content

---

## 🎉 YOU'RE READY!

Pick any example above, follow the steps, and start editing! 🚀

