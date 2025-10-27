# Research Pages System Guide

## Overview

The research pages system allows detailed research content to be displayed in dedicated pages, accessible via "More on Research" buttons on category pages.

## Current Implementation

### **Metabolic Syndrome Research Page**
- **URL**: `/research/metabolic-syndrome`
- **Access**: Via "More on Research" button on `/explore/metabolic-syndrome`
- **Content**: Comprehensive research on metabolic syndrome pathophysiology, epidemiology, and treatments

## File Structure

```
├── app/research/metabolic-syndrome/
│   └── page.tsx                    # Research page route
├── components/
│   └── research-page.tsx           # Reusable research page component
├── lib/
│   └── category-overrides.ts       # Updated with research page link
└── lib/read-more/
    └── metabolic-syndroms.md       # Source content (reference)
```

## How It Works

### 1. Category Override Configuration
In `lib/category-overrides.ts`:
```typescript
"metabolic-syndrome": {
  title: "Metabolic Syndrome Solutions",
  description: "...",
  customLayout: true,
  heroImage: "/images/metabolicsyndrome.png",
  downloadLink: "/research/metabolic-syndrome", // Links to research page
}
```

### 2. Research Page Route
`app/research/metabolic-syndrome/page.tsx` creates the dedicated research page with:
- SEO metadata
- Structured content from the markdown file
- Professional layout

### 3. Research Page Component
`components/research-page.tsx` provides:
- **Responsive Layout**: Works on all devices
- **Content Parsing**: Converts markdown-style content to structured sections
- **Navigation**: Back button to category page
- **Professional Design**: Clean, academic-style presentation
- **Diagnostic Table**: Interactive table showing metabolic syndrome criteria
- **Call-to-Action**: Links back to products

## Features

### **Content Structure**
- ✅ **Headings**: Automatically styled section headers
- ✅ **Paragraphs**: Well-formatted text blocks
- ✅ **Lists**: Bullet points with proper styling
- ✅ **Tables**: Interactive diagnostic criteria table
- ✅ **References**: Professional citation section

### **Design Elements**
- ✅ **Professional Layout**: Clean, academic appearance
- ✅ **Responsive Design**: Mobile and desktop optimized
- ✅ **Navigation**: Easy back navigation
- ✅ **Typography**: Readable fonts and spacing
- ✅ **Color Scheme**: Consistent with brand colors

### **SEO Optimization**
- ✅ **Meta Tags**: Title and description for search engines
- ✅ **Structured Content**: Proper heading hierarchy
- ✅ **Semantic HTML**: Accessible markup

## Adding New Research Pages

### Step 1: Create Research Content
Add content to a new file in `lib/read-more/[category-name].md`

### Step 2: Create Research Page Route
Create `app/research/[category-name]/page.tsx`:
```typescript
import { ResearchPage } from "@/components/research-page"

export default function CategoryResearch() {
  const title = "Your Research Title"
  const content = `Your research content here...`
  
  return <ResearchPage title={title} content={content} />
}
```

### Step 3: Update Category Override
In `lib/category-overrides.ts`:
```typescript
"your-category": {
  // ... other properties
  downloadLink: "/research/your-category",
}
```

## Content Format

The research page expects content in this format:

```
Section Title:
Section content goes here...

Another Section Title:
More content...

List Section:
• First item
• Second item
• Third item
```

## Benefits

1. **Professional Presentation**: Academic-style layout for research content
2. **SEO Friendly**: Proper meta tags and structured content
3. **Reusable Component**: Easy to add new research pages
4. **Mobile Responsive**: Works perfectly on all devices
5. **Brand Consistent**: Matches overall site design
6. **User Friendly**: Clear navigation and readable content

## Current Research Pages

- **Metabolic Syndrome**: `/research/metabolic-syndrome`
  - Comprehensive pathophysiology overview
  - African epidemiology data
  - Orthodox vs. alternative treatments
  - Panaceutics product solutions

## Future Enhancements

- Add more research pages for other categories
- Include interactive charts and graphs
- Add downloadable PDF versions
- Implement search functionality
- Add related research suggestions