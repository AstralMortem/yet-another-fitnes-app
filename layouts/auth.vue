<template>
  <div class="w-screen h-screen">
    <slot />
    <UNotifications/>
  </div>
</template>

<script lang="ts" setup>
const profile = useProfileStore()
const supabaseUser = useSupabaseUser()

if(supabaseUser.value && !profile.isAuthenticated){ //check user profile evry page update
  profile.fetchProfile(supabaseUser.value.id)
}

</script>

<style>

</style>