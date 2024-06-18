<script lang="ts" setup>
import type { ChartData } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const route = useRoute()
const { data: exercise, status } = await useAsyncData('fetch-exercise-detail', async () => {
  const data = await supabaseFetch('exercise', '*, equipment(*)', true, [{ column: 'id', op: 'eq', value: route.params.exercise_id }])
  if (data) {
    return data
  }
})

const { data: muscles, status: muscleStatus } = await useAsyncData('fetch-exercise-muscles', async () => {
  if (exercise.value) {
    const data = await supabaseFetch('muscle_exercise', '*, muscles!inner(*)', false, [{ column: 'exercise_id', op: 'eq', value: exercise.value.id }])
    if (data) {
      return data
    }
  }
})

const muscleChartColor = computed(() => {
  if (muscles.value) {
    return muscles.value?.map(x => generateRandomColor())
  }
  return '#ffffff'
})

const muscleChart = ref<ChartData<'doughnut'>>({
  labels: muscles.value?.map(x => x.muscles.title),
  datasets: [{
    label: 'Procent',
    backgroundColor: muscleChartColor.value,
    data: muscles.value?.map(x => x.procent),
  }],
})

const muscleChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  width: 100,
})

const exerciseTypeObject = computed(() => useExercisesTypeStore().dataList.find(x => x.label === exercise.value?.type))
</script>

<template>
  <UILoader v-if="status === 'pending'" />
  <div v-else-if="status === 'success' && exercise" class="flex flex-col h-full w-full overflow-y-auto gap-6">
    <div class="flex flex-col md:flex-row md:justify-between gap-6">
      <UIResponsiveCard block class="min-w-[300px] items-center flex justify-center">
        <UIImage :src="exercise?.image" :width="600" :height="400" />
      </UIResponsiveCard>
      <UIResponsiveCard block class="w-full">
        <div class="flex flex-col w-full gap-6 items-stretch">
          <div class="flex flex-row justify-between items-center">
            <UIP>{{ exercise?.title }}</UIP>
            <ExercisesLevelMeter v-model="exercise.level" />
          </div>
          <UDivider />
          <UIResponsiveCard block title="Description" class="ring-2 ring-primary rounded-lg ">
            <p class="p-2">
              {{ exercise.description }}
            </p>
          </UIResponsiveCard>
        </div>
      </UIResponsiveCard>
    </div>
    <UIResponsiveCard block title="Muscles" class="w-full">
      <div class="flex flex-col-reverse md:flex-row md:justify-between w-full items-center md:items-start">
        <div class="grid grid-cols-2 md:grid-cols-3 h-fit gap-3">
          <UIResponsiveCard v-for="(muscle, idx) in muscles" :key="muscle.muscle_id">
            <div class="flex flex-row justify-start items-start gap-2">
              <UIImage :src="muscle.muscles.image" />
              <div class="flex flex-col items-start">
                <UIP>{{ muscle.muscles.title }}</UIP>
                <UIP>{{ muscle.procent }}%</UIP>
              </div>
            </div>
          </UIResponsiveCard>
        </div>
        <div class="relative">
          <Doughnut :data="muscleChart" :options="muscleChartOptions" />
        </div>
      </div>
    </UIResponsiveCard>
    <div class="flex flex-col gap-6 md:flex-row">
      <UIResponsiveCard block class="w-full" title="Equipments">
        <div class="flex flex-row justify-between items-center flex-wrap">
          <UIResponsiveCard v-for="(equipment, idx) in exercise.equipment" :key="equipment.id" block>
            <div class="flex flex-row gap-2 justify-start items-start">
              <UIImage :src="equipment.image" :height="60" :width="60" />
              <UIP class="text-2xl">
                {{ equipment.title }}
              </UIP>
            </div>
          </UIResponsiveCard>
        </div>
      </UIResponsiveCard>
      <UIResponsiveCard v-if="exerciseTypeObject" block class="w-full" title="Exercise Type">
        <UIResponsiveCard>
          <div class="flex flex-row gap-2 justify-start items-center">
            <UIP><UIcon :name="exerciseTypeObject.icon" :dynamic="true" /></UIP>
            <UIP>{{ exerciseTypeObject.title }}</UIP>
          </div>
        </UIResponsiveCard>
        
      </UIResponsiveCard>
    </div>
  </div>
</template>

<style>

</style>
