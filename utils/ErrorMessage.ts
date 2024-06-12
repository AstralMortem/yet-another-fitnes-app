export default (title:string, description:string) => {
  useToast().add({
    "title": title,
    "description": description,
    "color": "red"
  })
}
