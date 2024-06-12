<template>
  <div class="w-full h-max flex flex-col gap-2 text-primary-500 items-start">
    <p class="text-4xl">{{ $props.label }}</p>
    <div class="relative w-full h-28">
      <p class="text-white font-bold p-2 ring-2 ring-primary absolute top-0 rounded-full z-50 bg-primary-500" :style="{left:position}">{{ model }} {{ $props.prefix }}</p>
    </div>
    <div class="w-full h-full relative">
      <div class="flex w-full flex-row justify-around absolute top-0 left-0">
        <span class="h-8 w-[2px] bg-primary-400 relative" v-for="i in $props.max/20">
          <p class="absolute top-10 -left-2" v-if="i%5 == 0 || i == 1">{{ i*20 }}</p>
        </span>
      </div>
      <URange v-model="model" :min="$props.min" :max="$props.max" size="2xl" step="1" :ui="{
      track: {
        background: '[&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:dark:bg-transparent',
        size: {
          '2xl': '[&::-webkit-slider-runnable-track]:h-12 [&::-moz-range-track]:h-12',
        }
      },
      thumb: {
        base: '[&::-webkit-slider-thumb]:rounded-lg [&::-moz-range-thumb]:rounded-lg ',
        ring: '[&::-webkit-slider-thumb]:ring-1',
        size: {
          '2xl': '[&::-webkit-slider-thumb]:h-12 [&::-moz-range-thumb]:h-12 [&::-webkit-slider-thumb]:w-2 [&::-moz-range-thumb]:w-2 [&::-webkit-slider-thumb]:mt-0 [&::-moz-range-thumb]:mt-0'
        },
        background: '[&::-webkit-slider-thumb]:bg-primary-500  [&::-webkit-slider-thumb]:dark:bg-primary-500 [&::-webkit-slider-thumb]:dark:hover:bg-primary-400'

      },
      progress: {
        background: 'bg-transparent dark:bg-transparent'
      }
    }" />
    </div>
    
  </div>
</template>

<script lang="ts" setup>

const props = defineProps(['min', 'max', 'label', 'prefix'])
const model = defineModel<number>()

const position = computed(()=> `${Math.floor((model.value/props.max)*100-(props.min/2))}%`)

</script>

<style scoped>

</style>