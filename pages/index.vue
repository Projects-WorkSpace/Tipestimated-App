<script setup lang="ts">
import { IPayload } from "~/types/types";
import { useAuthStore } from "~/store/authStore";
import {
  IHomePageDetails,
  PostsNode,
  FollowingNode,
  IHomePageAnonymousDetails,
  ISuggestedData,
  TipsterNode,
} from "~/types/homePage";
import {
  HomePageDataForUser,
  HomePageDataForAnonymousUser,
  SuggestedData,
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
const tipsterList = ref<TipsterNode[]>([]);
const followMoreTipster = ref(false);
const loading = ref(true);
const onSuggestion = ref({
  loading: false,
  status: false,
});
const stories = ref(false);

const fetchPostsForSignInUser = async () => {
  loading.value = true;
  onSuggestion.value.status = false;
  const { onResult, onError } = useQuery<IHomePageDetails>(
    HomePageDataForUser,
    { userId: user_payload.value.userID },
    { fetchPolicy: "no-cache" },
  );
  onResult((result) => {
    loading.value = false;
    const posts = result.data.predictionPosts.edges?.map((edge) => edge.node);

    const following =
      result.data.tipsterFollowers.edges?.map((edge) => edge.node) ?? [];

    // suggest for user if
    if (posts?.length === 0 && following.length >= 2) {
      onSuggestion.value.status = true;
      fetchSuggestions();
    } else {
      postData.value = posts ?? [];

      if (following.length <= 1) {
        updateIfLessFollowers(true);
        followMoreTipster.value = true;
      }

      followingTipsters.value = following;
    }
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

const fetchSuggestions = async () => {
  onSuggestion.value.loading = true;
  const { onResult, onError } = useQuery<ISuggestedData>(
    SuggestedData,
    {},
    { fetchPolicy: "no-cache" },
  );
  onResult((res) => {
    if (res.errors === undefined) {
      postData.value =
        res.data.suggestedPosts.edges?.map((edge) => edge.node) ?? [];
      tipsterList.value =
        res.data.suggestedTipsters.edges?.map((edge) => edge.node) ?? [];
    }
    onSuggestion.value.loading = false;
  });
  onError((err) => {
    onSuggestion.value.loading = false;
    console.log("There was error in Suggestions: ", err.message);
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
      // this was the only way to deal with it. Vue is shit
      const data = { ...post };
      let tipster = { ...data.tipsterId };
      const tipster_data = { ...tipster };
      tipster_data.isFollowedByUser = payload;
      tipster = { ...tipster_data };
      payload ? (tipster.followerCount += 1) : (tipster.followerCount -= 1);
      data.tipsterId = { ...tipster };
      post = data;
    }
    return post;
  });
  postData.value = newPosts;

  // also if it is in Suggestions
  if (onSuggestion.value.status) {
    updateTipsterFollowStatus(payload, tipsterID);
  }
};

const updateTipsterFollowStatus = (payload: boolean, tipsterId: string) => {
  let tipsterIndex = tipsterList.value.findIndex(
    (edge) => edge.id === tipsterId,
  );
  if (tipsterIndex !== -1) {
    let node = { ...tipsterList.value[tipsterIndex] };
    node.isFollowedByUser = payload;
    node.followerCount += payload ? 1 : -1;
    tipsterList.value[tipsterIndex] = { ...node };
  }
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
        <div v-if="!onSuggestion.status" class="w-full flex flex-col">
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
        <!-- Suggestions -->
        <div v-else class="w-full flex flex-col gap-y-8">
          <Transition>
            <div v-if="onSuggestion.loading" class="w-full flex flex-col gap-y-4 pt-8">
              <UiPostCardSkeleton />
              <UiPostCardSkeleton />
            </div>
            <!-- Suggested posts -->
            <div v-else class="w-full flex flex-col gap-y-12">
              <div class="w-full flex flex-col gap-y-5">
                <div class="w-full flex items-center justify-between">
                  <div class="flex items-center">
                    <h4 class="text-lg sm:text-xl">Suggested Posts</h4>
                  </div>
                </div>
                <div class="w-full flex flex-col gap-y-4">
                  <div v-for="post in postDataClean" :key="post.id" class="w-full">
                    <SectionsPostCard :node="post" @update-like="updateLike" @update-follow-status="updateFollowStatus" />
                  </div>
                </div>
              </div>
              <!-- Suggested tipsters -->
              <div class="w-full flex flex-col gap-y-5">
                <div class="w-full flex items-center justify-between">
                  <div class="flex items-center">
                    <h4 class="text-lg sm:text-xl">Suggested for you</h4>
                  </div>
                  <div class="flex items-center">
                    <NuxtLink to="/explore/tipsters" class="text-sm sm:text-base text-neutral-800 hover:text-neutral-600">
                      See All
                    </NuxtLink>
                  </div>
                </div>
                <div class="w-full flex flex-col gap-y-3">
                  <ContainersRenderExploreList :pending="onSuggestion.loading" :data="tipsterList"
                    @update-follow-status="updateTipsterFollowStatus" />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
