<template>
  <div class="flex flex-col gap-4">
    <div class="w-full flex flex-col justify-center items-center">
      <p class="text-xl">IMT</p>
      <UProgress :value="IMT" :color="color" :max="50">
        <template #indicator="{ percent }">
          <div class="text-right" :style="{ width: `${percent}%` }">
            <span v-if="color == 'blue'" :class="`text-${color}-500`">Low</span>
            <span v-else-if="color == 'green'" :class="`text-${color}-500`">Normal</span>
            <span v-else-if="color == 'lime'" :class="`text-${color}-500`">Pre-obesity</span>
            <span v-else-if="color == 'amber'" :class="`text-${color}-500`">Obesity I</span>
            <span v-else-if="color == 'orange'" :class="`text-${color}-500`">Obesity II</span>
            <span v-else :class="`text-${color}-500`">Obesity III</span>
          </div>
        </template>
      </UProgress>
    </div>
    <UIRange v-model="weight" :min="20" :max="200" label="Choose your weight" prefix="kg"/>
    <UIRange v-model="height" :min="20" :max="300" label="Choose your height" prefix="sm"/>
  </div>
</template>

<script lang="ts" setup>

const height = defineModel("height",{default:140})
const weight = defineModel("weight",{default:50})
const IMT = computed(()=>weight.value/Math.pow(height.value/100,2))
const color = computed(()=>{
  switch(true){
    case IMT.value < 18.5: return 'blue'
    case IMT.value >= 18.5 && IMT.value <= 24.9: return 'green'
    case IMT.value >= 25.0 && IMT.value <= 29.9: return 'lime'
    case IMT.value >= 30.0 && IMT.value <= 34.9: return 'amber'
    case IMT.value >= 35.0 && IMT.value <= 39.9: return 'orange'
    case IMT.value >= 40: return 'red'
    default: return 'green'
  }
})

</script>

<style scoped>

</style>