"use client"

import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"
import {
  WHATSAPP_NUMBER,
  CONTACT_PHONES,
  CONTACT_EMAILS,
  CONTACT_ADDRESS,
} from "@/lib/config"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, phone, subject, message } = formData
    if (!name || !message) return

    const text = `*New Contact Message*

*Name:* ${name}
*Email:* ${email || "—"}
*Phone:* ${phone || "—"}
*Subject:* ${subject || "—"}

*Message:*
${message}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    setSubmitted(true)
  }

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Get In Touch
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
            Have questions about our natural healing solutions? We&apos;re here to help.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          {/* Contact info cards */}
          <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
            {/* Phone */}
            <div className="overflow-hidden bg-white rounded-xl p-6">
              <Phone className="w-10 h-10 mx-auto text-gray-400" />
              {CONTACT_PHONES.map((p) => (
                <p key={p} className="mt-3 text-lg font-medium text-gray-900">
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                    {p}
                  </a>
                </p>
              ))}
            </div>

            {/* Email */}
            <div className="overflow-hidden bg-white rounded-xl p-6">
              <Mail className="w-10 h-10 mx-auto text-gray-400" />
              {CONTACT_EMAILS.map((em) => (
                <p key={em} className="mt-3 text-sm md:text-base font-medium text-gray-900 break-words">
                  <a href={`mailto:${em}`} className="hover:text-primary transition-colors">
                    {em}
                  </a>
                </p>
              ))}
            </div>

            {/* Address */}
            <div className="overflow-hidden bg-white rounded-xl p-6">
              <MapPin className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-3 text-lg font-medium leading-relaxed text-gray-900">
                {CONTACT_ADDRESS}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="mt-6 overflow-hidden bg-white rounded-xl">
            <div className="px-6 py-12 sm:p-12">
              <h3 className="text-3xl font-semibold text-center text-gray-900">
                Send us a Message
              </h3>
              <p className="text-center text-sm text-gray-500 mt-2">
                Your message will open in WhatsApp — ready to send directly to our team.
              </p>

              {submitted ? (
                <div className="mt-10 text-center py-10">
                  <p className="text-2xl font-semibold text-primary mb-2">Message Sent!</p>
                  <p className="text-gray-600 mb-6">
                    Your WhatsApp message has been prepared. Our team will respond shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }) }}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="text-base font-medium text-gray-900">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary caret-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-gray-900">
                        Email Address
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary caret-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="text-base font-medium text-gray-900">
                        Phone Number
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary caret-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="text-base font-medium text-gray-900">
                        Subject
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary caret-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="text-base font-medium text-gray-900">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-primary caret-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-4 mt-2 text-base font-semibold text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Send via WhatsApp
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
