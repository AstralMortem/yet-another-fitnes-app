<script lang="ts" setup>
import { vInfiniteScroll } from '@vueuse/components'
import type { IFetchFilter } from '~/types/filters'

const equipmentStore = useEquipmentsStore()
const musclesStore = useMusclesStore()
const exercisesTypeStore = useExercisesTypeStore()
const exercisesStore = useExercisesStore()
const { dataList: exercises, pending, page, search } = storeToRefs(exercisesStore)

watch(search, async () => {
  await exercisesStore.fetchTable(true, true)
})

function onLoadMore() {
  page.value++
}

onMounted(async () => {
  await exercisesStore.fetchTable()
})
</script>

<template>
  <div class="flex w-full flex-col justify-start items-start">
    <div class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center w-full">
      <div class="flex flex-row justify-evenly items-center gap-2 ">
        <FilterStore :store="equipmentStore" title="Equipments" />
        <FilterStore :store="musclesStore" title="Muscles" />
        <FilterStore :store="exercisesTypeStore" title="Types" />
      </div>
      <div class="flex flex-row justify-evenly items-center gap-2">
        <UButton icon="i-ph-plus" />
        <UInput v-model="search" class="lg:min-w-[400px]" :ui="{ base: 'md:h-14' }" />
      </div>
    </div>
    <div v-infinite-scroll="onLoadMore" class="flex flex-col w-full h-full justify-start items-start overflow-y-auto p-1">
      <UILoader v-if="pending" />
      <div v-for="data in exercises" :key="data.id">
        <UIP>{{ data }}</UIP>
      </div>
    </div>
  </div>
</template>

<style>

</style>
