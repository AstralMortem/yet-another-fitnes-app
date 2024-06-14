<template>
  <img :src="path" 
  class="rounded-lg ring-4 ring-primary" 
  :style="{
    width: `${$props.width}px`,
    height: `${$props.height}px`
  }" />
</template>

<script lang="ts" setup>


const props = defineProps({
  src:{
    type: null as unknown as PropType<string | null>,
    required:true
  },
  height:{
    type: Number,
    default: 96
  },
  width:{
    type: Number,
    default: 96
  },
  bucketName:{
    type: String
  }
})

const NOT_FOUND_IMAGE = '/img/image_not_found.png'

const path = ref(NOT_FOUND_IMAGE)

const fetchPath = async (bucketName:string) =>{
  const supabase = useSupabaseApi()
  if(props.src){
    const {data} = await supabase.storage.from(bucketName).createSignedUrl(props.src, 86400)
    if(data){
      return data?.signedUrl
    }
  }
  return NOT_FOUND_IMAGE
}

const getPath = async () =>{
  if(props.bucketName){
    const path = await fetchPath(props.bucketName)
    return path
  }
  return props.src ? props.src : NOT_FOUND_IMAGE
}

onMounted(async ()=>{
  path.value = await getPath()
})

</script>

<style>

</style>