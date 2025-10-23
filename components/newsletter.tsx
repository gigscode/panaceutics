"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
          <p className="text-lg opacity-90">
            Subscribe to our newsletter for the latest research, product launches, and wellness insights.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" variant="secondary" size="lg" className="whitespace-nowrap">
              {submitted ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>

          {submitted && (
            <p className="text-sm opacity-90">Thank you for subscribing! Check your email for confirmation.</p>
          )}
        </div>
      </div>
    </section>
  )
}
