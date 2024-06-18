import { defineStore } from 'pinia'
import type { IStoreExercisesType } from '~/types/filters'

export const useExercisesTypeStore = defineStore({
  id: 'exercisesTypeStore',
  state: () => ({
    dataList: [] as IStoreExercisesType[],
    currentID: Number(-1),
    pending: false,
  }),
  actions: {
    async fetchTable() {
      this.dataList = []
      this.pending = true
      const array = convertEnum('ExerciseTypeEnum')
      this.dataList.unshift({
        id: -1,
        title: 'All types',
        label: '',
      })
      array.forEach((item, idx) => {
        this.dataList.push({
          id: idx,
          title: this.convertTitle(item),
          icon: this.convertIcon(item),
          label: item,
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
    getSelectedItemLabel: state => state.dataList.find(x => x.id === state.currentID)?.label,
  },

})
