<script setup lang="ts">
import { ITipsterDetails } from "~/types/homePage"
const props = defineProps<{
    tipster: ITipsterDetails;
}>();

const emits = defineEmits<{
    (e: "clickFollowToggle", payload: boolean): void
}>()

const clickFollowToggle = (payload: boolean) => {
    emits("clickFollowToggle", payload);
}

</script>
<template>
    <div class="w-full card-header flex justify-between items-center">
        <div class="flex gap-x-4 items-center">
            <UiAvatar w-and-h="w-10 md:w-14 h-10 md:h-14" :img-url="tipster.imageUrl" :id-url="tipster.id"
                :user-name="tipster.penName" :name="tipster.user.userName" :tipster-followers="tipster.followerCount" />
            <span class="text-sm sm:text-base md:text-lg font-medium">{{ tipster.penName }}</span>
        </div>
        <div class="flex items-center">
            <Transition mode="out-in">
                <button @click="clickFollowToggle(false)" v-if="tipster.isFollowedByUser"
                    class="text-sm  uppercase text-neutral-500 border border-c-seperator rounded-3xl px-4 sm:px-6 py-1.5 sm:py-2">
                    following
                </button>
                <button @click="clickFollowToggle(true)" v-else
                    class="text-sm uppercase text-neutral-500 border border-c-seperator rounded-3xl px-4 sm:px-8 py-1.5 sm:py-2">
                    follow
                </button>
            </Transition>
        </div>
    </div>
</template>
