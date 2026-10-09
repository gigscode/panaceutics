import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ---------------------------------------------------------------------------
// Database row types
// ---------------------------------------------------------------------------

export type QrLink = {
  id: string
  slug: string
  destination_url: string
  label: string | null
  created_at: string
}

export type QrScan = {
  id: string
  slug: string
  scanned_at: string
  device_type: string | null
  user_agent: string | null
  referer: string | null
}

export type QrLinkWithCount = QrLink & { scan_count: number }

// Supabase-compatible Database schema type
export type Database = {
  public: {
    Tables: {
      qr_links: {
        Row: QrLink
        Insert: {
          id?: string
          slug: string
          destination_url: string
          label?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          destination_url?: string
          label?: string | null
          created_at?: string
        }
        Relationships: []
      }
      qr_scans: {
        Row: QrScan
        Insert: {
          id?: string
          slug: string
          scanned_at?: string
          device_type?: string | null
          user_agent?: string | null
          referer?: string | null
        }
        Update: {
          id?: string
          slug?: string
          scanned_at?: string
          device_type?: string | null
          user_agent?: string | null
          referer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'qr_scans_slug_fkey'
            columns: ['slug']
            isOneToOne: false
            referencedRelation: 'qr_links'
            referencedColumns: ['slug']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type TypedSupabaseClient = SupabaseClient<Database>

// ---------------------------------------------------------------------------
// Browser client — safe to call from 'use client' components
// Uses the public anon key; relies on RLS for data access control.
// ---------------------------------------------------------------------------
export function browserClient(): TypedSupabaseClient {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

// ---------------------------------------------------------------------------
// Server client — uses the service role key.
// WARNING: Import this ONLY from server-side files (Route Handlers, Server
// Components). Never import it in 'use client' files — it would expose the
// service role key to the browser bundle.
// ---------------------------------------------------------------------------
export function serverClient(): TypedSupabaseClient {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
