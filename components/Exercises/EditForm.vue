<script lang="ts" setup>
import { z } from 'zod'
import type { ExerciseSelect, ExerciseUpdate } from '~/types/models'
import type { TablesUpdate } from '~/types/supabase'
const equipmentStore = useEquipmentsStore()
const { dataList: equipments, pending: equipmentsPending } = storeToRefs(equipmentStore)
const exercisesTypeStore = useExercisesTypeStore()
const { dataList: exercisesTypes } = storeToRefs(exercisesTypeStore)
const { isSuperUser } = storeToRefs(useUserProfileStore())

const emit = defineEmits(['discard', 'success'])
const props = defineProps(['value'])
const form = ref()
const state = ref<ExerciseUpdate>(props.value)
const image = ref()
const preview = computed(() => image.value ? URL.createObjectURL(image.value) : undefined)


const schema = z.object({
  title: z.string().min(3, 'Must be at least 3 characters'),
  level: z.number().min(1).max(5),
  equipments: z.array(z.number()).min(1),
  muscles: z.array(z.any()).min(1),
})

type Schema = z.output<typeof schema>

function discard() {
  image.value = undefined
  form.value.clear()
  emit('discard')
}

</script>

<template>
  <USlideover prevent-close>
    <UCard class="overflow-y-auto">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <UButton icon="i-ph-x" variant="ghost" color="gray" @click="discard" />
          <UIP>Add new exercise</UIP>
        </div>
      </template>
      <div class="h-full flex-1">
        <UForm ref="form" :state="state" class="space-y-4 h-full" :schema="schema">
          <UFormGroup name="image">
            <div class="flex flex-col gap-2">
              <div v-if="image" class="flex flex-row gap-2 justify-center items-center">
                <img :src="preview" class="h-40 w-40 rounded-lg ">
                <UButton icon="i-ph-x" color="red" variant="soft" @click="image = undefined" />
              </div>
              <UInput type="file" icon="i-ph-image" accept="image/png, image/jpeg" @change="image = $event[0]" />
            </div>
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" />
          </UFormGroup>
          <UFormGroup label="Level" name="level">
            <USelectMenu v-model.number="state.level" :options="[...Array(5).keys()].map(x => (x + 1).toString())" />
          </UFormGroup>
          <UFormGroup label="Exercise type" name="type">
            <USelectMenu v-model="state.type" :options="exercisesTypes.slice(1)" option-attribute="title" value-attribute="label" />
          </UFormGroup>
          <UFormGroup label="Equipment" name="equipments">
            <USelectMenu v-model="state.equipments" :options="equipments.slice(1)" multiple option-attribute="title" value-attribute="id" searchable :loading="equipmentsPending">
              <template #label>
                <div v-if="state.equipments && state.equipments.length" class="flex flex-row gap-1.5 w-full truncat">
                  <UBadge
                    v-for="id in state.equipments"
                    :key="id"
                    :label="equipments.find(x => x.id === id)?.title"
                  />
                </div>
                <span v-else>Select Equipment</span>
              </template>
            </USelectMenu>
          </UFormGroup>
          <UFormGroup label="Muscles" name="muscles">
            <ExercisesMuscleSelect v-model="state.muscles" />
          </UFormGroup>
          <UFormGroup v-if="isSuperUser" label="Is public" name="is_public">
            <UToggle v-model="state.is_public" />
          </UFormGroup>
          <UFormGroup v-if="isSuperUser" label="Is active" name="is_active">
            <UToggle v-model="state.is_active" />
          </UFormGroup>
        </UForm>
      </div>
      <template #footer>
        <div class="flex flex-row justify-start gap-4 items-center">
          <UButton icon="i-ph-disc" color="green" label="Save" @click="form.submit()" />
          <UButton icon="i-ph-arrow-u-up-left" color="amber" label="Discard" @click="discard" />
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<style>

</style>
