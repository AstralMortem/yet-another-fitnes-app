<template>
  <div class="w-full h-full flex flex-col md:flex-row">
    <div class="bg-slate-800 md:w-1/2 justify-center items-center hidden md:flex">
      <IlustrationsName class="w-[600px] flex self-center"/>
    </div>
    <div class="bg-slate-900 md:w-1/2 w-full h-max md:h-full flex flex-col justify-around items-center ">
      <UILogo/>
      <div class="flex flex-col gap-10 justify-center items-center h-full">
        <IlustrationsName class="flex md:hidden w-[300px] h-auto"/>
        <p class="text-4xl">What is your name?</p>
        <UInput v-model="userName" placeholder="Jhon Doe" size="xl" class="w-full"/>
        <UButton @click="nextPage" label="Next" size="xl" :variant="!userName?'outline':'solid'"  :disabled="!userName" class="rounded-full w-fit p-6" icon="i-ph-caret-circle-double-right" :trailing="true"/>
      </div>
      <UIFooter>
        <a href="https://storyset.com/people">People illustrations by Storyset</a>
      </UIFooter>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {userName} = storeToRefs(useSignupStore())

const nextPage = () => {
  navigateTo('/signup/age')
}

</script>

<style>

</style>