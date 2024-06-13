import { defineStore } from 'pinia'
import type { ExerciseSelect } from '~/types/exercise'

export const useExerciseStore = defineStore({
  id: 'myExerciseStore',
  state: () => ({ 
    exerciseList: [] as Array<ExerciseSelect>,
    page: 1,
    hasMore: true,
    pending: false
  }),
  actions: {
    async fetchExercise(){
      const ObjectPerPage = 5
      const supabase = useSupabaseApi()
      this.pending = true
      const {data,error} = await supabase.from('exercise').select('id, image, title, level,description, muscles(id, title)').eq('is_active', true).eq('is_public', true).range((this.page-1)*ObjectPerPage, this.page*ObjectPerPage)
      this.pending = false
      if(error){
        DBErrorMessage(error)
      }else{
        if(data.length > 0){
          this.exerciseList = [...this.exerciseList, ...data]
          return data
        }else{
          this.hasMore = false
        }
        
      }
    }
  }
})
