import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useProfileStore = defineStore({
  id: 'myProfileStore',
  state: () => ({
    userProfile: {} as Tables<"profile">,
    pending:false

  }),
  actions: {
    async loginUser(email:string, pass:string){
      const supabase = useSupabaseApi()
      this.pending = true
      const {data,error} = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
      })
      if(error){
        // AuthErrorMessage(error)
        this.pending = false
        return error
      }else{
        await this.fetchProfile(data.user.id)
      }
      this.pending = false
    },
    async fetchProfile(userId:string){
      const supabase = useSupabaseApi()
      const {data,error} = await supabase.from('profile').select('*').eq('id',userId).limit(1).single()
      if(error){
        DBErrorMessage(error)
      }else{
        this.userProfile = data
      }
    }
  },
  getters:{
    isAuthenticated: (state) => !!state.userProfile,
    isSuperUser: (state) => !!state.userProfile.is_superuser
  }
})
