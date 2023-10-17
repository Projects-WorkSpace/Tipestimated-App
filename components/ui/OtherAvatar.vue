<script setup lang="ts">
defineProps<{
  wAndH?: string
  imgUrl?: string
}>()
</script>
<template>
  <div class="flex items-center justify-center">
    <NuxtImg :src="imgUrl || '/images/profile-picture-5.jpg'"
      :class="['rounded-full ring-2 ring-offset-1  ring-fuchsia-400', wAndH || 'w-14 h-14']" />
  </div>
</template>
