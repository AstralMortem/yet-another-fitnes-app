<template>
  <div class="flex flex-col w-full h-full gap-6">
    <div class="flex flex-row gap-6">
      <EquipmentSelect v-model="equipment" />
    </div>
    <div class="flex flex-col w-full h-full overflow-y-auto">
      <UILoader v-if="pending"/>
      <ExerciseListItem v-for="exercise in exerciseList" :exercise="exercise" :key="exercise.id" v-else/>
      <p v-if="!hasMore">End</p>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
const exerciseStore = useExerciseStore()
const {page,exerciseList, hasMore, pending} = storeToRefs(exerciseStore)

const equipment = ref(-1)

await useAsyncData('exercise', () => {
  if(hasMore){
    exerciseStore.fetchExercise()
  }
}, {watch:[page]})

const handleScroll = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  if (window.scrollY >= scrollableHeight - 100) {
    page.value += 1
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(()=>{
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style>

</style>