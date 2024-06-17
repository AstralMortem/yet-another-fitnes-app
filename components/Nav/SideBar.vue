<template>
  <div class="flex flex-row lg:flex-col w-full h-fit lg:h-full lg:min-w-[300px] lg:max-w-[300px] bg-slate-900 justify-center items-center fixed lg:relative bottom-0 z-50">
    <UILogo class="hidden lg:block"/>
    <div class="flex flex-1 flex-row lg:flex-col gap-4 w-full justify-around lg:justify-normal">
      <NavLink v-for="link in links" :key="link.label" :to="link.to" :icon="link.icon">{{ link.label }}</NavLink>
    </div>
    <UIFooter class="hidden lg:block"/>
  </div>
</template>

<script lang="ts" setup>
const links = [{
  to: '/',
  label: 'Statistic',
  icon: 'i-ph-chart-bar'
},{
  to: '/routines',
  label: "Routines",
  icon: 'i-ph-rows-plus-bottom'
},{
  to: '/exercises',
  label: 'Exercises',
  icon: 'i-ph-barbell'
},{
  to: '/profile',
  label: 'Profile',
  icon: 'i-ph-user'
}]
</script>

<style>

</style>