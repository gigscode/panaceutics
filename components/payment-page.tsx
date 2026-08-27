"use client"

import Link from "next/link"
import { Copy, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react"
import { Price } from "@/components/ui/price"
import { WHATSAPP_NUMBER, BANK_DETAILS, SUPPORT_EMAIL } from "@/lib/config"

interface PaymentItem {
  id: string
  title: string
  price: { amount: number; currency: 'NGN' | 'USD' }
  quantity: number
  image: string
}

interface PaymentPageProps {
  items: PaymentItem[]
  orderId?: string
  onRemoveItem?: (id: string) => void
}

export function PaymentPage({ items, orderId = "ORD-" + Date.now(), onRemoveItem }: PaymentPageProps) {

  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price.amount * item.quantity), 0)

  const bankDetails = BANK_DETAILS

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const createWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `• ${item.title} (Qty: ${item.quantity}) - ₦${(item.price.amount * item.quantity).toLocaleString()}`
    ).join('\n')
    
    const message = `Hello! I have made payment for my order.

*Order Details:*
Order ID: ${orderId}
${itemsList}

*Total Amount Paid:* ₦${total.toLocaleString()}

*Payment Details:*
Bank: ${bankDetails.bankName}
Account: ${bankDetails.accountNumber}
Account Name: ${bankDetails.accountName}

Please confirm receipt of payment and process my order.

Thank you!`

    return encodeURIComponent(message)
  }

  const handlePaymentConfirmation = () => {
    const message = createWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Make payment using the account details below</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Cart Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Bank Transfer Payment</h2>
            <p className="text-gray-600">Transfer the exact amount to the account below</p>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="font-semibold text-emerald-800">
                      <Price value={{ amount: item.price.amount * item.quantity, currency: item.price.currency }} />
                    </span>
                    {onRemoveItem && (
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Total Amount to Pay</p>
            <div className="text-4xl font-bold text-emerald-800">
              <Price value={{ amount: total, currency: 'NGN' }} />
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4 mb-8">
            {/* Bank Name */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                <p className="font-semibold text-gray-900">{bankDetails.bankName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.bankName)}
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
            </div>

            {/* Account Number */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Account Number</p>
                <p className="font-semibold text-gray-900 text-lg">{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber)}
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
            </div>

            {/* Account Name */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Account Name</p>
                <p className="font-semibold text-gray-900">{bankDetails.accountName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountName)}
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">Important Instructions:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Transfer the exact amount: <strong><Price value={{ amount: total, currency: 'NGN' }} /></strong></li>
              <li>• Use your order ID as payment reference: <strong>{orderId}</strong></li>
              <li>• After payment, click "I've Made Payment" to notify us via WhatsApp</li>
              <li>• Your order will be processed once payment is confirmed</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/cart"
              className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <button
              onClick={handlePaymentConfirmation}
              className="flex-1 bg-emerald-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>I've Made Payment</span>
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="text-center text-sm text-gray-600">
          Need help? Contact us on WhatsApp:{" "}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {WHATSAPP_NUMBER}
          </a>
          {" "}or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-600 hover:text-emerald-700">
            {SUPPORT_EMAIL}
          </a>
        </div>


      </div>
    </div>
  )
}