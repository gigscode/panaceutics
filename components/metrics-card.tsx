"use client"

import { useEffect, useRef, useState } from 'react'
import { Users, TrendingUp, Leaf, Award } from 'lucide-react'

interface MetricItem {
  value: number
  suffix?: string
  label: string
  icon?: React.ReactNode
}

interface MetricsProps {
  metrics: MetricItem[]
}

const defaultIcons = {
  users: <Users className="w-6 h-6" />,
  success: <TrendingUp className="w-6 h-6" />,
  natural: <Leaf className="w-6 h-6" />,
  experience: <Award className="w-6 h-6" />,
}

export function MetricsWithIcons({ metrics }: MetricsProps) {
  const metricsWithIcons = metrics.map((metric, index) => ({
    ...metric,
    icon: Object.values(defaultIcons)[index] || <TrendingUp className="w-6 h-6" />
  }))

  return (
    <section className="py-10 z-48">
      <div className="container mx-auto p-4 md:px-0">
        <div className="flex  justify-between items-center gap-12">
          {metricsWithIcons.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({ metric }: { metric: MetricItem }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          
          const duration = 2000
          const steps = 60
          const increment = metric.value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= metric.value) {
              setCount(metric.value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [metric.value, hasStarted])

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center mb-2 md:mb-4">
        <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary">
          {metric.icon}
        </div>
      </div>
      <div className="flex items-baseline justify-center gap-1 mb-1 md:mb-2">
        <span className="text-2xl md:text-4xl font-bold text-primary">
          {count.toLocaleString()}
        </span>
        {metric.suffix && (
          <span className="text-xl md:text-3xl font-bold text-primary">
            {metric.suffix}
          </span>
        )}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground font-medium">
        {metric.label}
      </p>
    </div>
  )
}