"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, MessageCircle, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_NUMBER, SUPPORT_EMAIL } from "@/lib/config"

export default function OrderConfirmationPage() {
  const params = useParams()
  const orderId = params.id as string

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-2xl">

        {/* Success icon + heading */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Payment Notification Sent!</h1>
          <p className="text-muted-foreground text-lg">
            Your WhatsApp message has been sent to our order team.
          </p>
          {orderId && (
            <p className="text-sm text-muted-foreground mt-2">
              Reference: <span className="font-mono font-medium">{orderId}</span>
            </p>
          )}
        </div>

        {/* What happens next */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-5">
          <h2 className="text-lg font-semibold">What happens next</h2>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Our team reviews your payment</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                We verify the bank transfer against the amount and account details you sent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">You get a WhatsApp confirmation</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Once payment is confirmed, our rep will reply on WhatsApp with your order status and delivery details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Order is processed and dispatched</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your items are packed and shipped once payment is verified. Delivery details will be shared via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Open WhatsApp Chat
            </Button>
          </Link>
          <Link href="/explore/categories" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-center text-sm text-muted-foreground">
          Questions? Email us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>

      </div>
    </main>
  )
}
