<script setup lang="ts">
import { ItemNode } from "~/types/homePage";
import { sportEmojis } from "~/constants/sportsEmojis";

const props = defineProps<{
    item: ItemNode
}>()

const getIcon = computed(() => {
    return (sportEmojis as Record<string, string>)[props.item.sport] || ""
})

</script>
<template>
    <div class="w-full flex-col flex sm:px-2 py-4 gap-y-1">
        <div class="title w-full flex items-center gap-x-2.5 relative">
            <div class="flex items-center gap-x-1.5">
                <NuxtImg :src="item.homeImage" class="w-4 h-4" />
                <p class="text-base font-medium">{{ item.homeName }}</p>
            </div>
            <p class="text-base font-medium"> - </p>
            <div class="flex items-center gap-x-1.5">
                <NuxtImg :src="item.awayImage" class="w-4 h-4" />
                <p class="text-base font-medium">{{ item.awayName }}</p>
            </div>
        </div>
        <div class="w-full flex flex-col gap-y-3 sm:gap-y-1 relative">
            <div class="flex gap-x-2 items-center w-full">
                <div class="flex items-center gap-x-2">
                    <Icon :name="getIcon" class="text-sm text-neutral-500 bg-opacity-50" />
                    <p class="text-sm text-neutral-600">{{ item.sport }}</p>
                </div>
                <div class="flex items-center gap-x-2 text-sm text-neutral-500 truncate ">
                    <span>-</span>
                    <span>{{ item.country }}</span>
                    <span>-</span>
                    <span class=" overflow-hidden truncate">{{ item.leagueName }}</span>
                </div>
            </div>
            <div class="w-full flex justify-between items-start pl-8 mt-2.5 gap-x-4">
                <div class="flex items-center gap-x-2 truncate">
                    <span class="text-xs sm:text-sm uppercase font-medium overflow-hidden truncate">{{ item.predictionName
                    }}:
                    </span>
                    <span class="text-xs sm:text-sm uppercase text-neutral-700">{{ item.predictionValue }}</span>
                </div>
                <div class="flex items-center gap-x-2">
                    <span class="text-xs sm:text-sm uppercase font-medium ">{{ item.odds }}</span>
                </div>
            </div>
            <span class="absolute left-1.5 top-[40%] bottom-[15%] w-[1px] bg-neutral-400"></span>
            <span class="absolute left-1.5 bottom-[15%] w-5 h-[1px] bg-neutral-400"></span>
        </div>
    </div>
</template>
