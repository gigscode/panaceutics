const NGN_TO_USD_RATE = Number(process.env.NEXT_PUBLIC_NGN_USD_RATE) || 1600; // 1 USD = N NGN

export interface Price {
  amount: number;
  currency: 'NGN' | 'USD';
}

export function formatPrice(price: Price, targetCurrency: 'NGN' | 'USD' = 'NGN'): string {
  const amount = price.currency === targetCurrency
    ? price.amount
    : convertCurrency(price.amount, price.currency, targetCurrency);

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: targetCurrency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: 'NGN' | 'USD',
  toCurrency: 'NGN' | 'USD'
): number {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'NGN' && toCurrency === 'USD') {
    return amount / NGN_TO_USD_RATE;
  } else if (fromCurrency === 'USD' && toCurrency === 'NGN') {
    return amount * NGN_TO_USD_RATE;
  }
  
  return amount; // fallback
}

// Helper to detect user's preferred currency
export function detectUserCurrency(): 'NGN' | 'USD' {
  // Always return NGN on server-side to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return 'NGN';
  }
  
  // Client-side detection based on locale
  const userLocale = window.navigator.language;
  return userLocale.includes('NG') ? 'NGN' : 'USD';
}

// Helper to detect if user is likely outside Nigeria (client-side only)
export function isUserOutsideNigeria(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Enhanced detection logic
  const userLocale = window.navigator.language.toLowerCase();
  const userLanguages = window.navigator.languages || [userLocale];
  
  // Check for Nigerian indicators
  const nigerianIndicators = ['ng', 'nigeria', 'en-ng'];
  const hasNigerianIndicator = nigerianIndicators.some(indicator => 
    userLanguages.some(lang => lang.toLowerCase().includes(indicator)) ||
    userLocale.includes(indicator)
  );
  
  // Debug logging (can be removed in production)
  // console.log('Currency Detection Debug:', {
  //   userLocale,
  //   userLanguages,
  //   hasNigerianIndicator,
  //   willShowUSD: !hasNigerianIndicator
  // });
  
  // Default to NGN for Nigerian users, USD for others
  return !hasNigerianIndicator;
}