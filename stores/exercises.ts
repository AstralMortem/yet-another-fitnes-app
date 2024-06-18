import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useExercisesStore = defineStore({
  id: 'exercisesStore',
  state: () => ({ 
    dataList: [] as Tables<'exercise'>[],
    currentID: String,
    page: 1,
    offset: 10,
    pending: false,
    reachedEnd: false,
  }),
  actions: {
    async fetchTable() {
      
    }
  }
})
