<script lang="ts" setup>
const equipmentStore = useEquipmentsStore()
const musclesStore = useMusclesStore()
</script>

<template>
  <div>
    <FilterStore :store="equipmentStore" title="Equipments" />
  </div>
</template>

<style>

</style>
