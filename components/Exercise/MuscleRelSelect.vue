<template>
  <div class="w-full">
    <p v-if="pending">Loading...</p>
    <div class="flex flex-row w-full rounded-md gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 cursor-pointer" 
    v-else @click="showModal = true">
      <UBadge v-if="model.length" v-for="val in model" :label="getTitle(val.muscle_id)" />
      <p v-else>Select Muscles...</p>

      <UModal v-model="showModal">
        <div class="flex flex-col gap-4 w-full p-4">
          <div
              class="flex flex-row p-2 rounded-lg items-center w-full justify-between"
              v-for="(data, idx) in dataList"
              :class="[state[idx].muscle_id == data.id && state[idx].procent > 0 ? 'bg-primary-400 bg-opacity-50' : 'bg-slate-800']">
            <p class="text-xl md:text-2x w-max">{{ data.title }}</p>
            <div class="flex flex-col gap-1">
              <p class="text-sm">Muscle type</p>
              <USelect :options="['main', 'secondary']" v-model="state[idx].type" class="w-max"/>
            </div>
            <div class="flex flex-col gap-1 justify-start items-center">
              <p class="text-sm">Procent</p>
              <div class="flex flex-row gap-1 justify-start items-center">
                <UIRoundedProgress :model-value="state[idx].procent" @update:model-value="debounceCalcProgress($event,idx)" :editable="true"/>
              </div>             
            </div>
          </div>
        </div>
      </UModal>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { type TablesInsert } from '~/types/supabase';
import { useDebounceFn } from '@vueuse/core'


const showModal = ref(false)
const muscleStore = useMusclesStore()
const { dataList, pending } = storeToRefs(muscleStore)
const model = defineModel<TablesInsert<'muscle_excercise'>[]>({default:[]})



const state = ref<TablesInsert<'muscle_excercise'>[]>([])


const getTitle = (muscle_id: number) => dataList.value.find(x => x.id == muscle_id)?.title

const calcProgress = (value: number, idx: number) =>{
  let allValue = 0
  state.value.forEach(x =>{
    if(x.procent && x.procent > 0){
      allValue += x.procent
    }
  })
  if((allValue + value) > 100){
    state.value[idx].procent = 100 - allValue
  }else{
    state.value[idx].procent = value
  }
}  

const debounceCalcProgress = useDebounceFn((value: number, idx: number)=>calcProgress(value, idx),300)

watch(state, ()=>{
  const values = state.value.filter((x) => x.procent && x.procent > 0)
  model.value = values
},{deep:true})


onMounted(async () => {
  await muscleStore.fetchTable()
  state.value = dataList.value.map((x, idx) => {
  return {
    'muscle_id': x.id,
    'procent': 0,
    'type': 'main'
  } as TablesInsert<'muscle_excercise'>})
})

</script>

<style></style>