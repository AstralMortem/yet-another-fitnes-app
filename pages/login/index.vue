<template>
  <div class="flex flex-col md:flex-row w-full h-full">
    <div class="flex flex-col items-center justify-around w-full md:w-1/2 h-full bg-slate-900">
      
      <UILogo/>
      <main class="flex flex-col gap-6">
        <div class="flex flex-col justify-center items-center space-y-6">
          <UForm :state="state" :schema="schema" class="space-y-6 min-w-[300px]" ref="form" @submit="login">
            <UFormGroup name="email" size="xl">
              <UInput v-model="state.email" placeholder="user@example.com" icon="i-ph-user" />
            </UFormGroup>
            <UFormGroup name="password" size="xl">
              <UInput v-model="state.password" placeholder="*********" type="password" icon="i-ph-lock" />
            </UFormGroup>
          </UForm>
          <div class="flex flex-row justify-between items-center w-full">
            <UCheckbox label="Remember me" :ui="{label:'text-md'}"/>
            <ULink class="text-slate-500 font-bold hover:underline">Forgot Password?</ULink>
          </div>
          <UButton label="Log in" block size="xl" @click="form.submit()" :loading="pending"/>
        </div>
        <UDivider label="OR" />
        <div class="flex flex-col justify-center items-center gap-4">
          <UButton label="Sign in with Google" icon="i-ph-google-logo" block variant="outline" size="xl" />
          <UButton label="Sign in with AppleID" icon="i-ph-apple-logo" block variant="outline" size="xl" />
          <div>
            <p>Do not have account?  <ULink class="text-primary hover:underline" to="/signup">Sign Up</ULink></p>
          </div>
        </div>
      </main>
      <UIFooter/>
    </div>
    <div class="w-1/2 h-full bg-slate-800 hidden md:block">
      <UILoginIlustrations/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {z} from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'
const profileStore = useProfileStore()
const {pending} = storeToRefs(profileStore)

const state = ref({
  email: "",
  password: ""
})

const form = ref()



const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters")
})

type Schema = z.output<typeof schema>

const login = async (e:FormSubmitEvent<Schema>) => {
  const error = await profileStore.loginUser(e.data.email, e.data.password)
  if(error){
    form.value.clear()
    form.value.setErrors([{
      message: error.message,
      path: 'email'
    }])
  }else{
    navigateTo('/')
  }
}

definePageMeta({
  layout: 'auth'
})

</script>

<style></style>