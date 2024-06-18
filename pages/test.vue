<script lang="ts" setup>
onMounted(async () => {
  const data = await supabaseInsert('exercise', {}, [], true)
})
</script>

<template>
  <div />
</template>

<style>

</style>
