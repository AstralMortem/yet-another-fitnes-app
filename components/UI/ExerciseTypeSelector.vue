<template>
  <USelectMenu v-model="updated" :options="options"/>
</template>

<script lang="ts" setup>
const model = defineModel()
const exerciseTypeStore = useExerciseTypeStore()
const {dataList} = storeToRefs(exerciseTypeStore)

const updated = computed({
  get(){
    return dataList.value.find(x => x.label == model.value)?.title
  },
  set(value){
    const val = dataList.value.find(x => x.title == value)?.label
    model.value = val
  }
})

const options = computed(()=> dataList.value.map(x=>x.title))

</script>

<style>

</style>