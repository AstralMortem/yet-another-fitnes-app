<template>
  <div class="w-screen h-screen flex flex-row">
    <NavSideBar/>
    <UContainer class="w-full p-4">
      <slot />
    </UContainer>
    
    <UNotifications/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>