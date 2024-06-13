import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useEquipmentStore = defineStore({
  id: 'myEquipmentStore',
  state: () => ({ 
    dataList: [] as Array<Tables<'equipment'>>,
    pending: false
  }),
  actions: {
    async fetchTable(){
      if(this.dataList.length  <= 0){
        const supabase = useSupabaseApi()
        this.pending = true
        const {data,error} = await supabase.from('equipment').select('*')
        this.pending = false
        if(error){
          DBErrorMessage(error)
        }
        else {
          this.dataList = data
        }
      }
      
    }
  }
})
