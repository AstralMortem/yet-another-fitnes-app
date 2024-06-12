<template>
  <div class="w-full h-full flex flex-col md:flex-row">
    <div class="bg-slate-800 md:w-1/2 justify-center items-center hidden md:flex">
      <IlustrationsSportRafic class="w-[600px] flex self-center"/>
    </div>
    <div class="bg-slate-900 md:w-1/2 w-full h-max md:h-full flex flex-col justify-around items-center ">
      <UILogo/>
      <div class="flex flex-col gap-10 justify-center items-center h-full">
        <IlustrationsSportRafic class="flex md:hidden w-[300px] h-auto"/>
        <div class="flex flex-col gap-10 justify-center items-center">
          <p class="text-4xl">Choose your training goal</p>
          <UITrainingAimSelector v-model="userTrainingAim"/>
        </div>
        
        <UButton 
        @click="signup" 
        :loading="pending"
        label="Sign Up" 
        size="xl" 
        :variant="!userTrainingAim?'outline':'solid'"  
        :disabled="!userTrainingAim" 
        class="rounded-full w-fit p-6" 
        icon="i-ph-sign-in" 
        :trailing="true"/>
      </div>
      <UIFooter>
        <a href="https://storyset.com/sport">Sport illustrations by Storyset</a>
      </UIFooter>
    </div>
  </div>
</template>

<script lang="ts" setup>
const signupStore = useSignupStore()
const {userTrainingAim, pending} = storeToRefs(signupStore)

const signup = async () => {
  await signupStore.signupUser()
}
</script>

<style>

</style>