import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useEquipmentStore = defineStore({
  id: 'myEquipmentStore',
  state: () => ({ 
    dataList: [] as Array<Tables<'equipment'>>,
    selected: Number(-1) || undefined,
    pending: false
  }),
  actions: {
    async fetchTable(){
      if(this.dataList.length  == 0){
        this.pending = true
        const data = await SimpleFetch('equipment')
        this.pending = false
        this.dataList = data as Array<Tables<'equipment'>>
      }
    }
  },
  getters:{
    selectedItem: (state) => state.selected? state.dataList.find(x => x.id == state.selected) : undefined
  }
})
