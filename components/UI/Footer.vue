<template>
  <footer class="flex flex-col gap-1 justify-center items-center p-10 text-slate-400 ">
    <p class="text-sm">YAFA {{new Date().getFullYear()}} | All Rights Reserved</p>
    <p class="text-xs hover:underline">
      <slot/>
    </p>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style>

</style>