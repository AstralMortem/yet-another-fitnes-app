<template>
  <div class="p-4 rounded-lg cursor-pointer hover:bg-slate-500"  :class="[selected?'bg-primary-500':'bg-slate-800']">
    <div class="flex flex-row gap-4 justify-center items-center" v-if="!selected" @click="showModal = true">
      <UIcon class="text-2xl" name="i-ph-barbell"/>    
      <p class="text-2xl">Equipment</p>
    </div>
    <div class="flex flex-row gap-4 justify-center items-center" v-else >
      <p class="text-2xl" @click="showModal = true">{{selected.title}}</p>
      <UButton icon="i-ph-x" variant="ghost" color="gray"  @click="model = -1; showModal = false"/>
    </div>
    <UModal v-model="showModal">
      <UILoader v-if="pending"/>
      <div class="flex flex-col gap-2 w-full p-4 overflow-y-auto" v-else>
        <EquipmentListItem  :equipment="{'id':-1,'title': 'All equipment'}" v-model="model"/>
        <EquipmentListItem v-for="e in equipmentList" :key="e.id" :equipment="e" v-model="model"/>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { Tables } from '~/types/supabase';
const equipmentStore = useEquipmentStore()
const {equipmentList, pending} = storeToRefs(equipmentStore)
const showModal = ref(false)
const model = defineModel({default:-1})
const selected = computed<Tables<'equipment'>>(()=>equipmentList.value.find(x=>x.id ===model.value))

watch(model,()=>{
  showModal.value = false
})



onMounted(async ()=>{
  await equipmentStore.fetchEquipment()
})

</script>

<style>

</style>