import type { Tables } from "./supabase";

export interface RoutineSelect {
    id: string,
    title:string
    exercise: {
        title: string,
        id: string,
        image: string | null,
        level: number
        muscles: {
            id: number
        }[]
    }[]
}