import type { Database } from "~/types/supabase"

export const useSupabaseApi = () => {
  return useSupabaseClient<Database>()
}
