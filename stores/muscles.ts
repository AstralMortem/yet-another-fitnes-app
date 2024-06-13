import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useMusclesStore = defineStore({
  id: 'myMusclesStore',
  state: () => ({
    dataList: [] as Array<Tables<'muscles'>>,
    selected: Number(-1) || undefined,
    pending: false
   }),
  actions: {
    async fetchTable(){
      if(this.dataList.length  == 0){
        this.pending = true
        const data = await SimpleFetch('muscles')
        this.pending = false
        this.dataList = data
    }
  }
 },
 getters:{
  selectedItem: (state) => state.selected? state.dataList.find(x => x.id == state.selected) : undefined
}
})
