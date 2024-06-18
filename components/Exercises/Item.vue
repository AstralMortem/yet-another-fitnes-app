<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ExerciseSelect } from '~/types/models'

defineProps({
  data: {
    type: {} as PropType<ExerciseSelect>,
    required: true,
  },
})
</script>

<template>
  <UIResponsiveCard class="w-full" @click="navigateTo(`/exercises/${data.id}`)">
    <UIImage :src="data?.image" />
  </UIResponsiveCard>
</template>

<style>

</style>
