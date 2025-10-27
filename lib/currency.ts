const NGN_TO_USD = 1600; // 1 USD = 1600 NGN

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
    return amount / NGN_TO_USD;
  } else {
    return amount * NGN_TO_USD;
  }
}

// Helper to detect user's preferred currency
export function detectUserCurrency(): 'NGN' | 'USD' {
  // This is a simple implementation. You might want to enhance it with IP-based detection
  const userLocale = typeof window !== 'undefined' ? window.navigator.language : 'en-NG';
  return userLocale.includes('NG') ? 'NGN' : 'USD';
}