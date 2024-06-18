import customError from './customError'

export default async (image: File, bucketName: string, _isPublic: boolean = false) => {
  const profileStore = useUserProfileStore()
  const supabase = useSupabaseApi()
  const folder = _isPublic ? 'public' : `private/${profileStore.userID}`
  const date = new Date()
  const uploadDate = `${date.getDate()}_${date.getDay()}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}`
  const extension = image.name.split('.').pop()
  const fileName = `${folder}/${uploadDate}.${extension}`
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, image, {
    upsert: true,
    contentType: image.type,
  })
  if (error) {
    customError(error.name, error.message)
    throw error
  }
  else {
    return data.path
  }
}
