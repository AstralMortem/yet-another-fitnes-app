<template>
  <UCard>
    <template #header>
      <p class="text-lg">{{ $props.title }}</p>
    </template>
    <div class="flex flex-col space-y-4">
      <div>
        <slot name="ilustration"/>
      </div>
      <UForm :state="$props.state">
        <UFormGroup v-for="field in $props.fields" :label="field.label">
          <UInput v-model="field.model" :placeholder="field.placeholder"/>
        </UFormGroup>
      </UForm>
    </div>
    <template #footer>
      <UButton label="Next" block/>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type {SignupField} from "~/types/signup"


const props = defineProps({
  title:String,
  fields: Array<SignupField>,
  state: {} as PropType<Ref>,
  nextPath: String
})

const 


</script>

<style>

</style>