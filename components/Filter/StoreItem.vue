<script lang="ts" setup>
import type { IStoreFilter } from '~/types/filters'

const props = defineProps({
  items: {
    type: Array<IStoreFilter>,
    required: true,
  },
  currentItem: {
    type: {} as PropType<IStoreFilter> | undefined,
    default: {} as IStoreFilter,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'selected'])
function select(data: IStoreFilter) {
  emit('selected', data)
}
</script>

<template>
  <UModal>
    <div class="flex flex-col w-full h-full gap-2 p-1 overflow-y-auto">
      <UIResponsiveCard v-for="data in items" :key="data.id" @click="select(data)" :bg-color="currentItem.id == data.id?'primary':'slate'">
        <div class="flex flex-row justify-start items-center gap-2 w-full">
          <UIImage v-if="data.image" :src="data.image" :bucket="data.imageBucket" />
          <UIcon v-if="data.icon" :name="data.icon" />
          <UIP>{{ data.title }}</UIP>
        </div>
        <UIP>
          <UIcon v-if="currentItem.id === data.id" name="i-ph-check-circle-fill" />
        </UIP>
      </UIResponsiveCard>
    </div>
  </UModal>
</template>

<style></style>
