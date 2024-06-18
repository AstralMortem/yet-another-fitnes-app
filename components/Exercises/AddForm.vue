<script lang="ts" setup>
defineEmits(['discard', 'success'])
</script>

<template>
  <USlideover>
    <UCard class="overflow-y-auto">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <UButton icon="i-ph-x" variant="ghost" color="gray" @click="$emit('discard')"/>
          <UIP>Add new exercise</UIP>
        </div>
      </template>
      <div class="h-full flex-1">
      </div>
      <template #footer>
        <div class="flex flex-row justify-start gap-4 items-center">
          <UButton icon="i-ph-disc" color="green" label="Save" />
          <UButton icon="i-ph-arrow-u-up-left" color="amber" label="Discard" @click="$emit('discard')"/>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<style>

</style>
