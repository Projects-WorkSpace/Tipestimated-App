<script setup lang="ts">
import { IPayload } from "~/types/types";
import { useAuthStore } from "~/store/authStore";
import {
  IHomePageDetails,
  PostsNode,
  FollowingNode,
  IHomePageAnonymousDetails,
} from "~/types/homePage";
import {
  HomePageDataForUser,
  HomePageDataForAnonymousUser,
} from "~/graphql/homePage";

definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();
const { updateIfLessFollowers } = authStore;
const { getToken } = useApollo();
const user_payload = useCookie<IPayload>("user_payload");
const postData = ref<PostsNode[]>([]);
const followingTipsters = ref<FollowingNode[]>([]);
const followMoreTipster = ref(false);
const loading = ref(true);
const stories = ref(false);

const fetchPostsForSignInUser = async () => {
  loading.value = true;
  const { onResult, onError } = useQuery<IHomePageDetails>(
    HomePageDataForUser,
    { userId: user_payload.value.userID },
    { fetchPolicy: "no-cache" },
  );
  onResult((result) => {
    loading.value = false;
    let posts = result.data.predictionPosts.edges?.map((edge) => edge.node);
    // no found posts
    if (posts?.length !== 0) {
      postData.value = posts ?? [];
    } else {
      followMoreTipster.value = true;
    }
    let following =
      result.data.tipsterFollowers.edges?.map((edge) => edge.node) ?? [];
    if (following.length <= 1) {
      updateIfLessFollowers(true);
      followMoreTipster.value = true;
    }
    followingTipsters.value = following;
  });
  onError((error) => {
    loading.value = false;
    console.log("Fetch home page data error: ", error.message);
  });
};

const fetchPostsForAnonymousUser = async () => {
  loading.value = true;
  const { onResult, onError } = useQuery<IHomePageAnonymousDetails>(
    HomePageDataForAnonymousUser,
  );
  onResult((result) => {
    loading.value = false;
    let posts = result.data.predictionPosts.edges?.map((edge) => edge.node);
    if (posts?.length !== 0) {
      postData.value = posts ?? [];
    } else {
      followMoreTipster.value = true;
    }
  });
  onError((error) => {
    loading.value = false;
    console.log("Fetch home page anonymous data error: ", error);
  });
};

// Refetch data after following min of 2 tipsters
const refetchHomeData = () => {
  fetchPostsForSignInUser();
  // Also update this data
  followMoreTipster.value = false;
  updateIfLessFollowers(false);
};

onMounted(async () => {
  const token = await getToken();
  if (token) {
    fetchPostsForSignInUser();
  } else {
    fetchPostsForAnonymousUser();
  }
});

const updateLike = (payload: boolean, postId: string) => {
  let postIndex = postData.value.findIndex((post) => post.id === postId);
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
};

const updateFollowStatus = (payload: boolean, tipsterID: string) => {
  const newPosts = postData.value.map((post) => {
    if (post.tipsterId.id === tipsterID) {
      post.tipsterId.isFollowedByUser = payload;
      payload
        ? (post.tipsterId.followerCount += 1)
        : (post.tipsterId.followerCount -= 1);
    }
    return post;
  });
  postData.value = newPosts;
};

const postDataClean = computed(() => postData.value);
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
          <div v-else class="w-full">
            <Transition mode="out-in">
              <div v-if="!followMoreTipster" class="w-full flex flex-col gap-y-4">
                <div v-for="post in postDataClean" :key="post.id" class="w-full">
                  <SectionsPostCard :node="post" @update-like="updateLike" @update-follow-status="updateFollowStatus" />
                </div>
              </div>
              <div v-else class="w-full flex flex-col">
                <LazyContainersFollowMoreTipsters @refetch-data="refetchHomeData" />
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    </NuxtLayout>
  </div>
</template>
