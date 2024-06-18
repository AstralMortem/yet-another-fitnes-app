import type { PostgrestError } from '@supabase/postgrest-js/src/types'

export default (error: PostgrestError) => {
  const toast = useToast()
  toast.add({
    title: error.code,
    description: `${error.message}||${error.details}`,
    actions: [{
      to: `/errors/${error.code}`,
      label: 'Details',
      size: 'xl',
      icon: 'i-ph-info',
    }],
    icon: 'i-ph-warning-circle',
  })
}
