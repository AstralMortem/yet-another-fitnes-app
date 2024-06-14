<template>
  <img :src="$props.src ? $props.src : '/img/image_not_found.png'" 
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
  }
})
</script>

<style>

</style>