<template>
  <div class="w-full p-4 border-b-2 border-slate-500 flex flex-row justify-between items-center">
    <div class="flex flex-row px-2 justify-start items-start w-full gap-4">
      <div class="flex flex-col gap-4 justify-center items-center">
        <img :src="$props.exercise.image ? $props.exercise.image : '/img/image_not_found.png'" class="w-24 h-24 rounded-lg ring-4 ring-primary" />
      </div>
      <div class="flex flex-col gap-1 justify-center items-start">
        <p class="text-4xl">{{ $props.exercise.title }}</p>
        <div class="flex flex-row justify-start items-center gap-2">
          <p class="text-lg text-slate-500" v-for="muscle in $props.exercise.muscles">{{ muscle.title }}</p>
        </div>
        <div class="flex flex-row justify-start items-center gap-2">
          <UILevelMeter v-model="$props.exercise.level" />
          <UTooltip :text="$props.exercise.description" v-if="$props.exercise.description" class="text-lg">
            <UIcon name="i-ph-info" class="text-primary text-2xl"/>
          </UTooltip>
        </div>
      </div>
    </div>
    <UButton icon="i-ph-star" variant="ghost" size="xl"/>
  </div>
</template>

<script lang="ts" setup>
import type { ExerciseSelect } from '~/types/exercise';

const props = defineProps({
  exercise: {
    type: {} as PropType<ExerciseSelect>,
    required: true
  }
})

</script>

<style></style>