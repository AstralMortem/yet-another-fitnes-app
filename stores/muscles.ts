import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useMusclesStore = defineStore({
  id: 'musclesStore',
  state: () => ({
    dataList: [] as Tables<'muscles'>[],
    currentID: Number(),
    pending: false,
  }),
  actions: {
    async fetchTable() {
      try {
        const data = await supabaseFetch('muscles', '*', false)
        this.dataList = data
      }
      catch (error) {
        console.error(error)
      }
    },
  },
  getters: {
    getCurentItem: state => state.dataList.find(x => x.id === state.currentID),
  },
})
