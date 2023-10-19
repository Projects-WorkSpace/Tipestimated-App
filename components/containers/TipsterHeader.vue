<script setup lang="ts">
import { ISingleTipster, IFollowTipster, IUnFollowTipster } from "~/types/accounts"
import { IPayload } from "~/types/types"
import { FollowTipster, UnFollowTipster } from "~/graphql/accounts"
const props = defineProps<{
  tipster: ISingleTipster;
}>();

const emits = defineEmits<{
  (e: "updateFollowStatus", payload: boolean): void
}>()

const route = useRoute()
const { getToken } = useApollo()
const user_payload = useCookie<IPayload>("user_payload");
const { mutate: postFollowData, onDone: onFollow, onError: onFollowError } = useMutation<IFollowTipster>(FollowTipster);
const { mutate: postUnFollowData, onDone: onUnFollow, onError: onUnFollowError } = useMutation<IUnFollowTipster>(UnFollowTipster);

const followTipster = async () => {
  const token = await getToken()
  if (token && user_payload.value) {
    postFollowData({ userId: user_payload.value.userID, tipsterId: route.params.tipsterID })
  } else {
    console.log("User must be logged in");
  }
}

const unFollowTipster = async () => {
  const token = await getToken()
  if (token && user_payload.value) {
    postUnFollowData({ userId: user_payload.value.userID, tipsterId: route.params.tipsterID })
  } else {
    console.log("User must be logged in");
  }
}

onFollow((data) => {
  if (data.data?.followTipster.errors === null) {
    emits("updateFollowStatus", true);
  } else {
    console.log("Post errors: ", data.data?.followTipster.errors)
  }
})
onFollowError((error) => {
  console.log("Data error: ", error)
})

onUnFollow((data) => {
  if (data.data?.unFollowTipster.success) {
    emits("updateFollowStatus", false);
  } else {
    console.log("Unfollow Post errors: ", data.data?.unFollowTipster.errors)
  }
})
onUnFollowError((error) => {
  console.log("Unfollow Data error: ", error)
})


</script>
<template>
  <div class="w-full flex flex-col items-center gap-y-2 md:gap-y-4">
    <header class="w-full md:w-[86%] flex items-center gap-x-5 md:gap-x-10">
      <UiOtherAvatar :img-url="tipster.imageUrl" w-and-h="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32" />
      <div class="flex flex-col items-center gap-y-4 grow">
        <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-y-4 md:gap-y-2.5">
          <div class="flex md:flex-col items-baseline md:items-start gap-x-2">
            <span class="text-sm md:text-lg md:font-medium lowercase">{{ tipster.penName }}</span>
            <span class="text-xl font-medium md:hidden">{{ tipster.user.userName }}</span>
          </div>
          <div class="flex items-center justify-between gap-x-1.5 md:gap-x-2.5">
            <div class="">
              <button v-if="tipster.isFollowedByUser" @click="unFollowTipster"
                class="bg-c-seperator/60 text-neutral-900 font-medium text-sm rounded-lg px-3 sm:px-4 md:px-6 py-1.5 md:py-2 hover:bg-c-seperator transition duration-200 flex items-center">
                <span>Following</span>
              </button>
              <button v-else @click="followTipster"
                class="bg-c-seperator/60 text-neutral-900 font-medium text-sm rounded-lg px-3 sm:px-4 md:px-6 py-1.5 md:py-2 hover:bg-c-seperator transition duration-200 flex items-center">
                <span>Follow</span>
                <!-- <Icon name="ph:caret-down" class="ml-1" /> -->
              </button>
            </div>
            <div class="">
              <button
                class="bg-c-seperator/60 text-neutral-900 font-medium text-sm rounded-lg px-3 sm:px-4 md:px-6 py-1.5 md:py-2 hover:bg-c-seperator transition duration-200">Message</button>
            </div>
            <div class="flex items-center ml-0.5">
              <button
                class="border border-c-seperator/50 p-1.5 rounded-lg  hover:border-c-seperator/70 hover:bg-c-seperator/30">
                <Icon name="ph:share-network" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full hidden md:flex">
          <h4 class="text-xl font-medium">{{ tipster.user.userName }}</h4>
        </div>
        <div class="w-full hidden md:flex flex-col space-y-2">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">#1</span>
              <span class="text-sm md:text-base">Ranking</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">99%</span>
              <span class="text-sm md:text-base">ROI</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">{{ tipster.followerCount }}</span>
              <span class="text-sm md:ext-base">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full flex md:hidden flex-col-reverse space-y-2 gap-y-2 px-2 mt-2">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">#3</span>
          <span class="text-sm md:text-base">Ranking</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">82%</span>
          <span class="text-sm md:text-base">ROI</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">10K</span>
          <span class="text-sm md:ext-base">Followers</span>
        </div>
      </div>
    </div>

  </div>
</template>
