<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import type { TablesInsert } from '~/types/supabase'

const musclesStore = useMusclesStore()
const { dataList, pending } = storeToRefs(musclesStore)
const state = ref<TablesInsert<'muscle_exercise'>[]>([])
function calcProgress(value: number, idx: number) {
  let allValue = 0
  state.value.forEach((x) => {
    if (x.procent && x.procent > 0) {
      allValue += x.procent
    }
  })
  if ((allValue + value) > 100) {
    state.value[idx].procent = 100 - allValue
  }
  else {
    state.value[idx].procent = value
  }
}

const model = defineModel()
const show = defineModel('show', { default: false })

const debounceCalcProgress = useDebounceFn((value: number, idx: number) => calcProgress(value, idx), 300)

watch(state, () => {
  const values = state.value.filter(x => x.procent && x.procent > 0)
  model.value = values
}, { deep: true })

onMounted(async () => {
  if (!dataList.value.length) {
    await musclesStore.fetchTable()
  }

  state.value = dataList.value.slice(1).map((x) => {
    return {
      muscle_id: x.id,
      procent: 0,
      type: 'main',
    } as TablesInsert<'muscle_exercise'>
  })
})
</script>

<template>
  <UModal v-model="show">
    <UILoader v-if="pending" />
    <div v-else class="flex flex-col justify-start items-center gap-2 p-2 w-full">
      <UIResponsiveCard v-for="(data, idx) in dataList.slice(1)" :key="data.id" class="flex flex-row justify-between items-center w-full" :bg-color="state[idx].muscle_id === data.id && state[idx].procent ? 'primary' : 'slate'">
        <div class="flex flex-row gap-2 justify-start items-start w-full h-full">
          <UIImage :src="data.image" />
          <UIP>{{ data.title }}</UIP>
        </div>
        <div class="flex flex-row gap-2 justify-end items-start w-full">
          <USelectMenu v-model="state[idx].type" :options="['main', 'secondary']" />
          <UIRoundedProgress :model-value="state[idx].procent" :editable="true" @update:model-value="debounceCalcProgress($event, idx)" />
        </div>
      </UIResponsiveCard>
    </div>
  </UModal>
</template>

<style>

</style>
