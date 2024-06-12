<template>
  <div>
    <USelectMenu v-model="model" :options="options" size="xl"/>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel()


const options = [...Array(95).keys()].map(x => (x + 6))
</script>

<style>

</style>