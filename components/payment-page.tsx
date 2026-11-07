"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, ShoppingCart, Trash2, Truck } from "lucide-react"
import { Price } from "@/components/ui/price"
import { BANK_DETAILS, DOMESTIC_SHIPPING_FEE_NGN, SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/lib/config"

interface PaymentItem {
  id: string
  title: string
  price: { amount: number; currency: "NGN" | "USD" }
  quantity: number
  image: string
}

interface PaymentPageProps {
  items: PaymentItem[]
  orderId?: string
  onRemoveItem?: (id: string) => void
}

export function PaymentPage({ items, orderId: providedOrderId, onRemoveItem }: PaymentPageProps) {
  const [generatedOrderId] = useState(() => `ORD-${Date.now()}`)
  const orderId = providedOrderId ?? generatedOrderId
  const [deliveryType, setDeliveryType] = useState<"nigeria" | "international">("nigeria")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [copyError, setCopyError] = useState("")
  const isInternational = deliveryType === "international"
  const subtotal = items.reduce((sum, item) => sum + item.price.amount * item.quantity, 0)
  const total = subtotal + (isInternational ? 0 : DOMESTIC_SHIPPING_FEE_NGN)

  const copyToClipboard = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(label)
      setCopyError("")
      window.setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error("Could not copy bank detail:", error)
      setCopyError("Copy failed. Please select and copy the account detail manually.")
    }
  }

  const handleOrderMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const itemsList = items.map(item =>
      `• ${item.title} (Qty: ${item.quantity}) — ₦${(item.price.amount * item.quantity).toLocaleString()}`
    ).join("\n")
    const shippingAddress = isInternational ? `${address}, ${country}` : `${address}, Nigeria`
    const message = isInternational
      ? `Hello! I would like an international shipping quote for my order.

*Customer Details:*
Full name: ${customerName}
Phone: ${phone}
Delivery address: ${shippingAddress}

*Order Details:*
Order ID: ${orderId}
${itemsList}

Products subtotal: ₦${subtotal.toLocaleString()}
Shipping: Please provide an international shipping quote before I make payment.

Thank you!`
      : `Hello! I have made payment for my order.

*Customer Details:*
Full name: ${customerName}
Phone: ${phone}
Delivery address: ${shippingAddress}

*Order Details:*
Order ID: ${orderId}
${itemsList}

Products subtotal: ₦${subtotal.toLocaleString()}
Shipping: ₦${DOMESTIC_SHIPPING_FEE_NGN.toLocaleString()}
*Total amount paid:* ₦${total.toLocaleString()}

Please confirm receipt of payment and process my order.

Thank you!`

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Checkout · {orderId}</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Your order, ready to go.</h1>
          <p className="mt-2 text-gray-600">Add your delivery details, then transfer securely to complete your order.</p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-950">Delivery details</h2>
                  <p className="mt-1 text-sm text-gray-600">We’ll include these details in your WhatsApp order message.</p>
                </div>
              </div>

              <form id="customer-details" onSubmit={handleOrderMessage} className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="mb-1.5 block text-sm font-medium text-gray-800">Full name</label>
                  <input
                    id="customer-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-gray-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    placeholder="Your first and last name"
                  />
                </div>
                <div>
                  <label htmlFor="customer-phone" className="mb-1.5 block text-sm font-medium text-gray-800">Phone number</label>
                  <input
                    id="customer-phone"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-gray-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="delivery-type" className="mb-1.5 block text-sm font-medium text-gray-800">Delivery location</label>
                  <select
                    id="delivery-type"
                    value={deliveryType}
                    onChange={(event) => setDeliveryType(event.target.value === "international" ? "international" : "nigeria")}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-gray-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  >
                    <option value="nigeria">Within Nigeria</option>
                    <option value="international">Outside Nigeria — shipping quoted on request</option>
                  </select>
                </div>
                {isInternational && (
                  <div>
                    <label htmlFor="delivery-country" className="mb-1.5 block text-sm font-medium text-gray-800">Country</label>
                    <input
                      id="delivery-country"
                      name="country"
                      autoComplete="country-name"
                      required
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-gray-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                      placeholder="Enter your country"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="delivery-address" className="mb-1.5 block text-sm font-medium text-gray-800">Full delivery address</label>
                  <textarea
                    id="delivery-address"
                    name="address"
                    autoComplete="street-address"
                    required
                    rows={3}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-gray-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    placeholder="Street address, city, state or region, and postal code"
                  />
                </div>
              </form>
            </section>

            {isInternational ? (
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <h2 className="font-semibold text-amber-950">International orders are arranged on request</h2>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  Send your order and delivery details through WhatsApp to get a shipping quote. Please wait for the confirmed total before transferring payment.
                </p>
              </section>
            ) : (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="mb-1 text-xl font-semibold text-gray-950">Bank transfer</h2>
                <p className="mb-5 text-sm text-gray-600">Transfer the exact total shown in your order summary.</p>

                <div className="space-y-3">
                  {[
                    ["Bank name", BANK_DETAILS.bankName],
                    ["Account number", BANK_DETAILS.accountNumber],
                    ["Account name", BANK_DETAILS.accountName],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3.5">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
                        <p className="mt-1 font-semibold text-gray-950">{value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(label, value)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
                        aria-label={`Copy ${label}`}
                      >
                        <Copy className="h-4 w-4" />
                        {copiedField === label ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
                {copyError && <p role="alert" className="mt-3 text-sm text-red-700">{copyError}</p>}
                <p className="mt-4 text-sm text-gray-600">Use <strong>{orderId}</strong> as your transfer reference.</p>
              </section>
            )}
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-950">Order summary</h2>
                <p className="text-sm text-gray-500">{items.reduce((count, item) => count + item.quantity, 0)} items · Ref {orderId}</p>
              </div>
            </div>

            <div className="mb-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-900">
                    <Price value={{ amount: item.price.amount * item.quantity, currency: item.price.currency }} />
                  </span>
                  {onRemoveItem && (
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between gap-4 text-gray-600">
                <span>Products subtotal</span>
                <Price value={{ amount: subtotal, currency: "NGN" }} />
              </div>
              <div className="flex justify-between gap-4 text-gray-600">
                <span>{isInternational ? "International shipping" : "Shipping (within Nigeria)"}</span>
                {isInternational
                  ? <span className="text-right font-medium text-amber-800">Quoted on request</span>
                  : <Price value={{ amount: DOMESTIC_SHIPPING_FEE_NGN, currency: "NGN" }} />}
              </div>
              <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-lg font-bold text-gray-950">
                <span>{isInternational ? "Products total" : "Total to transfer"}</span>
                {isInternational
                  ? <Price value={{ amount: subtotal, currency: "NGN" }} />
                  : <Price value={{ amount: total, currency: "NGN" }} />}
              </div>
              {isInternational && <p className="text-right text-xs text-gray-500">Final total confirmed after shipping quote</p>}
            </div>

            <button
              type="submit"
              form="customer-details"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            >
              {isInternational ? "Request shipping quote on WhatsApp" : "I've paid — confirm on WhatsApp"}
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              {isInternational
                ? "Your order and delivery details will open in WhatsApp."
                : "Your order and delivery details will open in WhatsApp for payment confirmation."}
            </p>
          </aside>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Need help? Contact us on WhatsApp:{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
            {WHATSAPP_NUMBER}
          </a>
          {" "}or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-700 hover:underline">{SUPPORT_EMAIL}</a>
        </div>
      </div>
    </main>
  )
}
