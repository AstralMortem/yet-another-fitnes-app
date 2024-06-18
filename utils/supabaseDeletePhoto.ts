export default async (bucketName: string, path: string | string[]) => {
  const supabase = useSupabaseApi()
  const { data, error } = await supabase.storage.from(bucketName).remove(Array.isArray(path) ? path : [path])
  if (error) {
    customError(error.name, error.message)
    throw error
  }
  else {
    return data
  }
}
