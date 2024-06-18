import type { IFetchFilter } from '~/types/filters'
import type { PublicSchema } from '~/types/supabase'

export default async <TableName extends keyof PublicSchema['Tables']>(tableName: TableName, _filters: IFetchFilter[] = []) => {
  const supabase = useSupabaseApi()
  const statement = supabase.from(tableName).delete()
  _filters.forEach(filter => {
    statement[filter.op](filter.column, filter.value)
  })

  const { data, error } = await statement.select()
  if (error) {
    fetchError(error)
    throw error
  }
  else {
    return data
  }
}
