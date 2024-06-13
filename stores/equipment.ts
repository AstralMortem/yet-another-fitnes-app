import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useEquipmentStore = defineStore({
  id: 'myEquipmentStore',
  state: () => ({ 
    equipmentList: [] as Array<Tables<'equipment'>>,
    pending: false
  }),
  actions: {
    async fetchEquipment(){
      if(this.equipmentList.length  <= 0){
        const supabase = useSupabaseApi()
        this.pending = true
        const {data,error} = await supabase.from('equipment').select('*')
        this.pending = false
        if(error){
          DBErrorMessage(error)
        }
        else {
          this.equipmentList = data
        }
      }
      
    }
  }
})
