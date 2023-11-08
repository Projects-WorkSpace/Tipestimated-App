<script setup lang="ts">
import { ILeagueEntity } from "~/types/types";
import { IFixturesEventsEntity } from "~/types/plays";

const props = defineProps<{
  matchData: IFixturesEventsEntity | null;
  leagueData: ILeagueEntity | null;
}>();

const emits = defineEmits<{
  (e: "selectEvent", payload: IFixturesEventsEntity): void;
}>();

const isOpen = ref(false);
const openModal = () => {
  if (props.leagueData) {
    isOpen.value = true;
  }
};
const selectEvent = (payload: IFixturesEventsEntity) => {
  emits("selectEvent", payload);
  isOpen.value = false;
};
</script>
<template>
  <div class="w-full">
    <button
      @click="openModal"
      :class="
        leagueData === null
          ? 'bg-c-seperator/40 text-neutral-500'
          : 'bg-c-seperator/60 hover:bg-c-seperator/75 text-neutral-700'
      "
      class="w-full px-8 py-3 rounded-md relative truncate flex items-center justify-center transition-colors duration-200"
    >
      <Transition mode="out-in">
        <div
          v-if="matchData"
          class="w-full flex items-center justify-center truncate gap-x-3"
        >
          <div class="flex gap-x-1 items-center">
            <NuxtImg :src="matchData?.HOME_IMAGES[0] || ''" class="w-4 h-4" />
            <span
              class="text-sm font-normal tracking-wide text-ellipsis overflow-hidden"
              >{{ matchData?.HOME_NAME }}</span
            >
          </div>
          <span class="text-sm font-normal tracking-wide">-</span>
          <div class="flex gap-x-1 items-center truncate">
            <NuxtImg :src="matchData?.AWAY_IMAGES[0] || ''" class="w-4 h-4" />
            <p
              class="text-sm font-normal tracking-wide text-ellipsis overflow-hidden"
            >
              {{ matchData?.AWAY_NAME }}
            </p>
          </div>
        </div>
        <span v-else class="text-sm font-normal tracking-wide"
          >Select Match</span
        >
      </Transition>
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>
    <UModal
      v-model="isOpen"
      :overlay="false"
      :ui="{
        width: 'w-[110%]',
        height: 'min-h-[60vh]',
        background: 'bg-white',
        rounded: 'rounded-xl',
        container: 'flex min-h-full items-center justify-center text-center',
      }"
      class="z-[99999]"
    >
      <SectionsCreateGamesList
        :league-data="leagueData"
        @select-event="selectEvent"
      />
    </UModal>
  </div>
</template>
