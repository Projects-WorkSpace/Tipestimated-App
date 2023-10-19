<script setup lang="ts">
import { ITipstersNode } from '~/types/types';

const props = defineProps<{
  pending: boolean;
  data: ITipstersNode[]
}>()

const emits = defineEmits<{
  (e: "updateFollowStatus", payload: boolean, postId: string): void
}>()

const updateFollowStatus = (payload: boolean, tipsterId: string) => {
  emits("updateFollowStatus", payload, tipsterId)
}

</script>
<template>
  <div class="w-full flex flex-col">
    <ul v-if="!pending" class="w-full flex flex-col gap-y-2 md:gap-y-3.5">
      <li v-for="item in data" class="w-full">
        <UiUserExploreDetails :data="item" @update-follow-status="updateFollowStatus" />
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
