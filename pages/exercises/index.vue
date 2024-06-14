<template>
  <div class="flex flex-col w-full h-full gap-6">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row gap-6">
      <FilterSelect v-model="equipment" :store="equipmentStore" :store-fetcher="equipmentStore.fetchTable" title="Equipment" icon="i-ph-barbell" />
      <FilterSelect v-model="muscles" :store="musclesStore" :store-fetcher="musclesStore.fetchTable" title="Muscles" icon="i-ph-smiley" />
      <FilterSelect v-model="exerciseType" :store="exerciseTypeStore" :store-fetcher="exerciseTypeStore.fetchTable" title="Type" icon="i-ph-person-simple-run" />
    </div>
    <div class="flex flex-row gap-4 justify-center items-center">
      <UInput v-model="search" placeholder="Search exercise" size="xl" icon="i-ph-magnifying-glass" class="w-[400px]" :ui="{
        size:{
          xl: 'text-xl h-16'
        }
      }"/>
      <UButton icon="i-ph-star" size="xl" variant="soft"/>
    </div>
    </div>
    
    <div class="flex flex-col gap-2 w-full h-full overflow-y-auto flex-1">
      
      <ExerciseItem :data="exercise" v-for="exercise in dataList"/>
      <UILoader v-if="pending && !reachedEnd"/>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { type EnumObject } from '~/types/filter';
import { type Tables } from '~/types/supabase';

const exerciseStore = useExerciseStore()
const {dataList, pending, reachedEnd} = storeToRefs(exerciseStore)

const equipmentStore = useEquipmentStore()
const musclesStore = useMusclesStore()
const exerciseTypeStore = useExerciseTypeStore()


const equipment = ref<Tables<'equipment'> | undefined>(equipmentStore.selectedItem)
const muscles = ref<Tables<'muscles'>| undefined>(musclesStore.selectedItem)
const exerciseType =ref<EnumObject| undefined>(exerciseTypeStore.selectedItem)
const search = ref('')


const handleScroll = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  if (window.scrollY >= scrollableHeight - 100) {
    exerciseStore.fetchTable()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  exerciseStore.fetchTable()
})

onUnmounted(()=>{
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style>

</style>