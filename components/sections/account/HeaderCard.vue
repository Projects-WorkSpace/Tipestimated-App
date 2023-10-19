<script setup lang="ts">
const props = defineProps<{
  name: string;
  imgUrl: string;
}>()
</script>
<template>
  <div class="w-full card-header flex justify-between items-center">
    <div class="flex gap-x-4 items-center">
      <NuxtImg :src="imgUrl" class="rounded-full ring-2 ring-fuchsia-300 w-10 md:w-14 h-10 md:h-14" />
      <span class="text-base sm:text-xl font-medium">{{ name }}</span>
    </div>
  </div>
</template>
