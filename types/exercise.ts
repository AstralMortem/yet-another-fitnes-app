import type { Tables } from "./supabase"

export interface ExerciseSelect{
    id: string
    title: string
    description:string | null
    image: string | null
    level: number
    muscles: {title: string}[]
}