<script setup lang="ts">
defineProps<{
    image: string;
}>()
</script>
<template>
    <div class="flex items-center gap-x-2.5 sm:gap-x-4 rounded-xl px-3 py-3 divide-x divide-c-seperator">
        <div class="flex items-center">
            <NuxtImg :src="image" class="h-6 sm:h-7 rounded" />
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-x-1 pr-2 pl-2.5 sm:pl-4 font-medium text-neutral-700">
            <p class="text-xs sm:text-sm">Odds</p>
            <small class="text-xs sm:text-sm">1.17</small>
        </div>
    </div>
</template>
