import { defineStore } from 'pinia'
import type { IStoreFilter } from '~/types/filters'

export const useExercisesTypeStore = defineStore({
  id: 'exercisesTypeStore',
  state: () => ({
    dataList: [] as IStoreFilter[],
    currentID: Number(-1),
    pending: false,
  }),
  actions: {
    async fetchTable() {
      this.pending = true
      const array = convertEnum('ExerciseTypeEnum')
      this.dataList.unshift({
        id: -1,
        title: 'All types',
      })
      array.forEach((item, idx) => {
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
  },
  getters: {
    getSelectedItem: state => state.dataList.find(x => x.id === state.currentID),
  }

})
