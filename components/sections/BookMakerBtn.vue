<script setup lang="ts">
defineProps<{
    image: string;
    bgColor: string
}>()
</script>
<template>
    <div :class="['flex items-center gap-x-4 rounded-xl px-3 py-3 divide-x divide-c-seperator', bgColor]">
        <div class="flex items-center">
            <NuxtImg :src="image" class="h-4" />
        </div>
        <div class="flex items-center gap-x-1 text-c-light pr-2 pl-4">
            <p class="text-sm">Odds</p>
            <small class="text-sm">1.17</small>
        </div>
    </div>
</template>