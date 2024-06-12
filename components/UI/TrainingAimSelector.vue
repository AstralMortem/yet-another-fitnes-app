<template>
  <div class="flex flex-col gap-6 items-center w-full">
    <div class="rounded-lg hover:ring-4 p-4 flex flex-row justify-between hover:ring-primary-500 hover:text-primary-500 items-center cursor-pointer gap-2 "  
      :class="[model == 'flesh'?'ring-primary-500 ring-4 text-primary-500':'ring-slate-400 ring-1']" @click="model='flesh'">
      <div class="flex flex-row justify-center items-center gap-4">
        <div class="flex flex-col justify-start items-start">
          <p class="text-3xl">Grow flesh</p>
          <p class="text-base truncate w-[200px]">Less weight with more reps, work with middle intensity</p>
        </div>
        <UIcon name="i-ph-barbell" class="text-5xl"/>
      </div>
    </div>
    <div class="rounded-lg hover:ring-4 p-4 flex flex-row justify-between hover:ring-primary-500 hover:text-primary-500 items-center cursor-pointer gap-2 "  
      :class="[model == 'fit'?'ring-primary-500 ring-4 text-primary-500':'ring-slate-400 ring-1']" @click="model='fit'">
      <div class="flex flex-row justify-center items-center gap-4">
        <div class="flex flex-col justify-start items-start">
          <p class="text-3xl">Keep fit</p>
          <p class="text-base truncate w-[200px]">Begin from simple muscle trainig</p>
        </div>
        <UIcon name="i-ph-person-simple-run" class="text-5xl"/>
      </div>
    </div>
    <div class="rounded-lg hover:ring-4 p-4 flex flex-row justify-between hover:ring-primary-500 hover:text-primary-500 items-center cursor-pointer gap-2 "  
      :class="[model == 'lose'?'ring-primary-500 ring-4 text-primary-500':'ring-slate-400 ring-1']" @click="model='lose'">
      <div class="flex flex-row justify-center items-center gap-4">
        <div class="flex flex-col justify-start items-start">
          <p class="text-3xl">Lose weight</p>
          <p class="text-base truncate w-[200px]">Less weight with more reps, bigger rest time</p>
        </div>
        <UIcon name="i-ph-person" class="text-5xl"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Enums } from '~/types/supabase';

const model = defineModel<Enums<'TrainingAimEnum'>>()
</script>

<style>

</style>