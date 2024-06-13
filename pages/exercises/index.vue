<template>
  <div class="flex flex-col w-full h-full gap-6">
    <div class="flex flex-row gap-6">
      <FilterSelect v-model="equipment" :store="equipmentStore" :store-fetcher="equipmentStore.fetchTable" title="Equipment" icon="i-ph-barbell" />
      <FilterSelect v-model="muscles" :store="musclesStore" :store-fetcher="musclesStore.fetchTable" title="Muscles" icon="i-ph-smiley" />
    </div>
    <!-- <div class="flex flex-col w-full h-full overflow-y-auto">
      <UILoader v-if="pending"/>
      <ExerciseListItem v-for="exercise in exerciseList" :exercise="exercise" :key="exercise.id" v-else/>
      <p v-if="!hasMore">End</p>
    </div> -->
  </div>
  
</template>

<script lang="ts" setup>
import { type Tables } from '~/types/supabase';

// const exerciseStore = useExerciseStore()
// const {page,exerciseList, hasMore, pending} = storeToRefs(exerciseStore)

const equipmentStore = useEquipmentStore()
const musclesStore = useMusclesStore()


const equipment = ref<Tables<'equipment'> | undefined>(equipmentStore.selectedItem)
const muscles = ref<Tables<'muscles'>| undefined>(musclesStore.selectedItem)

// await useAsyncData('exercise', () => {
//   if(hasMore){
//     exerciseStore.fetchExercise()
//   }
// }, {watch:[page]})

// const handleScroll = () => {
//   const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
//   if (window.scrollY >= scrollableHeight - 100) {
//     page.value += 1
//   }
// }

// onMounted(() => {
//   window.addEventListener('scroll', handleScroll)
// })

// onUnmounted(()=>{
//   window.removeEventListener('scroll', handleScroll)
// })

</script>

<style>

</style>