export default (title: string, description: string) => {
  useToast().add({
    title,
    description,
    color: 'green',
    icon: 'i-ph-check-circle',
  })
}
