<template>
  <div class="flex flex-row gap-6 items-center">
    <div class="rounded-lg hover:ring-4 p-4 flex flex-row justify-between items-center cursor-pointer gap-2 hover:ring-blue-500 hover:text-blue-500" 
      :class="[model == 'male'?'ring-blue-500 text-blue-500 ring-4':'ring-slate-400 ring-1']" @click="model='male'">
      <UIcon name="i-ph-gender-male" class="text-2xl"/>
      <p class="text-3xl">Male</p>
    </div>
    <div class="rounded-lg hover:ring-4 p-4 flex flex-row justify-between hover:ring-pink-500 hover:text-pink-500 items-center cursor-pointer gap-2" 
      :class="[model == 'female'?'ring-pink-500 ring-4 text-pink-500':'ring-slate-400 ring-1']" @click="model='female'">
      <UIcon name="i-ph-gender-female" class="text-2xl"/>
      <p class="text-3xl">Female</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel()

</script>

<style>

</style>