<template>
  <div>
    <div class="flex flex-row justify-between items-center p-4 rounded-lg  hover:bg-opacity-50 w-full" :class="[selected?'bg-primary-500':'bg-slate-800']">
      <div class="flex flex-row gap-4 justify-between items-center w-full h-full" >
        <UButton variant="ghost" icon="i-ph-x" v-if="selected" color="gray" @click="model=-1; showModal = false"/>
        <UIcon class="text-2xl" :name="$props.icon" v-else @click="showModal = true"/>
        <p class="text-2xl" @click="showModal = true">{{ selected?selected.title:$props.title }}</p>
      </div>
    </div>
    <UModal v-model="showModal">
      <UILoader v-if="$props.pending"/>
      <div class="flex flex-col gap-4 w-full justify-center items-center p-4" v-else>
        <FilterItem v-model="model" :data="{id:-1,title: `All ${$props.title}`, image: null }" @close="showModal = false"/>
        <FilterItem v-model="model" :data="filter" v-for="filter in dataList" @close="showModal = false"/>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { Store } from 'pinia';


const props = defineProps({
  title: String,
  icon: {
    type: String,
    required: true
  },
  store:{
    type: {} as PropType<Store>,
    required: true
  },
  storeFetcher: {
    type: Function,
    required: true
  }

})

const model = defineModel({default: -1})
const showModal = ref(false)

const {dataList,pending} = storeToRefs(props.store)
const selected = computed(()=> dataList.value.find(x => x.id == model.value))

onMounted(async ()=>{
  await props.storeFetcher()
})


</script>

<style>

</style>