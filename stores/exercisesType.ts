import { defineStore } from 'pinia'
import { array } from 'zod'
import type { IStoreFilter } from '~/types/filters'

export const useExercisesTypeStore = defineStore({
  id: 'exercisesTypeStore',
  state: () => ({
    dataList: [] as IStoreFilter[],
    array: [] as string[],
    currentID: Number(-1),
    pending: false,
  }),
  actions: {
    async fetchTable() {
      this.pending = true
      this.array = convertEnum('ExerciseTypeEnum')
      this.dataList.unshift({
        id: -1,
        title: 'All types',
      })
      this.array.forEach((item, idx) => {
        this.dataList.push({
          id: idx,
          title: this.convertTitle(item),
          icon: this.convertIcon(item),
        })
      })
      this.pending = false
    },
    convertTitle(title: string) {
      return title.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
    },
    convertIcon(name: string) {
      if (name.startsWith('strenght')) {
        return 'i-ph-barbell'
      }
      else if (name.startsWith('cardio')) {
        return 'i-ph-person-simple-run'
      }
      else {
        return 'i-ph-person-simple-tai-chi'
      }
    },
    getTypeById(id: number) {
      const idx = this.dataList.findIndex(x => x.id === id)
      return this.array[idx + 1]
    },
  },
  getters: {
    getSelectedItem: state => state.dataList.find(x => x.id === state.currentID),
    getSelectedItemLabel: state => state.array[state.dataList.findIndex(x => x.id === state.currentID) + 1],
  },

})
