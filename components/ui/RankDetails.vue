<script setup lang="ts">
defineProps<{
    imgUrl: string
    userName: string
    roi: string
    icon: string
    index: number
}>()
</script>

<template>
    <div class="w-full flex justify-between items-center px-3 py-2 bg-white rounded-xl">
        <div class="flex items-center gap-x-6">
            <UiAvatar :img-url="imgUrl" w-and-h="w-12 h-12" />
            <div class="">
                <p class="text-base">{{ userName }}</p>
            </div>
        </div>
        <div class="flex items-center gap-x-12">
            <div class="">
                <p class="text-base font-semibold">{{ roi }}%</p>
            </div>
            <div class="">
                <Icon :name="icon" size="1.5em" class="scale-150" :class="index > 3 && 'invisible'" />
            </div>
        </div>
    </div>
</template>