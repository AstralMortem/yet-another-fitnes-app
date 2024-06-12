<template>
  <div class="w-full h-full flex flex-col md:flex-row">
    <div class="bg-slate-800 md:w-1/2 justify-center items-center hidden md:flex">
      <IlustrationsCredentials class="w-[600px] flex self-center"/>
    </div>
    <div class="bg-slate-900 md:w-1/2 w-full h-max md:h-full flex flex-col justify-around items-center ">
      <UILogo/>
      <main class="flex flex-col gap-6">
        <div class="flex flex-col justify-center items-center space-y-6">
          <UForm :state="state" :schema="schema" class="space-y-6 min-w-[300px]" ref="form" @submit="signup">
            <UFormGroup name="email" size="xl">
              <UInput v-model="state.email" placeholder="user@example.com" icon="i-ph-user" />
            </UFormGroup>
            <UFormGroup name="password" size="xl">
              <UInput v-model="state.password" placeholder="*********" type="password" icon="i-ph-lock" />
            </UFormGroup>
          </UForm>
          <UButton label="Sign Up" block size="xl" @click="form.submit()"/>
          
        </div>
        <UDivider label="OR" />
        <div class="flex flex-col justify-center items-center gap-4">
          <UButton label="Sign Up with Google" icon="i-ph-google-logo" block variant="outline" size="xl" />
          <UButton label="Sign Up with AppleID" icon="i-ph-apple-logo" block variant="outline" size="xl" />
          <div>
            <p>Already have account?  <ULink class="text-primary hover:underline" to="/login">Log In</ULink></p>
          </div>
        </div>
      </main>
      <UIFooter>
        <a href="https://storyset.com/user">User illustrations by Storyset</a>
      </UIFooter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const {userEmail, userPassword} = storeToRefs(useSignupStore())

const form = ref()
const state = ref({
  email: "",
  password: ""
})

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters")
})

type Schema = z.output<typeof schema>

const signup = async (e:FormSubmitEvent<Schema>) => {
  const supabase = useSupabaseApi()
  const {count} = await supabase.from('profile').select('email',{count:'exact'}).eq('email', e.data.email)
  if(count && count >= 1){
    form.value.setErrors([{
      message: `User with ${e.data.email} email aleready exist`,
      path: 'email'
    }])
  }else{
    userEmail.value = e.data.email
    userPassword.value = e.data.password
    navigateTo('/signup/name')
  }
}

</script>

<style>

</style>