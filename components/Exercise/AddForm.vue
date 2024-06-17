<template>
  <USlideover v-model="model">
    <UCard class="flex flex-col flex-1 overflow-y-scroll">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <UButton icon="i-ph-x" variant="ghost" color="gray" @click="discard" />
          <p class="text-2xl">Add new Exercise</p>
        </div>
      </template>
      <div class="flex flex-col p-2 ">
        <UForm :state="state" class="space-y-4 h-full" ref="form" @submit="insertExercise" :schema="schema">
          <UFormGroup name="image">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-2 justify-center items-center" v-if="image">
                <img :src="preview" class="h-40 w-40 rounded-lg ">
                <UButton icon="i-ph-x" color="red" @click="image = undefined" variant="soft" />
              </div>
              <UInput type="file" icon="i-ph-image" accept="image/png, image/jpeg" @change="onFileChange" />
            </div>
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" />
          </UFormGroup>
          <UFormGroup label="Level" name="level">
            <USelectMenu :options="[...Array(5).keys()].map(x => x + 1)" v-model="state.level" />
          </UFormGroup>
          <UFormGroup label="Exercise type" name="type">
            <UIExerciseTypeSelector v-model="state.type" />
          </UFormGroup>
          <UFormGroup label="Equipment" name="equipments">
            <FilterMultiSelect v-model="state.equipments" :store="equipmentStore" />
          </UFormGroup>
          <UFormGroup label="Muscles" name="muscles">
            <ExerciseMuscleRelSelect v-model="state.muscles" />
          </UFormGroup>
          <UFormGroup label="Is public" name="is_public" v-if="isSuperUser">
            <UToggle v-model="state.is_public" />
          </UFormGroup>
          <UFormGroup label="Is active" name="is_active" v-if="isSuperUser">
            <UToggle v-model="state.is_active" />
          </UFormGroup>
        </UForm>
      </div>
      <template #footer>
        <div class="flex flex-row gap-2 justify-start items-center">
          <UButton label="Save" @click="form.submit()" />
          <UButton label="Discard" color="amber" @click="discard" />
        </div>
      </template>
    </UCard>
  </USlideover>

</template>

<script lang="ts" setup>
import { type TablesInsert } from '~/types/supabase';
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod';
import type { ExerciseInsert } from '~/types/exercise';

const profileStore = useProfileStore()
const { userProfile, isSuperUser } = storeToRefs(profileStore)

const supabase = useSupabaseApi()
const model = defineModel({ default: false })

const emit = defineEmits(['close'])


const state = ref<ExerciseInsert>({
  'level': 1,
  'is_active': true,
  'is_public': isSuperUser.value,
  title: '',
  type: 'strenght_weight',
})

const schema = z.object({
  title: z.string().min(3, 'Must be at least 3 characters'),
  level: z.number().min(1).max(5),
  equipments: z.array(z.number()),
  muscles: z.object({
    muscle_id: z.number(),
    procent: z.number().min(1)
  }).array()
})

type Schema = z.output<typeof schema>

const form = ref()

const image = ref<File | undefined>()
const preview = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value)
  }
})

function onFileChange(e: FileList) {
  image.value = e[0]
}

const uploadImage = async (file: File, isPublic: boolean = false) => {
  const folder = isPublic ? 'public' : `private/${userProfile.value.id}`
  const uploadData = new Date().valueOf().toString()
  const extension = file.name.split('.').pop()
  const fileName = `${folder}/${uploadData}.${extension}`
  const { data, error } = await supabase.storage.from('exercises').upload(fileName, file)
  if (error) {
    //@ts-ignore
    StorageErrorMessage(error)
    return null
  } else {
    return data.path
  }
}

const equipmentStore = useEquipmentStore()

const discard = () => {
  model.value = false
  image.value = undefined
  form.value.clear()
  emit('close')
}

const insertEquipments = async (equipmentArr: number[] | undefined, exerciseId: string) => {
  if (equipmentArr) {
    let insertValues: TablesInsert<'equipment_exercise'>[] = []
    equipmentArr.forEach((x, idx) => {
      insertValues.push({
        equipment_id: x,
        exercise_id: exerciseId
      })
    })
    const { data, error } = await supabase.from('equipment_exercise').insert(insertValues)
    if (error) {
      DBErrorMessage(error)
    }
  }

}

const insertMuscles = async (musclesArr: TablesInsert<'muscle_exercise'>[] | undefined, exerciseId: string) => {
  if (musclesArr) {
    musclesArr.forEach((x) =>{
      x.exercise_id = exerciseId
    })
    const { data, error } = await supabase.from('muscle_exercise').insert(musclesArr)
    if (error) {
      DBErrorMessage(error)
    }
  }
}

const insertExercise = async (event: FormSubmitEvent<Schema>) => {
  const formState = state.value
  if (image.value) {
    const imagePath = await uploadImage(image.value, state.value.is_public)
    if (imagePath) {
      formState.image = imagePath
    } else {
      return;
    }
  }

  const muscleArr = formState.muscles
  delete formState.muscles
  const equipmentArr = formState.equipments
  delete formState.equipments

  const { data, error } = await supabase.from('exercise').insert(formState).select('id,title').single()
  if (error) {
    DBErrorMessage(error)
  } else {
    SuccessMessage('Success', `Exercise ${data.title} successfuly created`)
    await insertEquipments(equipmentArr, data.id)
    await insertMuscles(muscleArr, data.id)
    discard()
  }
}


</script>

<style></style>