<script lang="ts" setup>
const model = defineModel({ default: 1 })
</script>

<template>
  <UTooltip :text="`Level: ${model}/5`" class="flex flex-row gap-1 justify-start items-center cursor-help z-0">
    <div v-for="i in 5" :key="i" class="rounded-sm w-2 h-5" :class="[i <= model ? 'bg-primary-500' : 'bg-primary-800 opacity-70']" />
  </UTooltip>
</template>

<style>

</style>
