<script setup lang="ts">
import { ITipstersEdgesEntity } from '~/types/types';
defineProps<{
  pending: boolean;
  data: ITipstersEdgesEntity[]
}>()
</script>
<template>
  <div class="w-full flex flex-col">
    <ul v-if="!pending" class="w-full flex flex-col gap-y-2 md:gap-y-3.5">
      <li v-for="item in data" class="w-full">
        <UiUserExploreDetails :data="item.node" />
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
