<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ExerciseSelect } from '~/types/models'

defineProps({
  data: {
    type: {} as PropType<ExerciseSelect>,
    required: true,
  },
})
</script>

<template>
  <UIResponsiveCard class="w-full" @click="navigateTo(`/exercises/${data.id}`)">
    <div class="flex flex-row gap-2">
      <UIImage :src="data?.image" />
      <div class="flex flex-col justify-start items-start gap-1">
        <UIP>{{ data.title }}</UIP>
        <div class="flex flex-row justify-start items-center gap-2">
          <p class="text-base text-gray-500" v-for="muscle in data.muscles" :key="muscle.id">{{ muscle.title }}</p>
        </div>
        <div class="flex flex-row justify-start items-center gap-2">
          <ExercisesLevelMeter v-model="data.level" />
          <ExercisesDescriptionTooltip :text="data.description" />
        </div>
      </div>
    </div>
  </UIResponsiveCard>
</template>

<style>

</style>
