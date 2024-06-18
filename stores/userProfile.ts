import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useUserProfileStore = defineStore({
  id: 'userProfileStore',
  state: () => ({
    userProfile: {} as Tables<'profile'>,
    pending: false,
  }),
  actions: {
    async fetchProfile() {
      const supabaseUser = useSupabaseUser()
      if (supabaseUser.value && !this.isAuthenticated) {
        try {
          const data = await supabaseFetch('profile', '*', true, [{ column: 'id', op: 'eq', value: supabaseUser.value.id }])
          this.userProfile = data
        }
        catch (error) {
          console.error(error)
        }
        this.pending = false
      }
    },
  },
  getters: {
    isAuthenticated: state => !state.userProfile,
    isSuperUser: state => !!state.userProfile.is_superuser,
    userID: state => state.userProfile.id,
  },
})
