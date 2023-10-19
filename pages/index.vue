<script setup lang="ts">
import { IPayload } from "~/types/types"
import { IHomePageDetails, PostsNode, FollowingNode, IHomePageAnonymousDetails } from "~/types/homePage"
import { HomePageDataForUser, HomePageDataForAnonymousUser } from "~/graphql/homePage"

definePageMeta({
    middleware: 'check-auth',
});

const { getToken } = useApollo();
const user_payload = useCookie<IPayload>("user_payload");
const postData = ref<PostsNode[]>([]);
const followingTipsters = ref<FollowingNode[]>([]);
const followMoreTipster = ref(false);
const loading = ref(true);
const stories = ref(false);

const fetchPostsForSignInUser = async () => {
    loading.value = true;
    const { onResult, onError } = useQuery<IHomePageDetails>(HomePageDataForUser, { userId: user_payload.value.userID })
    onResult((result) => {
        loading.value = false;
        postData.value = result.data.predictionPosts.edges?.map((edge) => edge.node) ?? []
        let following = result.data.tipsterFollowers.edges?.map((edge) => edge.node) ?? []
        if (following.length < 2) {
            followMoreTipster.value = true;
        }
        followingTipsters.value = following;
    })
    onError((error) => {
        loading.value = false;
        console.log("Fetch home page data error: ", error.message)
    })
}

const fetchPostsForAnonymousUser = async () => {
    loading.value = true;
    const { onResult, onError } = useQuery<IHomePageAnonymousDetails>(HomePageDataForAnonymousUser);
    onResult((result) => {
        console.log('Possible errors for anonymous: ', result.errors, result.error)
        loading.value = false;
        postData.value = result.data.predictionPosts.edges?.map((edge) => edge.node) ?? []
    })
    onError((error) => {
        loading.value = false;
        console.log("Fetch home page anonymous data error: ", error)
    })


}

onMounted(async () => {
    const token = await getToken()
    if (token) {
        fetchPostsForSignInUser();
    } else {
        fetchPostsForAnonymousUser()
    }
})

const updateLike = (payload: boolean, postId: string) => {
    let postIndex = postData.value.findIndex((post) => post.id === postId)
    if (postIndex !== -1) {
        let newNode = { ...postData.value[postIndex] };
        newNode.isLikedByMe = payload;
        if (payload) {
            newNode.likes += 1;
        } else {
            newNode.likes -= 1;
        }
        postData.value[postIndex] = { ...newNode };
    }
}

const updateFollowStatus = (payload: boolean, postId: string) => {
    console.log("Toggle follow: ", payload)
    let postIndex = postData.value.findIndex((post) => post.id === postId)
    if (postIndex !== -1) {
        let newNode = { ...postData.value[postIndex] };
        let tipster = { ...newNode.tipsterId }
        tipster.isFollowedByUser = payload;
        if (payload) {
            tipster.followerCount += 1
        } else {
            tipster.followerCount -= 1
        }
        newNode.tipsterId = tipster
        postData.value[postIndex] = { ...newNode };
    }
}

</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-4 mt-2">
                <div v-if="stories" class="w-full">
                    <UiSliderHorizontal />
                </div>
                <Transition>
                    <div v-if="loading" class="w-full flex flex-col gap-y-4 pt-8">
                        <UiPostCardSkeleton />
                        <UiPostCardSkeleton />
                    </div>
                    <div v-else class="w-full mt-2">
                        <Transition mode="out-in">
                            <div v-if="!followMoreTipster" class="w-full flex flex-col gap-y-4">
                                <div v-for="post in postData" :key="post.id" class="w-full">
                                    <SectionsPostCard :node="post" @update-like="updateLike"
                                        @update-follow-status="updateFollowStatus" />
                                </div>
                            </div>
                            <div v-else class="w-full flex flex-col">
                                <LazyContainersFollowMoreTipsters />
                            </div>
                        </Transition>
                    </div>
                </Transition>
            </div>
        </NuxtLayout>
    </div>
</template>
