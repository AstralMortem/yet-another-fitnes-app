<script lang="ts" setup>
const profileStore = useUserProfileStore()
onMounted(async () => {
  await profileStore.fetchProfile()
})
</script>

<template>
  <div class="w-screen h-screen  flex flex-row">
    <NavSideBar />
    <UContainer class="w-full mt-4 mb-20 lg:mb-0">
      <slot />
    </UContainer>

    <UNotifications>
      <template #title="{ title }">
        <p class="text-lg">
          {{ title }}
        </p>
      </template>
      <template #description="{ description }">
        <UTooltip :text="description.split('||')[1]" class="cursor-pointer">
          <span class="text-underline">{{ description.split('||')[0] }}</span>
        </UTooltip>
      </template>
    </UNotifications>
    <UModals />
    <USlideovers />
  </div>
</template>

<style>
::-webkit-scrollbar {
  @apply w-1 rounded-lg
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-primary-300 opacity-50 rounded-lg
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-primary-500 rounded-lg
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-800
}
</style>
