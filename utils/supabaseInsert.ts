import type { PublicSchema } from '~/types/supabase'

type Any = any
type Return<T extends Any> = Promise<T extends Any[] ? Any[] : Any | null>

export default async <TableName extends keyof PublicSchema['Tables'], Val extends Any>(tableName: TableName, values: Val | Val[], returns: boolean = false): Return<Val> => {
  const supabase = useSupabaseApi()
  const statement = supabase.from(tableName).insert(values)
  const { data, error } = returns ? Array.isArray(values) ? await statement.select() : await statement.select().single() : await statement
  if (error) {
    fetchError(error)
    throw error
  }
  else {
    return data
  }
}
