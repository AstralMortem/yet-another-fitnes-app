import type { Enums } from "./supabase"

export interface SignupStore{
  userEmail: string | undefined
  userPassword: string | undefined
  userName: string | undefined
  userAge: number | undefined,
  userGender: Enums<'GenderEnum'>
  userHeight: number | undefined,
  userWidth: number | undefined,
  userTrainingAim: Enums<'TrainingAimEnum'> 
  userTrainingWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  userRestTime: 60, //in seconds
  userTrainingTime: 45 //in minutes
}


export interface SignupField{
    name: string
    label: string
    placeholder?: string
    fieldName: keyof SignupStore
  }