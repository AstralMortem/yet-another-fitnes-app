<template>
  <UModal>
    <UCard>
      <div class="flex flex-row justify-start items-center gap-4">
        <UIcon name="i-ph-warning-circle" class="text-9xl text-red-500"/>
        <div class="flex flex-col justify-start items-start">
          <p class="text-4xl text-red-500">Are you shure?</p>
          <p class="text-xl text-slate-500">Are you shure you want delete <span class="font-bold text-red-500">{{ $props.title }}</span> from <span class="font-bold text-red-500">{{ $props.tableName }}</span></p>
        </div>
      </div>
      <template #footer>
        <div class="flex flex-row justify-start items-center gap-2">
          <UButton label="Delete" icon="i-ph-trash" @click="deleteRecord" color="red"/>
          <UButton label="Discard" icon="i-ph-arrow-bend-up-left" @click="$emit('close')" color="amber"/>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import type { PublicSchema } from '~/types/supabase';
const supabase = useSupabaseApi()
const props = defineProps({
  tableName: {
    type: String,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  },
  title:{
    type: String,
    defaul: 'Record'
  },
  photoPath:{
    type: [String, Array<string>]
  },
  bucket:{
    type: String
  }
})

const emit = defineEmits(['success', 'close'])

const deletePhoto = async () =>{
  if(props.bucket && props.photoPath){
    const {data,error} = await supabase.storage.from(props.bucket).remove(typeof props.photoPath == 'string'?[props.photoPath]:props.photoPath)
    if(error){
      StorageErrorMessage(error)
    }
  }
  
}

const deleteRecord = async () =>{
  
  const {data,error} = await supabase.from(props.tableName).delete().eq('id',props.id)
  if(error){
    DBErrorMessage(error)
    emit('close')
  }else{
    await deletePhoto()
    SuccessMessage('Deleted', `Record ${props.title} successfuly deleted from ${props.tableName}`)
    emit('success')
  }
}


</script>

<style>

</style>