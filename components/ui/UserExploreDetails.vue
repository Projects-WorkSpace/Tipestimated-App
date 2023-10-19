<script setup lang="ts">
import { IPayload } from "~/types/types"
import { ITipstersNode } from '~/types/types';
import { FollowTipster, UnFollowTipster } from "~/graphql/accounts"
import { IFollowTipster, IUnFollowTipster } from '~/types/accounts';

const props = defineProps<{
    data: ITipstersNode;
}>()
const emits = defineEmits<{
    (e: "updateFollowStatus", payload: boolean, tipsterId: string): void
}>()


const { getToken } = useApollo()
const user_payload = useCookie<IPayload>("user_payload");
const toast = useToast()
const { mutate: postFollowData, onDone: onFollow, onError: onFollowError } = useMutation<IFollowTipster>(FollowTipster);
const { mutate: postUnFollowData, onDone: onUnFollow, onError: onUnFollowError } = useMutation<IUnFollowTipster>(UnFollowTipster);

const checkUserAuthentication = async () => {
    const token = await getToken()
    if (token && user_payload.value) {
        return true;
    }
    toast.add({
        title: "Sign in!",
        description: "You are not signed in to proceed with this action.",
        ui: {
            progress: {
                base: "h-0"
            }
        }
    })

    return false;
}

const clickFollowToggle = async (payload: boolean) => {
    if (await checkUserAuthentication()) {
        if (payload) {
            postFollowData({ userId: user_payload.value.userID, tipsterId: props.data.id })
        } else {
            postUnFollowData({ userId: user_payload.value.userID, tipsterId: props.data.id })
        }
    }
}

onFollow((data) => {
    if (data.data?.followTipster.errors === null) {
        emits("updateFollowStatus", true, props.data.id);
    } else {
        console.log("Post errors: ", data.data?.followTipster.errors)
    }
})

onFollowError((error) => {
    console.log("Data error: ", error)
})

onUnFollow((data) => {
    if (data.data?.unFollowTipster.success) {
        emits("updateFollowStatus", false, props.data.id);
    } else {
        console.log("Unfollow Post errors: ", data.data?.unFollowTipster.errors)
    }
})

onUnFollowError((error) => {
    console.log("Unfollow Data error: ", error)
})

</script>

<template>
    <div class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white">
        <div class="flex items-center gap-x-3">
            <div class="flex items-center justify-center">
                <NuxtImg :src="data.imageUrl" class="w-14 h-14 rounded-full p-[1px] ring-2 ring-fuchsia-400" />
            </div>
            <div class="flex flex-col">
                <span class="text-base text-neutral-800 font-medium">{{ data.penName }}</span>
                <span>
                    <small class="text-sm text-neutral-600/70">{{ data.followerCount }} follower</small>
                    <small v-if="data.followerCount > 1" class="text-sm text-neutral-600/70">s</small>
                </span>
            </div>
        </div>
        <div class="flex justify-end items-center">
            <Transition mode="out-in">
                <button v-if="data.isFollowedByUser" @click="clickFollowToggle(false)"
                    class="px-5 md:px-7 py-1.5 rounded-lg border border-c-seperator text-sm md:text-base tracking-wide font-medium">Following</button>
                <button v-else @click="clickFollowToggle(true)"
                    class="px-5 md:px-7 py-1.5 rounded-lg border border-c-seperator text-sm md:text-base tracking-wide font-medium">Follow</button>
            </Transition>
        </div>
    </div>
</template>
