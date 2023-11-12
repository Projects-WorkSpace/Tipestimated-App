<script setup lang="ts">
import { storeToRefs } from "pinia";
import { TipsterFollowers } from "~/graphql/schema";
import { ITipsters, ITipstersNode } from "~/types/types";
import { useAuthStore } from "~/store/authStore";

const authStore = useAuthStore();
const { if_less_followers } = storeToRefs(authStore);
const searchText = ref("");
const searchedData = ref<ITipstersNode[]>([]);
const tipsterList = ref<ITipstersNode[]>([]);

const loading_search = ref(true);

const fetchTipsters = async () => {
  loading_search.value = true;
  const { onResult, onError } = useQuery<ITipsters>(TipsterFollowers, {
    first: 20,
  });
  onResult((result) => {
    loading_search.value = false;
    tipsterList.value =
      result.data.allTipsters.edges?.map((edge) => edge.node) ?? [];
  });
  onError((error) => {
    loading_search.value = false;
    console.log("Fetch error: ", error);
  });
};

const searchTipsters = async () => {
  loading_search.value = true;
  const { onResult, onError } = useQuery<ITipsters>(TipsterFollowers, {
    penName: searchText.value,
  });
  onResult((result) => {
    loading_search.value = false;
    searchedData.value =
      result.data.allTipsters.edges?.map((edge) => edge.node) ?? [];
  });
  onError((error) => {
    loading_search.value = false;
    console.log("Fetch error: ", error);
  });
};

const debouncedSearchTipsters = useDebounceFn(() => {
  searchTipsters();
}, 300); // Debounce search function

watch(searchText, (newSearchText, oldSearchText) => {
  debouncedSearchTipsters();
});

const updateFollowStatusSuggestions = (payload: boolean, tipsterId: string) => {
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

const updateFollowStatusSearched = (payload: boolean, tipsterId: string) => {
  let tipsterIndex = searchedData.value.findIndex(
    (edge) => edge.id === tipsterId,
  );
  if (tipsterIndex !== -1) {
    let node = { ...searchedData.value[tipsterIndex] };
    node.isFollowedByUser = payload;
    node.followerCount += payload ? 1 : -1;
    searchedData.value[tipsterIndex] = { ...node };
  }
};

onMounted(() => {
  fetchTipsters();
});
</script>
<template>
  <div class="w-full flex flex-col py-4 md:py-3 gap-y-6 md:mt-0">
    <header class="w-full flex items-center gap-x-1.5 md:gap-x-3">
      <div class="grow flex items-center relative">
        <input v-model="searchText" type="search"
          class="w-full py-2.5 pr-4 pl-10 rounded-xl text-base tracking-wide placeholder:text-neutral-500/60 bg-white focus:outline-none border border-transparent focus:border-c-seperator hover:border-c-seperator transition duration-200"
          placeholder="Type to search..." />
        <Icon name="ph:magnifying-glass" class="text-base absolute left-3.5 text-neutral-500" />
      </div>
    </header>
    <div v-if="searchText" class="w-full flex flex-col gap-y-2 mt-5">
      <div v-if="searchedData" class="w-full">
        <ContainersRenderExploreList :pending="loading_search" :data="searchedData"
          @update-follow-status="updateFollowStatusSearched" />
      </div>
      <div v-else class="w-full flex flex-col items-center min-h-[6rem]">
        <p>No results found.</p>
      </div>
    </div>
    <div v-else class="w-full flex flex-col gap-y-6">
      <p v-if="if_less_followers" class="text-sm text-neutral-500 italic">
        You should atleast follow 2 tipsters.
      </p>
      <div class="w-full flex flex-col gap-y-2 mt-2">
        <h4 class="tracking-wide text-lg md:text-xl text-neutral-600">
          Suggested
        </h4>
        <ContainersRenderExploreList :pending="loading_search" :data="tipsterList"
          @update-follow-status="updateFollowStatusSuggestions" />
      </div>
    </div>
  </div>
</template>
