<script lang="ts" setup>
defineProps(['text'])
</script>

<template>
  <UTooltip v-if="$props.text" :text="$props.text" class="cursor-help">
    <UIP color="primary">
      <UIcon name="i-ph-info" />
    </UIP>
  </UTooltip>
</template>

<style>

</style>
