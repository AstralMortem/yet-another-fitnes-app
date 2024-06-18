<script lang="ts" setup>
const equipmentStore = useEquipmentsStore()
const musclesStore = useMusclesStore()
const exerciseTypeStore = useExercisesTypeStore()
</script>

<template>
  <div class="flex w-full flex-col justify-start items-start">
    <div class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center w-full">
      <div class="flex flex-row justify-evenly items-center gap-2 ">
        <FilterStore :store="equipmentStore" title="Equipments" />
        <FilterStore :store="musclesStore" title="Muscles" />
        <FilterStore :store="exerciseTypeStore" title="Types" />
      </div>
      <div class="flex flex-row justify-evenly items-center gap-2">
        <UButton icon="i-ph-plus" />
        <UInput class="lg:min-w-[400px]" :ui="{ base: 'md:h-14' }" />
      </div>
    </div>
    <div class="flex flex-col w-full h-full justify-start items-start overflow-y-auto p-1" />
  </div>
</template>

<style>

</style>
