import type { IFetchFilter, IFetchPagination } from '~/types/filters'
import type { PublicSchema } from '~/types/supabase'

type TableName = keyof PublicSchema['Tables']
type Table<T extends TableName> = PublicSchema['Tables'][T]['Row']
type IsOneRow = boolean
type Returns<T, B extends IsOneRow> = Promise<B extends true ? T : T[]>

export default async <TName extends TableName, T extends Table<TName>, IsOne extends IsOneRow>(tableName: TName, columns: string = '*', isOneRow: IsOne = false as IsOne, filters: IFetchFilter[] = [], paginations?: IFetchPagination): Returns<T, IsOne> => {
  const supabase = useSupabaseApi()

  let statement = supabase.from(tableName).select(columns)
  filters.forEach((filter) => {
    const { column, op, value } = filter
    statement = statement[op](column, value)
  })

  if (paginations) {
    const page = paginations.page
    const offset = paginations.offset
    if (page > 0) {
      statement = statement.range((page - 1) * offset, page * offset)
    }
  }

  if (isOneRow) {
    // @ts-expect-error Not my fault
    statement = statement.returns<T>().limit(1).single()
  }
  else {
    // @ts-expect-error Not my fault
    statement = statement.returns<T[]>()
  }

  const { data, error } = await statement
  if (error) {
    fetchError(error)
    throw error
  }
  else {
    return data as any
  }
}
