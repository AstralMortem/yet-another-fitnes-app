import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useEquipmentsStore = defineStore({
  id: 'equipmentsStore',
  state: () => ({
    dataList: [] as Tables<'equipment'>[],
    currentID: Number(),
    pending: true,
  }),
  actions: {
    async fetchTable() {
      this.pending = true
      try {
        const data = await supabaseFetch('equipment', '*', false)
        this.dataList = data
      }
      catch (error) {
        console.error(error)
      }
      this.pending = false
    },
  },
  getters: {
    getSelectedItem: state => state.dataList.find(x => x.id === state.currentID),
  },
})
