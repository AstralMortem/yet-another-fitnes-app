import type { EnumObject } from "./filter"
import type { Tables } from "./supabase"

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