<script setup lang="ts">
import { ITipstersNode } from '~/types/types';

defineProps<{
    data: ITipstersNode
}>()
</script>
<template>
    <div class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white">
        <div class="flex items-center gap-x-3">
            <div class="flex items-center justify-center">
                <NuxtImg :src="data.imageUrl" class="w-14 h-14 rounded-full p-[1px] ring-2 ring-fuchsia-400" />
            </div>
            <div class="flex flex-col">
                <span class="text-base md:text-lg text-neutral-800 font-medium">{{ data.penName }}</span>
                <small class="text-sm text-neutral-600/70">{{ data.followerCount }} followers</small>
            </div>
        </div>
        <div class="flex justify-end items-center">
            <button
                class="px-5 md:px-7 py-1.5 rounded-lg border border-c-seperator text-sm md:text-base tracking-wide font-medium">Follow</button>
        </div>
    </div>
</template>