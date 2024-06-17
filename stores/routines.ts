import { defineStore } from "pinia";
import type { RoutineSelect } from "~/types/routines";
import type { Tables } from "~/types/supabase";

export const useRoutinesStore = defineStore({
  id: "myRoutinesStore",
  state: () => ({
    dataList: [] as RoutineSelect[],
    page: 1,
    limit: 10,
    pending: false,
    reachedEnd: false,
  }),
  actions: {
    async fetchTable() {
      if (this.dataList.length == 0) {
        const supabase = useSupabaseApi();

        this.pending = true;

        const { data, error } = await supabase
          .from("routines")
          .select("title,id,exercise(id,title,level,image, muscles(id))")
          .eq("is_active", true)
          .eq("is_public", true);
        if (error) {
          DBErrorMessage(error);
        } else {
          this.dataList = data;
        }
        this.pending = false;
      }
    },
  },
});
