export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          url: string | null
          image: string | null
          tags: string[]
          owner: string
          location: string
          availability: string
          condition: 'excellent' | 'good' | 'fair' | 'needs-repair'
          price: number
          contact_email: string
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          url?: string | null
          image?: string | null
          tags?: string[]
          owner: string
          location: string
          availability: string
          condition: 'excellent' | 'good' | 'fair' | 'needs-repair'
          price: number
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          url?: string | null
          image?: string | null
          tags?: string[]
          owner?: string
          location?: string
          availability?: string
          condition?: 'excellent' | 'good' | 'fair' | 'needs-repair'
          price?: number
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}