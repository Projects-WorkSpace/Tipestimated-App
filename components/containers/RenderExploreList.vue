<script setup lang="ts">
import { ITipstersNode, ITipsterPayload } from "~/types/types";

const props = defineProps<{
  pending: boolean;
  data: ITipstersNode[];
}>();

const emits = defineEmits<{
  (e: "updateFollowStatus", payload: boolean, postId: string): void;
}>();
const tipster_payload = useCookie<ITipsterPayload>("tipster_payload");

const updateFollowStatus = (payload: boolean, tipsterId: string) => {
  emits("updateFollowStatus", payload, tipsterId);
};

const checkIfUserIsSameTipster = (id: string) => {
  if (tipster_payload.value) {
    if (tipster_payload.value.tipsterID === id) {
      return true;
    }
  }
  return false;
};
</script>
<template>
  <div class="w-full flex flex-col">
    <ul v-if="!pending" class="w-full flex flex-col gap-y-2 md:gap-y-3.5">
      <li v-for="item in data" class="w-full">
        <div v-if="!checkIfUserIsSameTipster(item.id)" class="w-full">
          <UiUserExploreDetails
            :data="item"
            @update-follow-status="updateFollowStatus"
          />
        </div>
      </li>
    </ul>
    <ul v-else class="w-full flex flex-col gap-y-2 md:gap-y-3.5">
      <li class="w-full">
        <UtilsSkeletonLoader />
      </li>
      <li class="w-full">
        <UtilsSkeletonLoader />
      </li>
      <li class="w-full">
        <UtilsSkeletonLoader />
      </li>
    </ul>
  </div>
</template>
