<template>
  <div class="flex flex-col justify-center items-center gap-6">
    <p class="text-4xl">How much you want training?</p>
    <div class="bg-slate-700 w-full p-4 rounded-lg flex flex-col gap-4">
      <div class="flex flex-row w-full gap-4 items-center justify-between">
        <UIcon name="i-ph-chart-line-up" class="text-4xl"/>
        <div class="flex flex-col w-full gap-2">
          <p class="text-2xl">Habit</p>
          <UProgress :value="calcHabit" :max="7" size="lg"/>
        </div>
      </div>
      <div class="flex flex-row w-full gap-4">
        <UIcon name="i-ph-gauge" class="text-4xl"/>
        <div class="flex flex-col w-full gap-2">
          <p class="text-2xl">Progress</p>
          <UProgress :value="calcProgres" :max="7" size="lg"/>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <p class="text-5xl">{{ model }} times/week</p>
      <URange v-model="model" :min="1" :max="7" :step="1" size="2xl"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel({default:1})

const calcProgres = computed(()=>model.value)
const calcHabit = computed(()=>7/model.value+0.8)
</script>

<style>

</style>