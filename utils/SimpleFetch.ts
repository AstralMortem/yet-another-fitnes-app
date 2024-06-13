
import type { PublicSchema, Tables } from "~/types/supabase"

export default async (tableName: keyof PublicSchema['Tables']) => {
  const supabase = useSupabaseApi()
  const {data,error} = await supabase.from(tableName).select('*')
  if(error){
    DBErrorMessage(error)
  }
  return data?data: [] as Array<Tables<typeof tableName>>
}
