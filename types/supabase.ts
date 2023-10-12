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
      transaction_categories: {
        Row: {
          budget: number | null
          created_at: string
          id: number
          name: string
          parent: number | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string
          id?: number
          name: string
          parent?: number | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string
          id?: number
          name?: string
          parent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          created_at: string | null
          id: number
          initial_balance: number | null
          name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          initial_balance?: number | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          initial_balance?: number | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'wallets_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
