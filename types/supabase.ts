export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      buckets: {
        Row: {
          created_at: string
          id: number
          name: string
          percentage: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          percentage: number
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          percentage?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'buckets_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          color: string
          created_at: string
          id: number
          name: string
          update_at: string | null
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: number
          name: string
          update_at?: string | null
          user_id?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: number
          name?: string
          update_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'categories_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      earnings: {
        Row: {
          created_at: string
          date: string
          description: string
          id: number
          source: string
          update_at: string | null
          user_id: string
          value: number
          wallet_id: number
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          id?: number
          source?: string
          update_at?: string | null
          user_id?: string
          value: number
          wallet_id: number
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          id?: number
          source?: string
          update_at?: string | null
          user_id?: string
          value?: number
          wallet_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'public_earnings_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_earnings_wallet_id_fkey'
            columns: ['wallet_id']
            isOneToOne: false
            referencedRelation: 'wallets'
            referencedColumns: ['id']
          },
        ]
      }
      expenses: {
        Row: {
          bucket_id: number
          category_id: number
          created_at: string
          date: string
          description: string
          id: number
          notes: string
          quantity: number
          updated_at: string | null
          user_id: string
          value: number
          wallet_id: number
        }
        Insert: {
          bucket_id: number
          category_id: number
          created_at?: string
          date: string
          description: string
          id?: number
          notes?: string
          quantity?: number
          updated_at?: string | null
          user_id?: string
          value: number
          wallet_id: number
        }
        Update: {
          bucket_id?: number
          category_id?: number
          created_at?: string
          date?: string
          description?: string
          id?: number
          notes?: string
          quantity?: number
          updated_at?: string | null
          user_id?: string
          value?: number
          wallet_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'public_expenses_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_expenses_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_expenses_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_expenses_wallet_id_fkey'
            columns: ['wallet_id']
            isOneToOne: false
            referencedRelation: 'wallets'
            referencedColumns: ['id']
          },
        ]
      }
      movements: {
        Row: {
          bucket_id_from: number | null
          bucket_id_to: number | null
          created_at: string
          date: string
          description: string
          id: number
          updated_at: string | null
          user_id: string
          value: number
          wallet_id_from: number | null
          wallet_id_to: number | null
        }
        Insert: {
          bucket_id_from?: number | null
          bucket_id_to?: number | null
          created_at?: string
          date: string
          description?: string
          id?: number
          updated_at?: string | null
          user_id?: string
          value: number
          wallet_id_from?: number | null
          wallet_id_to?: number | null
        }
        Update: {
          bucket_id_from?: number | null
          bucket_id_to?: number | null
          created_at?: string
          date?: string
          description?: string
          id?: number
          updated_at?: string | null
          user_id?: string
          value?: number
          wallet_id_from?: number | null
          wallet_id_to?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'movements_bucket_id_from_fkey'
            columns: ['bucket_id_from']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movements_bucket_id_to_fkey'
            columns: ['bucket_id_to']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_movements_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_movements_wallet_id_from_fkey'
            columns: ['wallet_id_from']
            isOneToOne: false
            referencedRelation: 'wallets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_movements_wallet_id_to_fkey'
            columns: ['wallet_id_to']
            isOneToOne: false
            referencedRelation: 'wallets'
            referencedColumns: ['id']
          },
        ]
      }
      wallets: {
        Row: {
          created_at: string
          id: number
          initial_balance: number
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          initial_balance?: number
          name: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          initial_balance?: number
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'wallets_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
