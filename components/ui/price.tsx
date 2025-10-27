'use client'

import { useEffect, useState } from 'react'
import { Price as PriceType, formatPrice, detectUserCurrency } from '@/lib/currency'

interface PriceProps {
  value: PriceType
  className?: string
  forceCurrency?: 'NGN' | 'USD'
}

export function Price({ value, className, forceCurrency }: PriceProps) {
  const [userCurrency, setUserCurrency] = useState<'NGN' | 'USD'>(() => detectUserCurrency())

  useEffect(() => {
    setUserCurrency(detectUserCurrency())
  }, [])

  const currencyToUse = forceCurrency ?? userCurrency

  return (
    <span className={className}>
      {formatPrice(value, currencyToUse)}
    </span>
  )
}