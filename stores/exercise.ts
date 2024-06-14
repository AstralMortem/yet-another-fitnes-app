import { defineStore } from 'pinia'
import type { ExerciseSelect } from '~/types/exercise'

export const useExerciseStore = defineStore({
  id: 'myExerciseStore',
  state: () => ({ 
    dataList: [] as Array<ExerciseSelect>,
    page: 1,
    limit: 10,
    pending: false,
    reachedEnd: false
  }),
  actions: {
    async fetchTable(){
      const supabase = useSupabaseApi()
      if (this.reachedEnd || this.pending) return;
      this.pending = true
      const {data,error} = await supabase.from('exercise').select('id, image, title, level,description, muscles(id, title)').eq('is_active', true).eq('is_public', true).range((this.page-1)*this.limit, this.page*this.limit)
      if(error){
        DBErrorMessage(error)
      }else{
        if(this.dataList.length < this.limit){
          this.reachedEnd = true
        }
        this.dataList.push(...data)
        this.page++
      }
    }
  }
})
