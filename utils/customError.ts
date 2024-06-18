import type { NotificationColor } from '#ui/types/notification.js'

export default (title: string, description: string, color: NotificationColor = 'red') => {
  useToast().add({
    title,
    description,
    icon: 'i-ph-warning',
    color,
  })
}
