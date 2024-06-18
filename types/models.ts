import type { Tables } from './supabase'

export interface ExerciseSelect extends Tables<'exercise'> {
  muscles: {
    id: number
    title: number
  }[]
  equipment: {
    id: number
  }[]
}
