<template>
  <div class="flex flex-row md:flex-col w-full h-fit md:h-full md:min-w-[300px] md:max-w-[300px] bg-slate-900 justify-center items-center fixed md:relative bottom-0">
    <UILogo class="hidden md:block"/>
    <div class="flex flex-1 flex-row md:flex-col gap-4 w-full justify-around md:justify-normal">
      <NavLink v-for="link in links" :key="link.label" :to="link.to" :icon="link.icon">{{ link.label }}</NavLink>
    </div>
    <UIFooter class="hidden md:block"/>
  </div>
</template>

<script lang="ts" setup>
const links = [{
  to: '/',
  label: 'Index',
  icon: 'i-ph-building'
},{
  to: '/profile',
  label: 'Profile',
  icon: 'i-ph-user'
}]
</script>

<style>

</style>