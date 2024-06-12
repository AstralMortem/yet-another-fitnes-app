<template>
  <div class="flex flex-col justify-start items-center">
    <header class="flex flex-col justify-center items-center">
      <p class="text-lg font-bold">Welcome back</p>
      <p class="text-md">Please login to your account</p>
    </header>
    <main class="flex flex-col">
      <div class="flex flex-col justify-center items-center">
      <UForm :state="state" class="space-y-4">
        <UFormGroup name="email">
          <UInput v-model="state.email" placeholder="user@example.com" icon="i-ph-user"/>
        </UFormGroup>
        <UFormGroup name="password">
          <UInput v-model="state.password" placeholder="*********" type="password" icon="i-ph-lock"/>
        </UFormGroup>
      </UForm>
      <div class="flex flex-row">
        <UCheckbox label="Remember me"/>
        <ULink>Forget Password?</ULink>
      </div>
      <UButton label="Log in"/>
    </div>
    <UDivider label="OR"/>
    <div class="flex flex-col justify-center items-center">
      <UButton label="Sign in with Google" icon="i-ph-google-logo"/>
      <UButton label="Sign in with AppleID" icon="i-ph-apple-logo"/>
    </div>
    </main>
    <footer class="flex flex-col justify-center items-center">
      <p>YAFA 2024 | All Rights Reserved</p>
      <p class></p>
    </footer>
    
    
  </div>
</template>

<script lang="ts" setup>
const state = ref({
  email: undefined,
  password: undefined
})
</script>

<style>

</style>