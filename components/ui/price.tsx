'use client'

import { useEffect, useState } from 'react'
import { Price as PriceType, formatPrice } from '@/lib/currency'

interface PriceProps {
  value: PriceType
  className?: string
  forceCurrency?: 'NGN' | 'USD'
}

export function Price({ value, className, forceCurrency }: PriceProps) {
  const [mounted, setMounted] = useState(false)
  const [displayCurrency, setDisplayCurrency] = useState<'NGN' | 'USD'>('NGN')

  useEffect(() => {
    setMounted(true)
    
    // Only detect currency after component mounts to prevent hydration mismatch
    if (!forceCurrency) {
      // Enhanced Nigerian detection
      const userLocale = window.navigator.language.toLowerCase();
      const userLanguages = window.navigator.languages || [userLocale];
      
      // Check for Nigerian indicators
      const nigerianIndicators = ['ng', 'nigeria', 'en-ng'];
      const isNigerian = nigerianIndicators.some(indicator => 
        userLanguages.some(lang => lang.toLowerCase().includes(indicator)) ||
        userLocale.includes(indicator)
      );
      
      // For now, let's force NGN for everyone to test
      // You can remove this line once we confirm the detection works
      setDisplayCurrency('NGN');
      
      // Uncomment this when ready to enable auto-detection:
      // setDisplayCurrency(isNigerian ? 'NGN' : 'USD');
    }
  }, [forceCurrency])

  const currencyToUse = forceCurrency ?? displayCurrency

  // Always render NGN first to prevent hydration mismatch
  // Then update to user's preferred currency after mount
  if (!mounted) {
    return (
      <span className={className}>
        {formatPrice(value, forceCurrency ?? 'NGN')}
      </span>
    )
  }

  return (
    <span className={className}>
      {formatPrice(value, currencyToUse)}
    </span>
  )
}