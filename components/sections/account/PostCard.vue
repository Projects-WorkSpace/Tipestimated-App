<script setup lang="ts">
import { IPostNode, ILikeResponse } from "~/types/accounts";
import { LikePost } from "~/graphql/accounts";
import { IPayload } from "~/types/types";

const props = defineProps<{
  node?: IPostNode;
  statusType: string;
  penName: string;
  imgUrl: string;
}>();

const emits = defineEmits<{
  (e: "updateLike", payload: boolean, statusType: string, postId: string): void;
}>();

const { getToken } = useApollo();
const user_payload = useCookie<IPayload>("user_payload");
const {
  mutate: postLikeData,
  onDone: onLike,
  onError: onLikeError,
} = useMutation<ILikeResponse>(LikePost);
const animations = ref({
  startAnimation: false,
  startUnfillAnimation: false,
  startRippleAnimation: false,
});

const clickLikeBtn = useDebounceFn(() => {
  postLike();
}, 500);

const postLike = async () => {
  const token = await getToken();
  if (token && user_payload.value) {
    postLikeData({ postId: props.node?.id, userId: user_payload.value.userID });
  }
};

onLike((data) => {
  if (data.data) {
    if (data.data?.likePost.liked) {
      animations.value.startAnimation = true;
      setTimeout(() => {
        animations.value.startRippleAnimation = true;
      }, 200);
      setTimeout(() => {
        animations.value.startAnimation = false;
        animations.value.startRippleAnimation = false;
        emits(
          "updateLike",
          data.data?.likePost.liked as boolean,
          props.statusType,
          props.node?.id as string,
        );
      }, 400);
    } else {
      animations.value.startUnfillAnimation = false;
      emits(
        "updateLike",
        data.data?.likePost.liked,
        props.statusType,
        props.node?.id as string,
      );
    }
  }
});

onLikeError((error) => {
  console.log("Like Post error", error);
});

const totalOdds = computed(() => {
  let odds = 1;
  const items =
    props.node?.predictionpostitemSet.edges?.map((edge) => edge.node) ?? [];

  for (const item of items) {
    odds *= item.odds;
  }

  return odds.toFixed(2);
});
</script>

<template>
  <ContainersDialog>
    <div class="w-full flex flex-col gap-y-3 px-4 py-4">
      <SectionsAccountHeaderCard :name="penName" :img-url="imgUrl" />
      <UiCardDetails>
        <div
          class="flex flex-col gap-y-2 px-4 py-2 divide-y divide-c-seperator"
        >
          <div v-for="item in node?.predictionpostitemSet.edges" class="w-full">
            <SectionsAccountPostItem :item="item" />
          </div>
        </div>
      </UiCardDetails>
      <div class="w-full flex items-center justify-between sm:px-4 pt-1">
        <div class="flex items-center gap-x-4 md:gap-x-6">
          <button
            @click="clickLikeBtn"
            class="flex flex-col gap-y-1 justify-center items-center"
          >
            <UiHeartIcon
              :animations="animations"
              :liked="node?.isLikedByMe as boolean"
              class="w-6 h-6"
            />
            <span class="text-xs text-neutral-700">{{ node?.likes }}</span>
          </button>
          <button class="flex flex-col gap-y-1 justify-cente items-center">
            <Icon
              name="mdi:share-variant-outline"
              class="w-5 h-5 text-neutral-700"
            />
            <span class="text-xs text-neutral-700">Share</span>
          </button>
        </div>
        <div class="flex items-center">
          <div
            class="flex items-center gap-x-2.5 sm:gap-x-4 rounded-xl px-3 py-3 divide-x divide-c-seperator"
          >
            <div
              v-if="node?.predictionpostitemSet.edges"
              class="flex items-center"
            >
              <NuxtImg
                :src="node?.predictionpostitemSet.edges[0].node.bookmakerImg"
                class="h-6 sm:h-7 rounded"
              />
            </div>
            <div
              class="flex flex-col sm:flex-row items-center gap-x-1 pr-2 pl-2.5 sm:pl-4 font-medium text-neutral-700"
            >
              <p class="text-xs sm:text-sm">Odds</p>
              <small class="text-xs sm:text-sm">{{ totalOdds }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainersDialog>
</template>
