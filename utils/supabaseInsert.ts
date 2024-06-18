import { boolean } from 'zod'
import type { IFetchFilter } from '~/types/filters'
import type { PublicSchema } from '~/types/supabase'

export default async <TableName extends keyof PublicSchema['Tables']>(tableName: TableName, values: any | any[], filters: IFetchFilter[] = [], returns: boolean = false) => {
  const supabase = useSupabaseApi()

  let statement = supabase.from(tableName).insert(values)

  filters.forEach((filter) => {
    const { column, op, value } = filter
    statement = statement[op](column, value)
  })

  const { data, error } = returns ? await statement.select() : await statement
  if (error) {
    fetchError(error)
    throw error
  }
  else {
    return data
  }
}
