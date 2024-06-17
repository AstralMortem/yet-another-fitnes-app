import type { EnumObject } from "./filter"
import type { Tables, TablesInsert } from "./supabase"

export interface ExerciseSelect extends Tables<'exercise'>{
    // id: string
    // title: string
    // description:string | null
    // image: string | null
    // level: number
    muscles: {title: string, id: number}[]
    equipment: {id: number}[]
}

export interface ExerciseFilter{
    equipmentFilter: Tables<'equipment'> | undefined
    muscleFilter: Tables<'muscles'> | undefined
    exerciseTypeFilter: EnumObject | undefined
    searchFilter: string
}

export interface ExerciseInsert extends TablesInsert<'exercise'>{
    equipments?: number[],
    muscles?: TablesInsert<'muscle_exercise'>[]
}