<template>
  <div class="w-full h-full flex flex-col gap-6">
    <div class="flex flex-col-reverse gap-6 lg:gap-0 lg:flex-row justify-between items-start lg:items-center">
      <div class="flex flex-row gap-6 justify-start items-center flex-wrap md:flex-nowrap">
        <FilterSelect :store="equipmentStore" :store-fetcher="equipmentStore.fetchTable" title="Equipment"
          icon="i-ph-barbell" />
        <FilterSelect :store="musclesStore" :store-fetcher="musclesStore.fetchTable" title="Muscles"
          icon="i-ph-smiley" />
        <FilterSelect :store="exerciseTypeStore" :store-fetcher="exerciseTypeStore.fetchTable" title="Type"
          icon="i-ph-person-simple-run" />
      </div>
      <div class="flex flex-row gap-4 lg:justify-end items-center w-full">
    
        <UInput v-model="search" placeholder="Search exercise" size="xl" icon="i-ph-magnifying-glass" class="w-full lg:w-[400px]" />
        <!-- <UButton icon="i-ph-star" size="xl" variant="soft"/> deprecated-->
      </div>
    </div>
    <UILoader v-if="pending"/>
    <div class="flex flex-col overflow-y-auto gap-2" v-else>
      <RoutineItem v-for="item in dataList" :data="item"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ExerciseFilter } from '~/types/exercise';


const routinesStore = useRoutinesStore()
const {dataList, pending} = storeToRefs(routinesStore)
const equipmentStore = useEquipmentStore()
const musclesStore = useMusclesStore()
const exerciseTypeStore = useExerciseTypeStore()

const search = ref('')

const filtered = computed<ExerciseFilter>(() => {
  return {
    'equipmentFilter': equipmentStore.selectedItem,
    'muscleFilter': musclesStore.selectedItem,
    'exerciseTypeFilter': exerciseTypeStore.selectedItem,
    'searchFilter': search.value
  }
})



onMounted(async ()=>{
  await routinesStore.fetchTable()
})

definePageMeta({
  layout: 'routines'
})
</script>

<style>

</style>