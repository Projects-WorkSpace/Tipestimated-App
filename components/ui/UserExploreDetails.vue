<script setup lang="ts">
import { ITipstersNode, IFollowData, IUnFollowData } from '~/types/types';
import { FollowTipsterMutation, UnFollowTipsterMutation } from '~/graphql/schema';
import { useAuthStore } from "~/store/authStore";

const props = defineProps<{
    data: ITipstersNode;
}>()

const { mutate: followTipster, onDone: followTipsterDone, onError: followTipsterErr } = useMutation<IFollowData>(FollowTipsterMutation);
const { mutate: unFollowTipster, onDone: unFollowTipsterDone, onError: unFollowTipsterErr } = useMutation<IUnFollowData>(UnFollowTipsterMutation);
const initialData = ref(props.data);
const authStore = useAuthStore();

const followFunc = async (payload: boolean) => {
    let user_id = authStore.user_details?.id;
    let tipster_id = initialData.value.id;
    if (payload) {
        followTipster({ userId: user_id, tipsterId: tipster_id })
    } else {
        unFollowTipster({ userId: user_id, tipsterId: tipster_id })
    }
}

followTipsterDone((data) => {
    let fetchedData = data.data?.followTipster;
    if (fetchedData?.errors?.length === 0) {
        initialData.value.isFollowedByUser = true;
    } else {
        console.log("Follow not successful: ", fetchedData?.errors)
    }
})

followTipsterErr((error) => {
    console.log("Follow Error: ", error.message)
})

unFollowTipsterDone((data) => {
    let fetchedData = data.data?.unFollowTipster;
    if (fetchedData?.success) {
        initialData.value.isFollowedByUser = false;
    } else {
        console.log("unFollow not successful: ", fetchedData?.errors);
    }
})

unFollowTipsterErr((error) => {
    console.log("Follow Error: ", error.message)
})
</script>

<template>
    <div class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white">
        <div class="flex items-center gap-x-3">
            <div class="flex items-center justify-center">
                <NuxtImg :src="initialData.imageUrl" class="w-14 h-14 rounded-full p-[1px] ring-2 ring-fuchsia-400" />
            </div>
            <div class="flex flex-col">
                <span class="text-base md:text-lg text-neutral-800 font-medium">{{ initialData.penName }}</span>
                <span>
                    <small class="text-sm text-neutral-600/70">{{ initialData.followerCount }} follower</small>
                    <small v-if="data.followerCount > 1" class="text-sm text-neutral-600/70">s</small>
                </span>
            </div>
        </div>
        <div class="flex justify-end items-center">
            <button v-if="!initialData.isFollowedByUser" @click="followFunc(true)"
                class="px-5 md:px-7 py-1.5 rounded-lg border border-c-seperator text-sm md:text-base tracking-wide font-medium">Follow</button>
            <button v-else @click="followFunc(false)"
                class="px-5 md:px-7 py-1.5 rounded-lg border border-c-seperator text-sm md:text-base tracking-wide font-medium">Following</button>

        </div>
    </div>
</template>
