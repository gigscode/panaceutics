'use client'

import { useEffect, useState } from 'react'
import { Price as PriceType, formatPrice, detectUserCurrency } from '@/lib/currency'

interface PriceProps {
  value: PriceType
  className?: string
}

export function Price({ value, className }: PriceProps) {
  const [userCurrency, setUserCurrency] = useState<'NGN' | 'USD'>('NGN')
  
  useEffect(() => {
    setUserCurrency(detectUserCurrency())
  }, [])

  return (
    <span className={className}>
      {formatPrice(value, userCurrency)}
    </span>
  )
}