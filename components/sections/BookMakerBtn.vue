<script setup lang="ts">
defineProps<{
    image: string;
    bgColor: string
}>()
</script>
<template>
    <div :class="['flex items-center gap-x-2.5 sm:gap-x-4 rounded-xl px-3 py-3 divide-x divide-c-seperator', bgColor]">
        <div class="flex items-center">
            <NuxtImg :src="image" class="h-3 sm:h-4" />
        </div>
        <div class="flex items-center gap-x-1 text-c-light pr-2 pl-2.5 sm:pl-4 font-medium">
            <p class="text-xs sm:text-sm">Odds</p>
            <small class="text-xs sm:text-sm">1.17</small>
        </div>
    </div>
</template>