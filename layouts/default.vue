<template>
  <div class="w-screen h-screen flex flex-row">
    <NavSideBar/>
    <UContainer class="w-full p-4">
      <slot />
    </UContainer>
    
    <UNotifications/>
  </div>
</template>

<script lang="ts" setup>
const profile = useProfileStore()
const supabaseUser = useSupabaseUser()

onMounted(async ()=>{
  if(supabaseUser.value && !profile.isAuthenticated){ //check user profile evry page update
  await profile.fetchProfile(supabaseUser.value.id)
}
})



</script>

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