<script lang="ts" setup>
const props = defineProps({
  tableName: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    defaul: 'Record',
  },
  photoPath: {
    type: [String, Array<string>],
  },
  bucket: {
    type: String,
  },
})
const emit = defineEmits(['success', 'close'])

async function deleteRecord() {
  try {
    const data = await supabaseDelete(props.tableName, [{ column: 'id', op: 'eq', value: props.id }])
    if (props.photoPath && props.bucket) {
      await supabaseDeletePhoto(props.bucket, props.photoPath)
    }
    emit('success', data)
  }
  catch (error) {
    emit('close', error)
  }
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="flex flex-row justify-start items-center gap-4">
        <UIcon name="i-ph-warning-circle" class="text-9xl text-red-500" />
        <div class="flex flex-col justify-start items-start">
          <p class="text-4xl text-red-500">
            Are you shure?
          </p>
          <p class="text-xl text-slate-500">
            Are you shure you want delete <span class="font-bold text-red-500">{{ $props.title }}</span> from <span class="font-bold text-red-500">{{ $props.tableName }}</span>
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex flex-row justify-start items-center gap-2">
          <UButton label="Delete" icon="i-ph-trash" color="red" @click="deleteRecord" />
          <UButton label="Discard" icon="i-ph-arrow-bend-up-left" color="amber" @click="$emit('close')" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style>

</style>
