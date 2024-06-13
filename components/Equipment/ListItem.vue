<template>
  <div class="flex p-4 hover:bg-slate-700 mx-4 rounded-lg cursor-pointer bg-slate-700 bg-opacity-20 justify-between items-center" 
  @click="model=$props.equipment.id" 
  :class="[model == $props.equipment.id?'text-primary-500':'text-white']">
    <div class="flex flex-row gap-4 items-center">
      <img :src="$props.equipment.image ? $props.equipment.image : '/img/image_not_found.png'" class="w-14 h-14 rounded-lg ring-4 ring-primary" />
      <p class="text-2xl">{{ $props.equipment.title }}</p>
    </div>
    <UIcon name="i-ph-check-circle-fill" class="text-4xl" v-if="model == $props.equipment.id"/>
    
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Tables } from '~/types/supabase';

const model = defineModel()

defineProps({
  equipment: {
    type:{} as PropType<Tables<'equipment'>>,
    required: true
  }
})
</script>

<style>

</style>