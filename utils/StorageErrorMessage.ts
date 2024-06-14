import {type StorageError} from "@supabase/storage-js/src/lib/errors"

export default (error:StorageError) => {
  useToast().add({
    title: error.name,
    description: error.message,
    color: "red",
    icon: "i-ph-warning-circle",
    // actions:[
    //   {
    //     to: `/error/${error.name}`,
    //     label: "Details"
    //   }
    // ]
  })
}
