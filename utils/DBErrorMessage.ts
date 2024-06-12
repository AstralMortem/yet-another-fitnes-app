import {type PostgrestError} from "@supabase/postgrest-js/src/types"

export default (error:PostgrestError) => {
  useToast().add({
    title: error.code,
    description: error.message,
    color: "red",
    icon: "i-ph-warning-circle",
    actions:[
      {
        to: `/error/{error.code}`,
        label: "Details"
      }
    ]
  })
}
