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
        this.pending = true
        const data = await supabaseSimpleFetch('profile', '*', [{ column: 'id', op: 'eq', value: supabaseUser.value.id }], undefined, true)
        this.pending = false
        if (data) {
          this.userProfile = data as Tables<'profile'>
        }
      }
    },
  },
  getters: {
    isAuthenticated: state => !state.userProfile,
    isSuperUser: state => !!state.userProfile.is_superuser,
    userID: state => state.userProfile.id,
  },
})
