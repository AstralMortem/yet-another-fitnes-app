import { defineStore } from "pinia";
import type { EnumObject } from "~/types/filter";

export const useExerciseTypeStore = defineStore({
  id: "myExerciseTypeStore",
  state: () => ({
    dataList: [] as Array<EnumObject>,
    selected: Number(-1) || undefined,
    pending: false,
  }),
  actions: {
    async fetchTable() {
      if (this.dataList.length == 0) {
        this.pending = true;
        this.dataList = ConvertEnumToArray("ExerciseTypeEnum").map((x, idx) => {
          return { id: idx + 1, title: this.convertLabel(x), label:x } as EnumObject;
        });
        this.pending = false;
      }
    },
    convertLabel(string:string){
      return string.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")
    }
  },
  getters: {
    selectedItem: (state) =>
      state.selected
        ? state.dataList.find((x) => x.id == state.selected)
        : undefined,
  },
});
