<script lang="ts" setup>
import type { Store } from 'pinia'
import { FilterStoreItem } from '#components'

import type { StoreID } from '~/types/store'

const props = defineProps({
  store: {
    type: {} as PropType<Store<StoreID>>,
    required: true,
  },
  title: {
    type: String,
    default: 'Record',
    required: true,
  },
  icon: {
    type: String,
    default: 'i-ph-record',
    required: true,
  },
})

const modal = useModal()

const { dataList, pending, getSelectedItem, currentID } = storeToRefs(props.store)

function showFilterModal() {
  modal.open(FilterStoreItem, {
    items: dataList.value,
    currentItem: getSelectedItem.value,
    onSelected(data: any) {
      modal.close()
      currentID.value = data.id
    },
  })
}

onMounted(async () => {
  if (!dataList.length) {
    await props.store.fetchTable()
  }
})
</script>

<template>
  <div>
    <SkeletonResponsiveCard v-if="pending" />
    <UIResponsiveCard v-else class="w-fit" :bg-color="currentID !== -1 ? 'primary' : 'slate'">
      <div v-if="getSelectedItem && currentID !== -1" class="flex flex-row justify-between items-center gap-2 w-full">
        <UButton icon="i-ph-x" @click="currentID = -1" />
        <UIP class="flex-1 truncate w-fit" @click="showFilterModal">
          {{ getSelectedItem.title }}
        </UIP>
      </div>
      <div v-else class="flex flex-row justify-between items-center gap-2 w-full" @click="showFilterModal">
        <UIP><UIcon :name="$props.icon" /></UIP>
        <UIP>{{ $props.title }}</UIP>
      </div>
    </UIResponsiveCard>
  </div>
</template>

<style></style>
