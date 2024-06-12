<template>
  <div class="w-full h-full flex flex-col md:flex-row">
    <div class="bg-slate-800 md:w-1/2 justify-center items-center hidden md:flex">
      <IlustrationsSportAmico class="w-[600px] flex self-center"/>
    </div>
    <div class="bg-slate-900 md:w-1/2 w-full h-max md:h-full flex flex-col justify-around items-center ">
      <UILogo/>
      <div class="flex flex-col gap-10 justify-center items-center h-full">
        <IlustrationsSportAmico class="flex md:hidden w-[300px] h-auto"/>
        <UIWeekSelector v-model="userTrainingWeek" class="px-6"/>
        <UButton @click="nextPage" label="Next" size="xl" :variant="!userTrainingWeek?'outline':'solid'"  :disabled="!userTrainingWeek" class="rounded-full w-fit p-6" icon="i-ph-caret-circle-double-right" :trailing="true"/>
      </div>
      <UIFooter>
        <a href="https://storyset.com/sport">Sport illustrations by Storyset</a>
      </UIFooter>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {userTrainingWeek} = storeToRefs(useSignupStore())

const nextPage = () => {
  navigateTo('/signup/aim')
}

</script>

<style>

</style>