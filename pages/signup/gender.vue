<template>
  <div class="w-full h-full flex flex-col md:flex-row">
    <div class="bg-slate-800 md:w-1/2 justify-center items-center hidden md:flex">
      <IlustrationsGender class="w-[600px] flex self-center"/>
    </div>
    <div class="bg-slate-900 md:w-1/2 w-full h-max md:h-full flex flex-col justify-around items-center ">
      <UILogo/>
      <div class="flex flex-col gap-10 justify-center items-center h-full">
        <IlustrationsGender class="flex md:hidden w-[300px] h-auto"/>
        <p class="text-4xl">Choose your gender?</p>
        <UIGenderSelector v-model="userGender"/>
        <UButton @click="nextPage" label="Next" size="xl" :variant="!userGender?'outline':'solid'"  :disabled="!userGender" class="rounded-full w-fit p-6" icon="i-ph-caret-circle-double-right" :trailing="true"/>
      </div>
      <UIFooter>
        <a href="https://storyset.com/people">People illustrations by Storyset</a>
      </UIFooter>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {userGender} = storeToRefs(useSignupStore())

const nextPage = () => {
  navigateTo('/signup/profile')
}

definePageMeta({
  layout: 'auth'
})

</script>

<style>

</style>