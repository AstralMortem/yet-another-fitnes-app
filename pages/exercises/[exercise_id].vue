<template>
    <div class="w-full h-full overflow-y-auto px-2">
        <UILoader v-if="status == 'pending'" />
        <div class="flex w-full h-full flex-col gap-3" v-else v-if="exercise">
            <div class="flex flex-col md:flex-row justify-start items-start gap-6">
                <div class="bg-slate-800 p-4 rounded-lg w-full md:w-full h-full justify-center items-center flex">
                    <UIImage :src="exercise.image" bucket-name="exercises" :width="400" :height="400" />
                </div>
                <div class="flex flex-col bg-slate-800 p-4 rounded-lg gap-4 w-full md:w-full h-full">
                    <div class="flex flex-row justify-between items-center">
                        <div class="flex flex-row gap-2 items-center justify-start">
                            <p class="text-5xl">{{ exercise.title }}</p>
                            <!-- v-if="isSuperUser || exercise.author_id == userId" -->
                            <div class="flex flex-row gap-1 justify-center items-center" >
                                <UButton icon="i-ph-pencil" variant="soft" color="green" />
                                <UButton icon="i-ph-trash" variant="soft" color="red" @click="openDeleteModal(exercise.id, exercise.title)"/>
                            </div>
                        </div>
                        
                        <div class="flex flex-row justify-center items-center gap-1">
                            <p>{{ exercise.level }}/5</p>
                            <UILevelMeter v-model="exercise.level" />
                        </div>
                    </div>
                    <div class="w-full h-full relative ">
                        <div class="absolute -top-3 left-4 text-2xl text-primary bg-slate-800 px-2">
                            <UIcon name="i-ph-chat-teardrop-text" />
                        </div>

                        <p class="text-wrap text-lg ring-2 px-4 py-3 rounded-lg ring-primary">{{ exercise.description }}
                        </p>
                    </div>
                </div>
            </div>
            <p class="text-xl md:text-3xl text-slate-400">Muscles</p>
            <UILoader v-if="muscleStatus == 'pending'"/>
            <div class="flex flex-col-reverse md:flex-row gap-6 justify-between items-center md:items-start bg-slate-800 p-4 rounded-lg" v-else>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:md-grid-cols-4 gap-6">
                    <div v-for="(muscle, idx) in muscles" class="flex flex-row gap-2">
                        <UIImage :src="muscle.muscles.image" bucket-name="exercises" :height="90" :width="90"
                            :ring-color="muscleChartColor[idx]" />
                        <div class="flex flex-col justify-start items-start">
                            <p class="text-xl">{{ muscle.muscles.title }}</p>
                            <p class="text-xl font-bold">{{ muscle.procent }}%</p>
                            <UBadge class="text-xs" :color="muscle.type == 'main' ? 'primary' : 'green'">{{ muscle.type }}
                            </UBadge>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <Doughnut :data="muscleChart" :options="muscleChartOptions"></Doughnut>
                </div>
            </div>
            <p class="text-xl md:text-3xl text-slate-400">Equipment</p>
            <div class=" bg-slate-800 p-4 rounded-lg grid grid-cols-2 md:grid-cols-3 lg:md-grid-cols-4 gap-6">
                <div v-for="(equipment, idx) in exercise.equipment"
                    class="flex flex-row gap-2 justify-start items-center">
                    <UIImage :src="equipment.image" bucket-name="exercises" :height="60" :width="60" />
                    <p class="text-2xl">{{ equipment.title }}</p>
                </div>
            </div>
            <p class="text-xl md:text-3xl text-slate-400" v-if="exerciseTypeObject">Exercise Type</p>
            <div class="flex flex-col gap-6 bg-slate-800 p-4 rounded-lg justify-start items-start" v-if="exerciseTypeObject">
                <div class="flex flex-row gap-2 justify-center items-center w-fit">
                    <div class="p-1 flex justify-center items-center ring-2 ring-primary rounded-md">
                        <UIcon :name="exerciseTypeObject.icon" class="text-2xl"  />
                    </div>
                    <p class="text-xl">{{ exerciseTypeObject?.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type ExerciseSelect } from '~/types/exercise';
import { Doughnut } from 'vue-chartjs'
import type { ChartData } from 'chart.js';
import { UIDeleteModal } from '#components';

const modal = useModal()
const supabase = useSupabaseApi()
const route = useRoute()
const exerciseTypeStore = useExerciseTypeStore()
const profileStore = useProfileStore()
const {isSuperUser, userId} = storeToRefs(profileStore)

const { data: exercise, status } = await useAsyncData('fetch-exercise-detail', async () => {
    const { data, error } = await supabase.from('exercise').select('*, equipment(*)').eq('id', route.params.exercise_id).limit(1).single()
    if (error) {
        DBErrorMessage(error)
    } else {
        return data
    }
})

const { data: muscles, status: muscleStatus } = await useAsyncData('fetch-exercise-muscles', async () => {
    if (exercise.value) {
        const { data, error } = await supabase.from('muscle_exercise').select('*, muscles!inner(*)').eq('exercise_id', exercise.value.id).order('type')
        if (error) {
            DBErrorMessage(error)
        } else {
            return data
        }
    }
})

const muscleChartColor = computed(() => {
    if (muscles.value) {
        return muscles.value?.map(x => GenerateRandomColor())
    }
    return '#ffffff'
})


const muscleChart = ref<ChartData<'doughnut'>>({
    labels: muscles.value?.map(x => x.muscles.title),
    datasets: [{
        label: 'Procent',
        backgroundColor: muscleChartColor.value,
        data: muscles.value?.map(x => x.procent),
    }]
})

const muscleChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    width: 100
})

const exerciseTypeObject = computed(() => exerciseTypeStore.dataList.find(x => x.label == exercise.value?.type))

function openDeleteModal (id:string, title: string){
    modal.open(UIDeleteModal,{
        'id': id,
        'tableName': 'exercise',
        'title': title,
        onClose() {
            modal.close()
        },
        onSuccess(){
            modal.close()
            navigateTo('/exercises')
        }
    })
}
</script>

<style></style>