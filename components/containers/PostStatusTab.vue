<script setup lang="ts">
import { ActivePredictedPosts, ExpiredPredictedPosts } from "~/graphql/accounts"
import { IActivePostData, IExpiredPostData, IPostNode } from "~/types/accounts"
import { uiTabStyles } from "~/helpers"
const route = useRoute();
const items = [{
    key: 'active',
    label: 'Active',
}, {
    key: 'expired',
    label: 'Expired',
}]
const activePostData = ref<IPostNode[]>([])
const expiredPostData = ref<IPostNode[]>([])
const loadingStatus = ref({
    active: false, expired: false
});

const fetchActivePostData = async (tipsterId: string) => {
    loadingStatus.value.active = true;
    const { onResult, onError } = useQuery<IActivePostData>(ActivePredictedPosts, { tipsterId: tipsterId });

    onError((error) => {
        loadingStatus.value.active = false;
        console.log("Error value: ", error);
    })

    onResult((result) => {
        loadingStatus.value.active = false;
        activePostData.value = result.data.activePredictedPosts.edges?.map((post) => post.node) ?? [];
    })
}

const fetchExpiredPostData = async (tipsterId: string) => {
    loadingStatus.value.expired = true;
    const { onResult, onError } = useQuery<IExpiredPostData>(ExpiredPredictedPosts, { tipsterId: tipsterId });

    onError((error) => {
        loadingStatus.value.expired = false;
        console.log("Error value: ", error);
    })

    onResult((result) => {
        loadingStatus.value.expired = false;
        expiredPostData.value = result.data.expiredPredictedPosts.edges?.map((post) => post.node) ?? [];
    })
}

onMounted(() => {
    fetchActivePostData(route.params.tipsterID as string);
})


function onChange(index: any) {
    const item = items[index]
    if (item.key === "active") {
        fetchActivePostData(route.params.tipsterID as string)
    } else if (item.key === "expired") {
        fetchExpiredPostData(route.params.tipsterID as string)
    }
}

const updateLike = (payload: boolean, statusType: string, postId: string) => {
    if (statusType === "active") {
        let postIndex = activePostData.value.findIndex((post) => post.id === postId)
        if (postIndex !== -1) {
            let newNode = { ...activePostData.value[postIndex] };
            newNode.isLikedByMe = payload;
            if (payload) {
                newNode.likes += 1;
            } else {
                newNode.likes -= 1;
            }
            activePostData.value[postIndex] = { ...newNode };
        }
    }
}

</script>

<template>
    <UTabs :items="items" class="w-full" :ui="uiTabStyles" @change="onChange">
        <template #item="{ item }">
            <div v-if="item.key === 'active'" class="space-y-3 mt-4">
                <div class="w-full">
                    <Transition mode="out-in">
                        <div v-if="!loadingStatus.active" class="w-full">
                            <Transition mode="out-in">
                                <div v-if="activePostData.length !== 0" class="w-full">
                                    <div v-for="node in activePostData" class="w-full">
                                        <SectionsAccountPostCard :node="node" @update-like="updateLike"
                                            status-type="active" />
                                    </div>
                                </div>
                                <div v-else class="w-full pt-16 flex flex-col items-center">
                                    <!-- add note for me here to show there are no expired posts -->
                                    <h3 class="text-xl font-semibold text-neutral-600 tracking-wide">Empty here!</h3>
                                    <p class="text-base">Currently there are no active post to check here.</p>
                                </div>
                            </Transition>
                        </div>
                        <div v-else class="w-full flex flex-col items-center pt-16">
                            <UtilsStarLoading />
                        </div>
                    </Transition>
                </div>
            </div>
            <div v-else-if="item.key === 'expired'" class="space-y-3 mt-4">
                <div class="w-full">
                    <Transition mode="out-in">
                        <div v-if="!loadingStatus.expired" class="w-full">
                            <Transition mode="out-in">
                                <div v-if="expiredPostData.length !== 0" class="w-full">
                                    <div v-for="node in expiredPostData" class="w-full">
                                        <SectionsAccountPostCard :node="node" @update-like="updateLike"
                                            status-type="expired" />
                                    </div>
                                </div>
                                <div v-else class="w-full pt-16 flex flex-col items-center">
                                    <!-- add note for me here to show there are no expired posts -->
                                    <h3 class="text-xl font-semibold text-neutral-600 tracking-wide">Empty here!</h3>
                                    <p class="text-base">Currently there are no expired post to check here.</p>
                                </div>
                            </Transition>
                        </div>
                        <div v-else class="w-full flex flex-col items-center pt-16">
                            <UtilsStarLoading />
                        </div>
                    </Transition>
                </div>
            </div>
        </template>
    </UTabs>
</template>
