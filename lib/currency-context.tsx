'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { isUserOutsideNigeria } from './currency'

type Currency = 'NGN' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

interface CurrencyProviderProps {
  children: ReactNode
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>('NGN') // Always start with NGN
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only detect currency after component mounts on client
    const detectCurrency = () => {
      if (isUserOutsideNigeria()) {
        setCurrency('USD')
      }
      setIsLoading(false)
    }

    // Small delay to ensure proper hydration
    const timer = setTimeout(detectCurrency, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}