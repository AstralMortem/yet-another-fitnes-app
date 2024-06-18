import { defineStore } from 'pinia'
import type { IFetchFilter, IFetchPagination } from '~/types/filters'
import type { ExerciseSelect } from '~/types/models'
import type { Tables } from '~/types/supabase'

export const useExercisesStore = defineStore({
  id: 'exercisesStore',
  state: () => ({
    dataList: [] as ExerciseSelect[],
    page: 1,
    offset: 10,
    pending: false,
    reachedEnd: false,
    search: String(''),
  }),
  actions: {
    async fetchTable(filter = false, reset = false) {
      const supabase = useSupabaseApi()
      if (reset) {
        this.page = 1
        this.dataList = [] as ExerciseSelect[]
        this.reachedEnd = false
      }

      if (this.reachedEnd || this.pending)
        return
      const statement = supabase.from('exercise').select('*, muscles(id, title), equipment(id)').eq('is_active', true)
      const profileStore = useUserProfileStore()
      if (profileStore.isAuthenticated) {
        statement.or(`is_public.eq.true,author_id.eq.${profileStore.userProfile.id}`)
      }
      if (filter) {
        const exerciseTypeStore = useExercisesTypeStore()
        if (exerciseTypeStore.getSelectedItemLabel) {
          statement.eq('type', exerciseTypeStore.getSelectedItemLabel)
        }
        const musclesStore = useMusclesStore()
        if (musclesStore.currentID !== -1) {
          const { data: q } = await supabase.rpc('filter_exercise_by_muscles', { muscles_id: musclesStore.currentID })
          statement.in('id', q || [])
        }
        const equipmentStore = useEquipmentsStore()
        if (equipmentStore.currentID !== -1) {
          const { data: q } = await supabase.rpc('filter_exercise_by_equipment', { equip_id: equipmentStore.currentID })
          statement.in('id', q || [])
        }
        if (this.search) {
          statement.ilike('title', `%${this.search}%`)
        }
      }

      this.pending = true
      const { data, error } = await statement.range((this.page - 1) * this.offset, this.page * this.offset).returns<ExerciseSelect[]>()
      this.pending = false

      if (error) {
        fetchError(error)
        console.error(error)
      }
      else {
        if (this.dataList.length < this.offset) {
          this.reachedEnd = true
        }
        this.dataList.push(...data)
        this.page++
      }
    },
  },
})