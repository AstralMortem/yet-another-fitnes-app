import type { Tables, TablesInsert, TablesUpdate } from './supabase'

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
  equipments?: number[]
  muscles?: Tables<'muscle_exercise'>[]
}

export interface ExerciseUpdate extends TablesUpdate<'exercise'> {
  equipments?: number[]
  muscles?: TablesUpdate<'muscle_exercise'>[]
}
