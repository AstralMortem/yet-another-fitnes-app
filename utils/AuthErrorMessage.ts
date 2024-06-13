import {AuthError} from "@supabase/auth-js/src/lib/errors"
export default (error: AuthError) => {
  console.log(error)
  useToast().add({
    title: error.name,
    description: error.message,
    icon: "i-ph-error",
    color: "red"
  })
}
