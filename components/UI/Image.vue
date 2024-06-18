<script lang="ts" setup>
import { theme } from '#tailwind-config'

const props = defineProps({
  src: {
    type: null as unknown as PropType<string | null>,
    required: true,
  },
  height: {
    type: Number,
    default: 96,
  },
  width: {
    type: Number,
    default: 96,
  },
  bucketName: {
    type: String,
  },
  ringColor: {
    type: String,
  },
})

const NOT_FOUND_IMAGE = '/img/image_not_found.png'

const path = ref(NOT_FOUND_IMAGE)

async function fetchPath(bucketName: string) {
  const supabase = useSupabaseApi()
  if (props.src) {
    const { data } = await supabase.storage.from(bucketName).createSignedUrl(props.src, 86400)
    if (data) {
      return data?.signedUrl
    }
  }
  return NOT_FOUND_IMAGE
}

async function getPath() {
  if (props.bucketName) {
    const path = await fetchPath(props.bucketName)
    return path
  }
  return props.src ? props.src : NOT_FOUND_IMAGE
}

onMounted(async () => {
  path.value = await getPath()
})
</script>

<template>
  <img
    :src="path"
    class="rounded-lg ring-4"
    :style="{
      'width': `${$props.width}px`,
      'height': `${$props.height}px`,
      '--tw-ring-color': $props.ringColor,
    }"
  >
</template>

<style>

</style>
