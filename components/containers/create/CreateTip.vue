<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/authStore";
import { usePageFeatureStore } from "~/store/pageFeatures";
import { DialogTitle } from "@headlessui/vue";
import { ILeagueEntity } from "~/types/types";
import { GetChannelsAndGroups, CreatePost } from "@/graphql/create";
import {
  IChannelsAndGroups,
  NodeData,
  ICreatePostResponse,
} from "@/types/create";
import {
  IFixturesEventsEntity,
  IPredictionScore,
  ISports,
  IBookmaker,
  ICountry,
  ITipData,
} from "~/types/plays";

const { tipsterPayload } = storeToRefs(useAuthStore());
const featureStore = usePageFeatureStore();
const { openCreate } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;
const router = useRouter();
const toast = useToast();

// Tip creation data
const newTipData = ref<ITipData>({
  leagueData: null,
  matchData: null,
  selectedSport: null,
  predictionScore: null,
  selectedBookmaker: null,
  selectedCountry: null,
  predictionOdds: null,
});
const createNewTipData = ref<ITipData[]>([newTipData.value]);
const indexOfNewTipData = ref(1);

// Groups & Channels data
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

// show counts of selected groups & channels
const countSelectedGroups = computed(() => {
  return groups.value.filter((group) => group.checked).length;
});
const countSelectedChannels = computed(() => {
  return channels.value.filter((channel) => channel.checked).length;
});

//
const emptyTipData = {
  leagueData: null,
  matchData: null,
  selectedSport: null,
  predictionScore: null,
  selectedBookmaker: null,
  selectedCountry: null,
  predictionOdds: null,
};

const checkPreviousTipBtn = computed(() => {
  return indexOfNewTipData.value > 1;
});
const checkNextTipBtn = computed(() => {
  return indexOfNewTipData.value < createNewTipData.value.length;
});

const goToPreviousCreatedTip = () => {
  createNewTipData.value[indexOfNewTipData.value - 1] = newTipData.value;
  indexOfNewTipData.value -= 1;
  newTipData.value = createNewTipData.value[indexOfNewTipData.value - 1];
};

const goToNextCreatedTip = () => {
  createNewTipData.value[indexOfNewTipData.value - 1] = newTipData.value;
  indexOfNewTipData.value += 1;
  newTipData.value = createNewTipData.value[indexOfNewTipData.value - 1];
};

// Add another function
const addMoreMatchTip = () => {
  if (newTipData.value["predictionOdds"] !== null) {
    // handle the current active input data
    createNewTipData.value[indexOfNewTipData.value - 1] = newTipData.value;
    let data = {
      leagueData: null,
      matchData: null,
      selectedSport: null,
      predictionScore: null,
      selectedBookmaker: null,
      selectedCountry: null,
      predictionOdds: null,
    };
    createNewTipData.value.push(data);
    newTipData.value = data;
    indexOfNewTipData.value = createNewTipData.value.length;
  }
};

const clearAllData = () => {
  indexOfNewTipData.value = 1;
  createNewTipData.value = [emptyTipData];
  newTipData.value = emptyTipData;
};

const clearCurrentData = () => {
  if (indexOfNewTipData.value < createNewTipData.value.length) {
    newTipData.value = createNewTipData.value[indexOfNewTipData.value]; // update the new tipdata input
    createNewTipData.value.splice(indexOfNewTipData.value - 1, 1);
  } else if (indexOfNewTipData.value === createNewTipData.value.length) {
    indexOfNewTipData.value -= 1;
    createNewTipData.value.pop();
    newTipData.value = createNewTipData.value[indexOfNewTipData.value - 1];
  }
};

const checkIfClearCurrent = computed(() => {
  return (
    indexOfNewTipData.value < createNewTipData.value.length ||
    indexOfNewTipData.value !== 1
  );
});

// Fetch channels and groups func
const fetchChannelsAndGroups = async () => {
  if (tipsterPayload.value === undefined) {
    console.log("Fetching channels check tipsterID");
    router.push("/accounts/login");
    return;
  }
  channels.value, (groups.value = []), [];
  const { onResult, onError } = useQuery<IChannelsAndGroups>(
    GetChannelsAndGroups,
    { tipsterId: tipsterPayload.value.tipsterID },
  );

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

// Post created matches
const { onDone, onError, loading } =
  useMutation<ICreatePostResponse>(CreatePost);
const submitCreatedMatches = () => {
  // update to created data the current edited data
  createNewTipData.value[indexOfNewTipData.value - 1] = newTipData.value;

  // check valid data
  const inValidIndex = createNewTipData.value.findIndex(
    (data) => data.predictionOdds === null,
  );
  if (inValidIndex !== -1) {
    toastError("One or more fields is missing");
    newTipData.value = createNewTipData.value[inValidIndex];
    indexOfNewTipData.value = inValidIndex + 1;
  } else {
    console.log("Submitted posts valid data array");
  }
};

const toastError = (title: string) => {
  toast.add({
    title: "Invalid data",
    description: title,
    ui: {
      title: "text-t-gray font-medium",
      description: "text-t-gray text-sm",
      progress: {
        base: "absolute bottom-0 end-0 start-0 h-0",
      },
      icon: {
        color: "text-[tomato]",
      },
    },
    icon: "i-heroicons-information-circle",
    timeout: 3000,
  });
};

//

onMounted(() => {
  fetchChannelsAndGroups();
});
</script>
<template>
  <ModalsModalContainer
    :is-open="openCreate"
    @close-modal="updateOpenCreateModal"
  >
    <div class="w-full flex flex-col justify-between gap-y-3 min-h-[30vh]">
      <div class="w-full flex flex-col">
        <DialogTitle as="div" class="flex items-center justify-center relative">
          <h3 class="text-lg font-semibold leading-6 text-gray-900">
            Create Tip
          </h3>
          <button
            @click="updateOpenCreateModal"
            class="absolute right-1 text-neutral-600 hover:text-neutral-800"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
          <div
            v-if="createNewTipData.length > 0"
            class="absolute left-1 flex items-center gap-x-1"
          >
            <UTooltip text="Previous" v-if="checkPreviousTipBtn">
              <UButton
                @click="goToPreviousCreatedTip"
                icon="i-heroicons-arrow-uturn-left"
                color="gray"
                :ui="{ rounded: 'rounded-full' }"
                class="rtl:[&_span:first-child]:rotate-180 me-2"
              />
            </UTooltip>
            <UTooltip text="Next" v-if="checkNextTipBtn">
              <UButton
                @click="goToNextCreatedTip"
                icon="i-heroicons-arrow-uturn-right-20-solid"
                color="gray"
                :ui="{ rounded: 'rounded-full' }"
                class="rtl:[&_span:last-child]:rotate-180 ms-2"
              />
            </UTooltip>
          </div>
        </DialogTitle>
        <div class="w-full mt-5 flex flex-col gap-y-2.5 z-10">
          <ContainersCreateSelectLeagueInput
            :label="newTipData.leagueData?.LEAGUE_NAME || 'Select Championship'"
            @select-league="updateLeagueData"
            @update-selected-sport="updateSelectedSport"
          />
          <ContainersCreateSelectMatch
            :matchData="newTipData.matchData"
            :leagueData="newTipData?.leagueData"
            @select-event="selectEvent"
          />
          <ContainersCreateSelectGameScore
            :matchData="newTipData.matchData"
            :prediction-score="newTipData.predictionScore"
            @update-prediction-score="updatePredictionScore"
            :selected-sport="newTipData.selectedSport"
          />
          <ContainersCreateSelectBookmaker
            :prediction-score="newTipData.predictionScore"
            :selected-book-maker="newTipData.selectedBookmaker"
            @select-bookmaker="updateSelectedBookmaker"
          />
          <ContainersCreateEnterGameOdds
            :selected-book-maker="newTipData.selectedBookmaker"
            :prediction-odds="newTipData.predictionOdds"
            @update-prediction-odds="updatePredictionOdds"
          />
        </div>
      </div>
      <div class="w-full flex justify-between items-center mt-2 gap-x-2 py-1">
        <div class="flex items-center">
          <button
            @click="addMoreMatchTip"
            class="flex items-center space-x-1.5 group"
          >
            <span
              class="text-neutral-700 text-base bg-light-hover/80 px-1 py-0.5 border border-c-seperator rounded-md group-hover:text-neutral-800 group-hover:bg-c-seperator"
            >
              <Icon name="mdi:plus" class="text-lg" />
            </span>
            <span class="text-sm text-neutral-600 group-hover:text-neutral-900">
              More
            </span>
          </button>
        </div>
        <div class="flex items-center gap-x-2.5">
          <button
            v-if="checkIfClearCurrent"
            @click="clearCurrentData"
            class="border border-c-seperator/80 bg-c-seperator/60 rounded-md px-2.5 py-1 text-sm hover:bg-c-seperator/80"
          >
            Clear current
          </button>
          <button
            @click="clearAllData"
            class="border border-c-seperator/80 bg-c-seperator/60 rounded-md px-2.5 py-1 text-sm hover:bg-c-seperator/80"
          >
            Clear all
          </button>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 items-center pt-3.5 gap-x-6 gap-y-4 border-t border-c-seperator"
      >
        <div class="grid grid-cols-2 items-center gap-x-3">
          <div class="flex relative">
            <button
              @click="openGroups = !openGroups"
              type="button"
              :class="
                countSelectedGroups > 0
                  ? 'bg-green-500 text-white border-green-500 hover:bg-green-400'
                  : 'border-light-hover bg-light-hover/80 text-neutral-800 hover:bg-light-hover'
              "
              class="w-full flex items-center justify-center rounded-md border px-2.5 py-2 text-sm font-medium focus:outline-none"
            >
              <Icon name="mdi:account-multiple" size="20px" class="mr-1.5" />
              <span class="flex items-center gap-x-1 truncate">
                <span v-if="countSelectedGroups > 0">
                  {{ countSelectedGroups }}
                </span>
                <span class="truncate">Groups</span>
              </span>
            </button>
            <ContainersCreateSelectGroups
              :is-open="openGroups"
              :groups="groups"
              :selected_all="selected_all_groups"
              @toggle-open-groups="openGroups = !openGroups"
              @select-all-groups="selectAllGroups"
              @select-single-group="selectSingleGroup"
              class="z-[99999]"
            />
          </div>

          <div class="flex relative">
            <button
              @click="openChannels = !openChannels"
              type="button"
              :class="
                countSelectedChannels > 0
                  ? 'bg-green-500 text-white border-green-500 hover:bg-green-400'
                  : 'border-light-hover bg-light-hover/80 text-neutral-800 hover:bg-light-hover'
              "
              class="w-full flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium focus:outline-none"
            >
              <Icon name="mdi:bullhorn" size="20px" class="mr-1.5" />
              <span class="flex items-center gap-x-1 truncate">
                <span v-if="countSelectedChannels"
                  >{{ countSelectedChannels }}
                </span>
                <span class="truncate">Channels</span>
              </span>
            </button>
            <ContainersCreateSelectChannels
              :is-open="openChannels"
              :channels="channels"
              :selected_all="selected_all_channels"
              @toggle-open-channels="openChannels = !openChannels"
              @select-single-channel="selectSingleChannel"
              @select-all-channels="selectAllChannels"
              class="z-[99999]"
            />
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 items-center gap-x-3 gap-y-3"
        >
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white focus:outline-none"
          >
            Promote
          </button>
          <button
            @click="submitCreatedMatches"
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  </ModalsModalContainer>
</template>
