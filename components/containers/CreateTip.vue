<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageFeatureStore } from '~/store/pageFeatures';
import { DialogTitle } from '@headlessui/vue'
import { ILeagueEntity } from '~/types/types';
import { IFixturesEventsEntity, IFixtureData } from '~/types/plays';


const featureStore = usePageFeatureStore();
const { openCreate } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;

interface ITipData {
  leagueData: ILeagueEntity | null,
  matchData: IFixturesEventsEntity | null

}

const newTipData = ref<ITipData>({
  leagueData: null,
  matchData: null
})
const currentTournamentData = ref<IFixtureData | null>(null)

const updateLeagueData = (payload: ILeagueEntity) => {
  newTipData.value.leagueData = payload;
  currentTournamentData.value = null;

  // empty the rest of the inputs
  newTipData.value.matchData = null;
}
const selectEvent = (payload: IFixturesEventsEntity, fixtureData: IFixtureData[] | undefined): void => {
  newTipData.value.matchData = payload;
  if (fixtureData) {
    if (fixtureData.length >= 1) {
      currentTournamentData.value = fixtureData[0];
    }
  }
}
</script>
<template>
  <ModalsModalContainer :is-open="openCreate" @close-modal="updateOpenCreateModal">
    <div class="w-full flex flex-col justify-between gap-y-3 min-h-[30vh]">
      <div class="w-full flex flex-col">
        <DialogTitle as="div" class="flex items-center justify-center relative">
          <h3 class="text-lg font-semibold leading-6 text-gray-900">Create Tip</h3>
          <button @click="updateOpenCreateModal" class="absolute right-1 text-neutral-600 hover:text-neutral-800 ">
            <Icon name="mdi:close" class="text-xl" />
          </button>
        </DialogTitle>
        <div class="w-full mt-3.5 flex flex-col gap-y-2.5">

          <ContainersSelectLeagueInput :label="newTipData.leagueData?.LEAGUE_NAME || 'Select Championship'"
            @select-league="updateLeagueData" />
          <ContainersSelectMatch :matchData="newTipData.matchData" :leagueData="newTipData?.leagueData"
            @select-event="selectEvent" />

          <!-- <ContainersSelectInput :label="'Outcome'" /> -->
          <!-- <ContainersSelectInput :label="'Select Bookmaker'" /> -->
          <!-- <ContainersSelectInput :label="'Total odds'" /> -->

        </div>
      </div>
      <div class="w-full flex justify-end items-center mt-2 gap-x-2">

        <button class="flex items-center space-x-1.5 group">
          <span class="text-sm text-neutral-600 group-hover:text-neutral-800">Insert another game</span>
          <span class="text-neutral-700 text-base bg-light-hover/80 px-1 py-0.5 rounded-lg group-hover:text-neutral-800">
            <Icon name="mdi:plus" class="text-lg" />
          </span>
        </button>
      </div>
      <div class="flex items-center justify-between mt-1">
        <div class="flex items-center gap-x-5">
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-light-hover/80 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none"
            @click="updateOpenCreateModal">
            <Icon name="mdi:account-multiple" class="text-xl mr-1" />
            Friends
          </button>
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-light-hover/80 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none">
            <Icon name="mdi:bullhorn" class="text-xl mr-1" />
            Channel
          </button>
        </div>
        <div class="flex items-center gap-x-5">
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white hover:bg-base-green focus:outline-none">
            Promote
          </button>
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-green-500/80 px-4 py-2 text-sm font-medium text-white hover:bg-base-green focus:outline-none">
            Publish
          </button>
        </div>
      </div>
    </div>
  </ModalsModalContainer>
</template>
