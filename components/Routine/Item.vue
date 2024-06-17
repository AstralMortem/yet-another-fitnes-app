<template>
  <div class="w-full p-4 flex flex-col justify-start items-start bg-slate-800 hover:bg-opacity-50 rounded-xl cursor-pointer gap-4">
    <div class="flex flex-row justify-between items-center">
      <p class="text-4xl">{{ $props.data.title }}</p>
    </div>
    <UCarousel :items="muscles" v-slot="{item}" :ui="{container: 'gap-6 p-1'}">
      <div class="flex flex-col justify-center items-center gap-2">
        <p class="text-xl">{{ item.title }}</p>
        <UIImage :src="item.image" :width="60" :height="60"/>
      </div>
    </UCarousel>
    <UCarousel :items="$props.data.exercise" v-slot="{item}" :ui="{container: 'gap-6 p-1'}">
      <UTooltip :text="item.title" class="flex flex-col justify-center items-center gap-2" @click="navigateTo(`/exercises/${item.id}`)">
        <UIImage :src="item.image" :width="60" :height="60"/>
      </UTooltip>
    </UCarousel>
  </div>
</template>

<script lang="ts" setup>
import type { RoutineSelect } from '~/types/routines';

const muscleStore = useMusclesStore()
const {dataList: muscleList} = storeToRefs(muscleStore)

const muscles = computed(()=>{
  
  const val = Array.from(new Set(props.data.exercise.map(x => x.muscles.map(y => y.id)).flat()))
  const muscleVal = muscleList.value.filter(x => x.id == val.find(y => y == x.id))
  return muscleVal
})

const props = defineProps({
  data: {
    type: {} as PropType<RoutineSelect>,
    required: true
  }
})

onMounted(async ()=>{
  await muscleStore.fetchTable()
})


</script>

<style></style>