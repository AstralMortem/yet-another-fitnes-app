import type { Tables, TablesInsert } from './supabase'

export interface ExerciseSelect extends Tables<'exercise'> {
  muscles: {
    id: number
    title: number
  }[]
  equipment: {
    id: number
  }[]
}

export interface ExerciseInsert extends TablesInsert<'exercise'> {
  equipments?: number[],
  muscles?: Tables<'muscle_exercise'>[]
}