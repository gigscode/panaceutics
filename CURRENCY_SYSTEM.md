# Currency System Documentation

## Overview

The application uses a dual-currency system with Naira (NGN) as the base currency and USD for international users.

## Key Features

### Base Currency: Nigerian Naira (NGN)
- All products are priced in NGN in the database
- Conversion rate: ₦1,600 = $1 USD

### Automatic Currency Detection
- **Nigerian users**: See prices in NGN
- **International users**: See prices in USD (auto-converted)
- Detection based on browser locale (`navigator.language`)

### Hydration-Safe Implementation
- Server always renders NGN to prevent hydration mismatches
- Client-side detection happens after component mount
- Smooth transition from NGN to USD for international users

## Technical Implementation

### Files Modified

1. **`lib/currency.ts`**
   - Conversion rate: 1600 NGN = 1 USD
   - `formatPrice()`: Formats prices with proper currency symbols
   - `convertCurrency()`: Handles NGN ↔ USD conversion
   - `detectUserCurrency()`: SSR-safe currency detection
   - `isUserOutsideNigeria()`: Client-side location detection

2. **`components/ui/price.tsx`**
   - Hydration-safe price display
   - Always renders NGN first, then updates to user's currency
   - Supports `forceCurrency` prop for manual override

3. **`components/currency-switcher.tsx`** (Optional)
   - Manual currency switcher component
   - Saves user preference to localStorage
   - Can be added to header or product pages

4. **`lib/currency-context.tsx`** (Optional)
   - React context for global currency state management
   - Can be used for more complex currency scenarios

### Usage Examples

```tsx
// Basic price display (auto-detects currency)
<Price value={{ amount: 25500, currency: 'NGN' }} />

// Force specific currency
<Price value={{ amount: 25500, currency: 'NGN' }} forceCurrency="USD" />

// With custom styling
<Price 
  value={{ amount: 25500, currency: 'NGN' }} 
  className="text-emerald-800 font-bold" 
/>
```

### Conversion Examples

- ₦25,500 → $15.94 USD
- ₦1,600 → $1.00 USD
- $1.00 → ₦1,600
- $15.94 → ₦25,504

## Benefits

1. **No Hydration Errors**: Server and client render consistently
2. **Automatic Detection**: Users see appropriate currency based on location
3. **Flexible**: Supports manual currency override
4. **Extensible**: Easy to add more currencies or IP-based detection

## Future Enhancements

- IP-based geolocation for more accurate detection
- Additional currencies (EUR, GBP, etc.)
- Real-time exchange rates
- Currency preference persistence across sessions