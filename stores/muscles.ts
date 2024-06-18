import { defineStore } from 'pinia'
import type { Tables } from '~/types/supabase'

export const useMusclesStore = defineStore({
  id: 'musclesStore',
  state: () => ({
    dataList: [] as Tables<'muscles'>[],
    currentID: Number(-1),
    pending: false,
  }),
  actions: {
    async fetchTable() {
      this.pending = true
      try {
        const data = await supabaseFetch('muscles', '*', false)
        data.unshift({
          id: -1,
          title: 'All muscles',
          created_at: '',
          image: null,
        })
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
