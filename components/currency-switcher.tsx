'use client'

import { useState, useEffect } from 'react'

type Currency = 'NGN' | 'USD'

interface CurrencySwitcherProps {
  onCurrencyChange?: (currency: Currency) => void
  className?: string
}

export function CurrencySwitcher({ onCurrencyChange, className }: CurrencySwitcherProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('NGN')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load saved preference or detect based on location
    const saved = localStorage.getItem('preferred-currency') as Currency
    if (saved && (saved === 'NGN' || saved === 'USD')) {
      setSelectedCurrency(saved)
    } else {
      // Auto-detect based on locale
      const isOutsideNigeria = !window.navigator.language.includes('NG')
      const detected = isOutsideNigeria ? 'USD' : 'NGN'
      setSelectedCurrency(detected)
      localStorage.setItem('preferred-currency', detected)
    }
  }, [])

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
    localStorage.setItem('preferred-currency', currency)
    onCurrencyChange?.(currency)
  }

  if (!mounted) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-gray-600">NGN</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600">Currency:</span>
      <select
        value={selectedCurrency}
        onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
      >
        <option value="NGN">₦ NGN</option>
        <option value="USD">$ USD</option>
      </select>
    </div>
  )
}