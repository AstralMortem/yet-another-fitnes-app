import type { Database } from '~/types/supabase'

export function useSupabaseApi() {
  return useSupabaseClient<Database>()
}
