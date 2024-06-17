<template>
  <div class="relative w-24 h-24 flex justify-center items-center">
    <svg class="w-full h-full absolute top-0 left-0" viewBox="0 0 120 120">
      <!-- Background circle -->
      <circle
        class="text-slate-700 stroke-current"
        stroke-width="10"
        :cx="size"
        :cy="size"
        :r="radius"
        fill="transparent"
      ></circle>
      <!-- Progress circle -->
      <circle
        class="text-primary-500  progress-ring__circle stroke-current"
        stroke-width="10"
        stroke-linecap="round"
        :cx="size"
        :cy="size"
        :r="radius"
        fill="transparent"
        :stroke-dasharray="circumference" 
        :stroke-dashoffset="circumference - (circumference * model) / props.max"
      ></circle>
    </svg>
    <UInput v-model="model" class="w-full z-1 mx-5"  trailing-icon="i-ph-percent" type="number" size="2xs" v-if="$props.editable"/>
    <p class="text-base z-1" v-else>{{ model }}%</p>
  </div>

</template>

<script lang="ts" setup>

const size = 60
const radius = size - 10 //size - stroke-width
const circumference =computed(()=> 2 * Math.PI * radius)

const model = defineModel({default:0})

watch(model, ()=>{
  if(model.value < props.min){
    model.value = props.min
  }
  if(model.value > props.max){
    model.value = props.max
  }

})
const props = defineProps({
  max:{
    type: Number,
    default:100
  },
  min:{
    type: Number,
    default:0
  },
  editable:{
    type: Boolean,
    default: false
  },
  blockedValue:{
    type: Number
  }

})

</script>

<style scoped>

.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}



</style>