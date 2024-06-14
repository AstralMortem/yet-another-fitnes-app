<template>
  <div class="w-full p-4 flex flex-row justify-between items-center bg-slate-800 hover:bg-opacity-50 rounded-xl cursor-pointer" >
    <NuxtLink class="flex flex-row justify-start items-start gap-4 flex-1" :to="`/exercises/${$props.data.id}`">
      <div class="flex flex-col gap-2 items-center justify-center">
        <UIImage :src="$props.data.image" bucket-name="exercises"/>
      </div>
      <div class="flex flex-col gap-2 justify-start items-start">
        <p class="text-xl md:text-3xl">{{ $props.data.title }}</p>
        <div class="flex flex-row gap-2 justify-start items-start">
          <p class="text-base text-slate-500" v-for="muscle in $props.data.muscles">{{ muscle.title }}</p>
        </div>
        <div class="flex flex-row gap-2 justify-start items-center">
          <UILevelMeter v-model="data.level"/>
          <UTooltip :text="$props.data.description" v-if="$props.data.description">
            <UIcon name="i-ph-info" class="text-xl text-primary cursor-help"/>
          </UTooltip>
        </div>
      </div>
    </NuxtLink>
    <!-- <UButton icon="i-ph-star"/> deprecated--> 
  </div>
</template>

<script lang="ts" setup>
import type { ExerciseSelect } from '~/types/exercise';
defineProps({
  data:{
    type:  {} as PropType<ExerciseSelect>,
    required: true
  }
})
</script>

<style>

</style>