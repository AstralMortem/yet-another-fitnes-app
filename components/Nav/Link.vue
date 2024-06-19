<script lang="ts" setup>
defineProps(['to', 'icon'])
</script>

<template>
  <ULink
    :to="$props.to"
    :icon="$props.icon"
    class="text-base md:text-xl lg:text-3xl py-2 px-4 w-full "
    active-class="text-primary border-t-2 lg:border-r-2 lg:border-t-0 border-primary hover:bg-primary-400 hover:bg-opacity-20"
    inactive-class="text-slate-500 hover:bg-primary-400 hover:bg-opacity-20"
  >
    <span class="flex flex-col lg:flex-row justify-start items-center gap-1 lg:gap-4">
      <UIcon :name="$props.icon" />
      <slot />
    </span>
  </ULink>
</template>

<style>

</style>
