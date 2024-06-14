import {type PostgrestError} from "@supabase/postgrest-js/src/types"

export default (error:PostgrestError) => {
  useToast().add({
    title: error.code,
    description: error.message,
    color: "red",
    icon: "i-ph-warning-circle",
    actions:[
      {
        to: `https://postgrest.org/en/v12/references/errors.html#:~:text=offsets%20are%20used.-,${error.code},-400`,
        label: "Details"
      }
    ]
  })
}
