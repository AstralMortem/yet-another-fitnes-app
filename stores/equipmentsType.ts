import { defineStore } from 'pinia'
import type { IStoreFilter } from '~/types/filters'

export const useEquipmentsTypeStore = defineStore({
  id: 'equipmentsTypeStore',
  state: () => ({ 
    dataList: [] as IStoreFilter[],
    currentID: Number(-1),
    pending: false,
  }),
  actions: {
    async fetchTable(){
      this.pending = true

      this.pending = false
    }
  }
})
