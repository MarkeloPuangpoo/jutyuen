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
      norms_data: {
        Row: {
          axis: Database["public"]["Enums"]["axis_type"]
          id: number
          last_recalculated_at: string | null
          mean_score: number
          std_dev: number
          total_samples: number
        }
        Insert: {
          axis: Database["public"]["Enums"]["axis_type"]
          id?: number
          last_recalculated_at?: string | null
          mean_score: number
          std_dev: number
          total_samples: number
        }
        Update: {
          axis?: Database["public"]["Enums"]["axis_type"]
          id?: number
          last_recalculated_at?: string | null
          mean_score?: number
          std_dev?: number
          total_samples?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          axis: Database["public"]["Enums"]["axis_type"]
          category: Database["public"]["Enums"]["question_category"]
          content: string
          created_at: string | null
          id: string
          is_active: boolean
          is_reverse: boolean
          updated_at: string | null
          version: number
        }
        Insert: {
          axis: Database["public"]["Enums"]["axis_type"]
          category: Database["public"]["Enums"]["question_category"]
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          is_reverse?: boolean
          updated_at?: string | null
          version?: number
        }
        Update: {
          axis?: Database["public"]["Enums"]["axis_type"]
          category?: Database["public"]["Enums"]["question_category"]
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          is_reverse?: boolean
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      responses: {
        Row: {
          created_at: string | null
          id: string
          question_id: string
          raw_score: number
          session_id: string
          time_spent_ms: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_id: string
          raw_score: number
          session_id: string
          time_spent_ms?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          question_id?: string
          raw_score?: number
          session_id?: string
          time_spent_ms?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "survey_sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      survey_results: {
        Row: {
          axis: Database["public"]["Enums"]["axis_type"]
          created_at: string | null
          id: string
          margin_of_error: number
          percentile: number
          score: number
          session_id: string
        }
        Insert: {
          axis: Database["public"]["Enums"]["axis_type"]
          created_at?: string | null
          id?: string
          margin_of_error: number
          percentile: number
          score: number
          session_id: string
        }
        Update: {
          axis?: Database["public"]["Enums"]["axis_type"]
          created_at?: string | null
          id?: string
          margin_of_error?: number
          percentile?: number
          score?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "survey_sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      survey_sessions: {
        Row: {
          completed_at: string | null
          id: string
          scoring_version: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["session_status"]
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          scoring_version?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"]
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          scoring_version?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          demographics: Json | null
          id: string
        }
        Insert: {
          created_at?: string | null
          demographics?: Json | null
          id?: string
        }
        Update: {
          created_at?: string | null
          demographics?: Json | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      axis_type:
        | "economic"
        | "authority"
        | "social"
        | "international"
        | "centralization"
        | "religiosity"
      question_category: "value" | "policy"
      session_status: "started" | "completed" | "abandoned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
