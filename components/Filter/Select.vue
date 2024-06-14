<template>
  <div>

    <div class="flex flex-row justify-between items-center p-4 rounded-lg  hover:bg-opacity-50 w-full cursor-pointer"
      :class="[props.store.selectedItem ? 'bg-primary-500' : 'bg-slate-800']">
      <div class="flex flex-row gap-4 justify-between items-center w-full h-full" v-if="props.store.selectedItem">
        <UButton variant="ghost" icon="i-ph-x" color="gray" @click="selected = undefined" />
        <div class="flex flex-1 w-full h-full" @click="showModal = true">
          <p class="text-2xl" >{{ props.store.selectedItem.title}}</p>
        </div> 
      </div>
      <div class="flex flex-row gap-4 justify-between items-center w-full h-full" @click="showModal = true" v-else>
        <UIcon class="text-2xl" :name="$props.icon"/>
        <p class="text-2xl">{{ $props.title }}</p>
      </div>
    </div>


    <UModal v-model="showModal">
      <UILoader v-if="pending" />
      <div class="flex flex-col gap-4 w-full justify-center items-center p-4" v-else>
        <FilterItem v-model="selected" :data="{ id: -1, title: `All ${$props.title}`, image: null }"
          @close="showModal = false" />
        <FilterItem v-model="selected" :data="filter" v-for="filter in dataList" @close="showModal = false" />
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
  store: {
    type: {} as PropType<Store>,
    required: true
  },
  storeFetcher: {
    type: Function,
    required: true
  }
})


const showModal = ref(false)

const { dataList, pending, selected } = storeToRefs(props.store)


onMounted(async () => {
  await props.storeFetcher()
})


</script>

<style></style>