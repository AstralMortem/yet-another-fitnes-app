import type { EnumObject } from "./filter"
import type { Tables, TablesInsert } from "./supabase"

export interface ExerciseSelect{
    id: string
    title: string
    description:string | null
    image: string | null
    level: number
    muscles: {title: string}[]
}

export interface ExerciseFilter{
    equipmentFilter: Tables<'equipment'> | undefined
    muscleFilter: Tables<'muscles'> | undefined
    exerciseTypeFilter: EnumObject | undefined
    searchFilter: string
}

export interface ExerciseInsert extends TablesInsert<'exercise'>{
    equipments?: number[],
    muscles?: TablesInsert<'muscle_excercise'>[]
}