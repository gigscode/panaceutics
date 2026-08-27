/**
 * Central config for operational constants.
 * Override any value without a redeploy by setting the corresponding
 * env var in your Vercel dashboard.
 */

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348070943256"

export const BANK_DETAILS = {
  bankName:      process.env.NEXT_PUBLIC_BANK_NAME    || "Stanbic IBTC",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT || "0084736029",
  accountName:   process.env.NEXT_PUBLIC_BANK_OWNER   || "Panaceutics Ltd",
}

export const SUPPORT_EMAIL   = process.env.NEXT_PUBLIC_SUPPORT_EMAIL   || "support@panaceutics.org"
export const PRIVACY_EMAIL   = process.env.NEXT_PUBLIC_PRIVACY_EMAIL   || "support@panaceutics.org"

export const CONTACT_PHONES  = [
  process.env.NEXT_PUBLIC_PHONE_1 || "+234 903 690 9455",
  process.env.NEXT_PUBLIC_PHONE_2 || "+234 807 094 3256",
]

export const CONTACT_EMAILS  = [
  process.env.NEXT_PUBLIC_EMAIL_1 || "olaposi.omotuyi@panaceutics.org",
  process.env.NEXT_PUBLIC_EMAIL_2 || "support@panaceutics.org",
  process.env.NEXT_PUBLIC_EMAIL_3 || "panaceutics.ltd@gmail.com",
]

export const CONTACT_ADDRESS =
  process.env.NEXT_PUBLIC_ADDRESS ||
  "House 9, Mols&Sims Complex, Zone-4, Irekanmi Quarters, Off Ilawe Road, Ado-Ekiti, Ekiti State, Nigeria"
