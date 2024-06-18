<script lang="ts" setup>
import type { theme } from '#tailwind-config'

defineProps({
  bgColor: {
    type: [String],
    default: 'slate',
  },
})

const colorVariant = ref({
  primary: 'bg-primary-900 hover:bg-primary-700',
  slate: 'bg-slate-900 hover:bg-slate-700',
})
</script>

<template>
  <div class="flex flex-row justify-betweeen items-center rounded-lg px-2.5 py-2 md:px-4 md:py-4 cursor-pointer" :class="colorVariant[$props.bgColor]">
    <slot />
  </div>
</template>

<style>

</style>
