<template>
  <div class="flex flex-col w-full h-full gap-6">
    <div class="flex flex-col-reverse gap-6 lg:gap-0 lg:flex-row justify-between items-center">
      <div class="flex flex-row gap-6 lg:justify-start items-center justify-between w-full">
        <FilterSelect :store="equipmentStore" :store-fetcher="equipmentStore.fetchTable" title="Equipment"
          icon="i-ph-barbell" />
        <FilterSelect :store="musclesStore" :store-fetcher="musclesStore.fetchTable" title="Muscles"
          icon="i-ph-smiley" />
        <FilterSelect :store="exerciseTypeStore" :store-fetcher="exerciseTypeStore.fetchTable" title="Type"
          icon="i-ph-person-simple-run" />
      </div>
      <div class="flex flex-row gap-4 lg:justify-end items-center w-full">
        <UButton icon="i-ph-plus" label="Add exercise" size="xl" />
        <UInput v-model="search" placeholder="Search exercise" size="xl" icon="i-ph-magnifying-glass" class="w-full lg:w-[400px]"
          :ui="{
            size: {
              xl: 'lg:text-xl lg:h-16'
            }
          }" />
        <!-- <UButton icon="i-ph-star" size="xl" variant="soft"/> deprecated-->
      </div>
    </div>

    <div class="flex flex-col gap-2 w-full overflow-y-auto flex-1">

      <ExerciseItem :data="exercise" v-for="exercise in dataList" />
      <ExerciseNoItem v-if="reachedEnd" />
      <UILoader v-if="pending && !reachedEnd" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { type ExerciseFilter } from '~/types/exercise';

const exerciseStore = useExerciseStore()
const { dataList, pending, reachedEnd } = storeToRefs(exerciseStore)

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





watch([
  storeToRefs(equipmentStore).selectedItem,
  storeToRefs(musclesStore).selectedItem,
  storeToRefs(exerciseTypeStore).selectedItem,
  search
], async () => {

  await exerciseStore.fetchTable(filtered.value, true)
})

const handleScroll = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  if (window.scrollY >= scrollableHeight - 100) {
    exerciseStore.fetchTable(filtered.value)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  exerciseStore.fetchTable()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style></style>