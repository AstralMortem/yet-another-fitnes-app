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
      equipment: {
        Row: {
          created_at: string
          id: number
          image: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          title?: string
        }
        Relationships: []
      }
      equipment_exercise: {
        Row: {
          created_at: string
          equipment_id: number
          exercise_id: string
        }
        Insert: {
          created_at?: string
          equipment_id?: number
          exercise_id: string
        }
        Update: {
          created_at?: string
          equipment_id?: number
          exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_exercise_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise: {
        Row: {
          author_id: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          is_active: boolean
          is_public: boolean
          level: number
          title: string
          type: Database["public"]["Enums"]["ExerciseTypeEnum"]
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_public?: boolean
          level?: number
          title: string
          type: Database["public"]["Enums"]["ExerciseTypeEnum"]
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_public?: boolean
          level?: number
          title?: string
          type?: Database["public"]["Enums"]["ExerciseTypeEnum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "excercise_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          comment: string | null
          created_at: string
          exercise_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          exercise_id: string
          user_id?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          exercise_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_excercise: {
        Row: {
          created_at: string
          exercise_id: string
          muscle_id: number
          procent: number
          type: Database["public"]["Enums"]["MuscleTypeEnum"]
        }
        Insert: {
          created_at?: string
          exercise_id: string
          muscle_id?: number
          procent?: number
          type?: Database["public"]["Enums"]["MuscleTypeEnum"]
        }
        Update: {
          created_at?: string
          exercise_id?: string
          muscle_id?: number
          procent?: number
          type?: Database["public"]["Enums"]["MuscleTypeEnum"]
        }
        Relationships: [
          {
            foreignKeyName: "muscle_excercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_excercise_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
        ]
      }
      muscles: {
        Row: {
          created_at: string
          id: number
          image: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          title?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          age: number
          created_at: string
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["GenderEnum"]
          height: number
          id: string
          is_active: boolean
          is_superuser: boolean
          rest_time: number
          training_aim: Database["public"]["Enums"]["TrainingAimEnum"]
          training_per_week: number
          training_time: number
          updated_at: string | null
          weight: number
        }
        Insert: {
          age: number
          created_at?: string
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["GenderEnum"]
          height: number
          id: string
          is_active?: boolean
          is_superuser?: boolean
          rest_time?: number
          training_aim: Database["public"]["Enums"]["TrainingAimEnum"]
          training_per_week?: number
          training_time?: number
          updated_at?: string | null
          weight: number
        }
        Update: {
          age?: number
          created_at?: string
          email?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["GenderEnum"]
          height?: number
          id?: string
          is_active?: boolean
          is_superuser?: boolean
          rest_time?: number
          training_aim?: Database["public"]["Enums"]["TrainingAimEnum"]
          training_per_week?: number
          training_time?: number
          updated_at?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      routines: {
        Row: {
          author_id: string | null
          comment: string | null
          created_at: string
          id: string
          is_active: boolean
          is_public: boolean
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_public?: boolean
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_public?: boolean
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routines_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      routines_exercise: {
        Row: {
          created_at: string
          exercise_id: string
          reps: number
          routine_id: string
          sets: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          exercise_id: string
          reps?: number
          routine_id: string
          sets?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          exercise_id?: string
          reps?: number
          routine_id?: string
          sets?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routines_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routines_exercise_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      filter_exercise_by_equipment: {
        Args: {
          equip_id: number
        }
        Returns: string[]
      }
      filter_exercise_by_muscles: {
        Args: {
          muscles_id: number
        }
        Returns: string[]
      }
    }
    Enums: {
      ExerciseTypeEnum:
        | "strenght_weight"
        | "strenght_reps"
        | "strenght_duration"
        | "cardio_duration"
        | "cardio_lenght"
        | "stretch"
      genderenum: "male" | "female"
      GenderEnum: "male" | "female"
      MuscleTypeEnum: "main" | "secondary"
      trainingaimenum: "flesh" | "fit" | "lose"
      TrainingAimEnum: "flesh" | "fit" | "lose"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
