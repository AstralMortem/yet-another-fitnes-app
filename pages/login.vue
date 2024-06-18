<template>
  <div>
    <UForm :state="state" ref="form" @submit="login">
      <UFormGroup>
        <UInput v-model="state.email"/>
      </UFormGroup>
      <UFormGroup>
        <UInput v-model="state.password"/>
      </UFormGroup>
    </UForm>
    <UButton @click="form.submit()" label="login"/>
  </div>
</template>

<script lang="ts" setup>
const supabase = useSupabaseApi()


const login = async () =>{
  const {error} = await supabase.auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password
  })
  if(error){
    console.log(error)
  }else{
    navigateTo('/')
  }
}

const form = ref()

const state = ref({
  email:undefined,
  password: undefined
})
</script>

<style>

</style>