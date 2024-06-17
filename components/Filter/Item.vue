<template>
  <div class="flex p-2 md:p-4 hover:bg-slate-700 mx-4 rounded-lg cursor-pointer bg-slate-700 bg-opacity-20 justify-between items-center w-full" 
  @click="model=$props.data.id; $emit('close')" 
  :class="[model == $props.data.id?'text-primary-500':'text-white']">
    <div class="flex flex-row gap-4 items-center">
      <UIImage :src="$props.data.image" :width="56" :height="56" v-if="$props.data.image"/>
      <UIcon v-if="$props.data.icon" :name="$props.data.icon" class="text-2xl"/>
      <p class="text-xl md:text-2xl">{{ $props.data.title }}</p>
    </div>
    <UIcon name="i-ph-check-circle-fill" class="text-2xl md:text-4xl" v-if="model== $props.data.id"/>
  </div>
</template>

<script lang="ts" setup>
import type { Filter } from '~/types/filter';

defineEmits(['close'])

const props = defineProps({
  data:{
    type: {} as PropType<Filter>,
    required: true
  },
})

const model = defineModel()
</script>

<style>

</style>