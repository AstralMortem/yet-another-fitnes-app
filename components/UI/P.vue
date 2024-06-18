<script lang="ts" setup>
defineProps(['color'])
</script>

<template>
  <p class="text-base md:text-xl lg:text-3xl flex justify-center items-center" :class="$props.color ? `text-${$props.color}-500` : ''">
    <slot />
  </p>
</template>

<style>

</style>
