<script lang="ts" setup>
import { ExercisesMuscleModal } from '#components'
import type { Tables } from '~/types/supabase'

const modal = ref(false)
const selected = ref<Tables<'muscle_exercise'>[]>([])
const muscleStore = useMusclesStore()
const model = defineModel<Tables<'muscle_exercise'>[]>([])

watch(selected,()=>{
  model.value = selected.value
})
</script>

<template>
  <UButton block variant="outline" @click="modal = true">
    <span v-if="selected.length" class="flex flex-row gap-1 truncate">
      <UBadge v-for="s in selected" :key="s.muscle_id" :label="muscleStore.dataList.find(x => x.id === s.muscle_id)?.title" />
    </span>
    <span v-else>Select</span>
  </UButton>
  <ExercisesMuscleModal v-model:show="modal" v-model="selected" />
</template>

<style>

</style>
