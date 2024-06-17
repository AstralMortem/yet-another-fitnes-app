import { defineStore } from 'pinia'
import type { ExerciseFilter, ExerciseSelect } from '~/types/exercise'

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
    async fetchTable(filter?:ExerciseFilter, reset=false){
      const supabase = useSupabaseApi()
      const profile = useProfileStore()
      if (reset) {
        this.page = 1;
        this.dataList = [] as Array<ExerciseSelect>,
        this.reachedEnd = false;
      }

      if (this.reachedEnd || this.pending) return;
      let statement = supabase.from('exercise').select('*, muscles(id, title), equipment(id)').eq('is_active', true)
      if(profile.isAuthenticated){
        statement.or(`is_public.eq.true,author_id.eq.${profile.userProfile.id}`)
      }
      if(filter){
        if(filter.exerciseTypeFilter){
          statement.eq('type', filter.exerciseTypeFilter.label)
        }
        if(filter.muscleFilter){
          const {data:q} = await supabase.rpc('filter_exercise_by_muscles', {muscles_id: filter.muscleFilter.id})
          if(q){
            statement.in('id', q)
          }
        }
        if(filter.equipmentFilter){
          const {data:q} = await supabase.rpc('filter_exercise_by_equipment', {equip_id: filter.equipmentFilter.id})
          if(q){
            statement.in('id', q)
          }
        }
        if(filter.searchFilter){
          statement.ilike('title', `%${filter.searchFilter}%`)
        }
      }

      this.pending = true
      const {data,error} = await statement.range((this.page-1)*this.limit, this.page*this.limit)
      this.pending = false
      
      if(error){
        DBErrorMessage(error)
      }else{
        if(this.dataList.length < this.limit){
          this.reachedEnd = true
        }
        this.dataList.push(...data)
        this.page++
      }
    },
  }
})
