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

</style>