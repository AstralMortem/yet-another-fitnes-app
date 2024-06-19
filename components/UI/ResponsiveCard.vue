<script lang="ts" setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: 'slate',
  },
  title: {
    type: String,
  },
  block: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
  },
})

const colorVariant = ref({
  primary: `bg-primary-900 ${props.block ? '' : 'hover:bg-primary-700'}`,
  slate: `bg-slate-900  ${props.block ? '' : 'hover:hover:bg-slate-700'}`,
})
</script>

<template>
  <div class="relative">
    <UIP v-if="$props.title" class="absolute -top-3 md:-top-4 lg:-top-5 left-5 bg-slate-900 px-3 z-1 rounded-xl">
      {{ $props.title }}
    </UIP>
    <div
      class="flex flex-row justify-start items-start rounded-lg px-2.5 py-2 md:px-4 md:py-4 h-full w-full"
      :class="[colorVariant[$props.bgColor], props.block ? '' : 'cursor-pointer']"
    >
      <UTooltip v-if="$props.tooltip" :ui="{ base: 'h-fit' }">
        <slot />
        <template #text>
          <slot name="tooltip-slot">
            <span>{{ $props.tooltip }}</span>
          </slot>
        </template>
      </UTooltip>
      <slot v-else />
    </div>
  </div>
</template>

<style>

</style>
