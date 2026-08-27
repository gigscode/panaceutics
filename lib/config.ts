/**
 * Central config for operational constants.
 * To update without a redeploy, change the corresponding env var in Vercel.
 */

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348070943256"

export const BANK_DETAILS = {
  bankName:      process.env.NEXT_PUBLIC_BANK_NAME    || "Stanbic IBTC",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT || "0084736029",
  accountName:   process.env.NEXT_PUBLIC_BANK_OWNER   || "Panaceutics Ltd",
}

export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@panaceutics.org"
