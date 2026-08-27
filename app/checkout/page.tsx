"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCircle, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/app/providers"
import { BANK_DETAILS, SUPPORT_EMAIL } from "@/lib/config"

export default function CheckoutPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { getTotalPrice } = useCart()

  const total = getTotalPrice()
  const formattedTotal = `₦${total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete Your Purchase</h1>
          <p className="text-muted-foreground text-lg">
            Make payment using the account details below
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Bank Transfer Payment</CardTitle>
            <CardDescription>
              Transfer the exact amount to the account below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Total Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">{formattedTotal}</p>
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <DetailItem
                label="Bank Name"
                value={BANK_DETAILS.bankName}
                copied={copiedField === "bank"}
                onCopy={() => handleCopy(BANK_DETAILS.bankName, "bank")}
              />
              <DetailItem
                label="Account Number"
                value={BANK_DETAILS.accountNumber}
                copied={copiedField === "account"}
                onCopy={() => handleCopy(BANK_DETAILS.accountNumber, "account")}
              />
              <DetailItem
                label="Account Name"
                value={BANK_DETAILS.accountName}
                copied={copiedField === "name"}
                onCopy={() => handleCopy(BANK_DETAILS.accountName, "name")}
              />
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm">Important Instructions:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span>Transfer the exact amount: <strong>{formattedTotal}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span>Use your order ID as payment reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span>Your order will be processed once payment is confirmed</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Back to Cart
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            I&apos;ve Made Payment
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Need help? Contact support at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

interface DetailItemProps {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
}

function DetailItem({ label, value, copied, onCopy }: DetailItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onCopy}
        className="flex items-center gap-2"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  )
}
