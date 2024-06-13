import { defineStore } from 'pinia'
import type { Tables, Enums } from '~/types/supabase'

export const useSignupStore = defineStore({
  id: 'mySignupStore',
  state: () => ({ 
    userEmail: undefined as string | undefined,
    userPassword: undefined as string | undefined,
    userName: undefined as string | undefined,
    userAge: undefined as number | undefined,
    userGender: undefined as Enums<'GenderEnum'> | undefined,
    userHeight: undefined as number | undefined,
    userWeight: undefined as number | undefined,
    userTrainingAim: undefined as Enums<'TrainingAimEnum'> | undefined,
    userTrainingWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7,
    userRestTime: 60, //in seconds
    userTrainingTime: 45, //in minutes,
    pending: false
  }),
  actions: {
    async signupUser(){
      const supabase = useSupabaseApi()
      if(!this.userEmail || !this.userPassword){
        ErrorMessage("Incorrect email or password", "You provide incorrect password or email")
      }else{
        this.pending = true
        const {data,error} = await supabase.auth.signUp({
          "email": this.userEmail,
          "password": this.userPassword,
          options:{
            "data":{
              "age": this.userAge,
              "full_name": this.userName,
              "gender": this.userGender,
              "height": this.userHeight,
              "weight": this.userWeight,
              "training_aim": this.userTrainingAim,
              "training_per_week": this.userTrainingWeek,
              "rest_time": this.userRestTime,
              "training_time": this.userTrainingTime
            } as Tables<'profile'>
          }
        })
        this.pending = false
        if(error){
          AuthErrorMessage(error)
        }else{
          navigateTo('/login')
          SuccessMessage("Confirm your email", `Please confirm your email ${this.userEmail}`)
          this.cleanStore()
          return data.user
        }
      }
      
    },
    cleanStore(){
      this.userEmail = undefined as string | undefined,
      this.userPassword = undefined as string | undefined,
      this.userName = undefined as string | undefined,
      this.userAge = undefined as number | undefined,
      this.userGender = undefined as Enums<'GenderEnum'> | undefined,
      this.userHeight = undefined as number | undefined,
      this.userWeight = undefined as number | undefined,
      this.userTrainingAim = undefined as Enums<'TrainingAimEnum'> | undefined,
      this.userTrainingWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7
    }
    
  }
})
