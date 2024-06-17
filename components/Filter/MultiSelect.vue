<template>
  <USelectMenu 
  multiple
  searchable
  v-model="model"
  :options="dataList"
  :loading="pending"
  :value-attribute="$props.storeValueAttribute"
  :option-attribute="$props.storeOptionAttribute">
  <template #label>
    <div class="flex flex-row gap-1 w-full truncat">
      <UBadge v-if="model.length" v-for="id in model" :label="dataList.find(x => x.id == id).title"/>
      <span v-else>Select</span>
    </div>
  </template>

  </USelectMenu>
</template>

<script lang="ts" setup>
import type { Store } from 'pinia';

const model = defineModel({default:[]})

const props = defineProps({
  store: {
    type: {} as PropType<Store>,
    required: true
  },
  storeValueAttribute:{
    type: String,
    default: 'id'
  },
  storeOptionAttribute:{
    type: String,
    default: "title"
  },
})
// @ts-ignore
const {dataList, pending} = storeToRefs(props.store)

onMounted(async ()=>{
  // @ts-ignore
  await props.store.fetchTable()
})

</script>

<style>

</style>