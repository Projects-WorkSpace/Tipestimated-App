<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePageFeatureStore } from "~/store/pageFeatures";
import { DialogTitle } from "@headlessui/vue";
import { ILeagueEntity } from "~/types/types";
import { GetChannelsAndGroups } from "@/graphql/create";
import { IChannelsAndGroups, NodeData } from "@/types/create";
import {
  IFixturesEventsEntity,
  IPredictionScore,
  ISports,
  IBookmaker,
  ICountry,
  ITipData,
} from "~/types/plays";

const featureStore = usePageFeatureStore();
const { openCreate } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;
const newTipData = ref<ITipData>({
  leagueData: null,
  matchData: null,
  selectedSport: null,
  predictionScore: null,
  selectedBookmaker: null,
  selectedCountry: null,
  predictionOdds: null,
});
const openGroups = ref(false);
const openChannels = ref(false);
const channels = ref<NodeData[]>([]);
const groups = ref<NodeData[]>([]);
const selected_all_channels = ref(false);
const selected_all_groups = ref(false);

const updateSelectedSport = (sport: ISports) => {
  newTipData.value.selectedSport = sport;
};

const updateLeagueData = (payload: ILeagueEntity, country: ICountry) => {
  newTipData.value.leagueData = payload;
  newTipData.value.selectedCountry = country;
  clearSubsequentFields([
    "selectedBookmaker",
    "matchData",
    "predictionScore",
    "predictionOdds",
  ]);
};
const selectEvent = (payload: IFixturesEventsEntity): void => {
  newTipData.value.matchData = payload;
  clearSubsequentFields([
    "selectedBookmaker",
    "predictionScore",
    "predictionOdds",
  ]);
};

const updatePredictionScore = (payload: IPredictionScore) => {
  newTipData.value.predictionScore = payload;
  clearSubsequentFields(["selectedBookmaker", "predictionOdds"]);
};

const updateSelectedBookmaker = (bookmaker: IBookmaker) => {
  newTipData.value.selectedBookmaker = bookmaker;
  clearSubsequentFields(["predictionOdds"]);
};

const updatePredictionOdds = (value: number) => {
  newTipData.value.predictionOdds = value;
};

const clearSubsequentFields = (fieldsToClear: string[]) => {
  for (const field of fieldsToClear) {
    if (field in newTipData.value) {
      newTipData.value[field as keyof ITipData] = null;
    }
  }
};

// Channels selection
const selectAllChannels = (payload: boolean) => {
  for (const channel of channels.value) {
    channel.checked = payload;
  }
  selected_all_channels.value = payload;
};

const selectSingleChannel = (payload: boolean, id: string) => {
  const channelIndex = channels.value.findIndex((channel) => channel.id === id);
  if (channelIndex !== -1) {
    channels.value[channelIndex].checked = payload;
  }
  selected_all_channels.value = channels.value.every(
    (channel) => channel.checked,
  );
};

// Groups selection
const selectAllGroups = (payload: boolean) => {
  for (const group of groups.value) {
    group.checked = payload;
  }
  selected_all_groups.value = payload;
};

const selectSingleGroup = (payload: boolean, id: string) => {
  const groupIndex = groups.value.findIndex((group) => group.id === id);
  if (groupIndex !== -1) {
    groups.value[groupIndex].checked = payload;
  }
  selected_all_groups.value = groups.value.every((group) => group.checked);
};

// Fetch channels and groups func
const fetchChannelsAndGroups = async () => {
  channels.value, (groups.value = []), [];
  const { onResult, onError } =
    useQuery<IChannelsAndGroups>(GetChannelsAndGroups);
  onResult((res) => {
    if (res.data.allChannels.edges) {
      for (const data of res.data.allChannels.edges) {
        channels.value.push({ ...data.node, checked: false });
      }
    }
    if (res.data.allGroups.edges) {
      for (const data of res.data.allGroups.edges) {
        groups.value.push({ ...data.node, checked: false });
      }
    }
  });
  onError((err) => {
    console.log("Get Channels & Groups Error: ", err.message);
  });
};

//

onMounted(() => {
  fetchChannelsAndGroups();
});
</script>
<template>
  <ModalsModalContainer :is-open="openCreate" @close-modal="updateOpenCreateModal">
    <div class="w-full flex flex-col justify-between gap-y-3 min-h-[30vh]">
      <div class="w-full flex flex-col">
        <DialogTitle as="div" class="flex items-center justify-center relative">
          <h3 class="text-lg font-semibold leading-6 text-gray-900">
            Create Tip
          </h3>
          <button @click="updateOpenCreateModal" class="absolute right-1 text-neutral-600 hover:text-neutral-800">
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </DialogTitle>
        <div class="w-full mt-5 flex flex-col gap-y-2.5 z-10">
          <ContainersCreateSelectLeagueInput :label="newTipData.leagueData?.LEAGUE_NAME || 'Select Championship'"
            @select-league="updateLeagueData" @update-selected-sport="updateSelectedSport" />
          <ContainersCreateSelectMatch :matchData="newTipData.matchData" :leagueData="newTipData?.leagueData"
            @select-event="selectEvent" />
          <ContainersCreateSelectGameScore :matchData="newTipData.matchData"
            :prediction-score="newTipData.predictionScore" @update-prediction-score="updatePredictionScore"
            :selected-sport="newTipData.selectedSport" />
          <ContainersCreateSelectBookmaker :prediction-score="newTipData.predictionScore"
            :selected-book-maker="newTipData.selectedBookmaker" @select-bookmaker="updateSelectedBookmaker" />
          <ContainersCreateEnterGameOdds :selected-book-maker="newTipData.selectedBookmaker"
            :prediction-odds="newTipData.predictionOdds" @update-prediction-odds="updatePredictionOdds" />
        </div>
      </div>
      <div class="w-full flex justify-end items-center mt-2 gap-x-2 py-1">
        <button class="flex items-center space-x-1.5 group">
          <span class="text-sm text-neutral-600 group-hover:text-neutral-800">
            Insert another game
          </span>
          <span class="text-neutral-700 text-base bg-light-hover/80 px-1 py-0.5 rounded-lg group-hover:text-neutral-800">
            <Icon name="mdi:plus" class="text-lg" />
          </span>
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 items-center mt-1 gap-x-6 gap-y-4">
        <div class="grid grid-cols-2 items-center gap-x-3">
          <div class="flex relative">
            <button @click="openGroups = !openGroups" type="button"
              class="w-full flex items-center justify-center rounded-md border border-transparent bg-light-hover/80 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none">
              <Icon name="mdi:account-multiple" size="20px" class="mr-1.5" />
              <span>Groups</span>
            </button>
            <ContainersCreateSelectGroups :is-open="openGroups" :groups="groups" :selected_all="selected_all_groups"
              @toggle-open-groups="openGroups = !openGroups" @select-all-groups="selectAllGroups"
              @select-single-group="selectSingleGroup" class="z-[99999]" />
          </div>

          <div class="flex relative">
            <button @click="openChannels = !openChannels" type="button"
              class="w-full flex items-center justify-center rounded-md border border-transparent bg-light-hover/80 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none">
              <Icon name="mdi:bullhorn" size="20px" class="mr-1.5" />
              <span>Channel</span>
            </button>
            <ContainersCreateSelectChannels :is-open="openChannels" :channels="channels"
              :selected_all="selected_all_channels" @toggle-open-channels="openChannels = !openChannels"
              @select-single-channel="selectSingleChannel" @select-all-channels="selectAllChannels" class="z-[99999]" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-x-3 gap-y-3">
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white focus:outline-none">
            Promote
          </button>
          <button type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none">
            Publish
          </button>
        </div>
      </div>
    </div>
  </ModalsModalContainer>
</template>
