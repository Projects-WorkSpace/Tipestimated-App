<script setup lang="ts">
defineProps<{
    imgUrl: string
}>()
</script>
<template>
    <div class="flex items-center">
        <button class="flex flex-col items-center justify-center gap-y-0.5">
            <UiStoryAvatar :img-url="imgUrl" w-and-h="w-16 md:w-20 h-16 md:h-20" />
            <span class="text-xs sm:text-sm">User 1</span>
        </button>
    </div>
</template>
