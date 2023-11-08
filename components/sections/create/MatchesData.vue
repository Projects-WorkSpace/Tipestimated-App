<script setup lang="ts">
import { sportEmojis } from "~/constants/sportsEmojis";
import { ILeagueEntity } from "~/types/types";
import { ISports, ICountry } from "~/types/plays";

const emits = defineEmits<{
  (e: "selectLeague", payload: ILeagueEntity, country: ICountry): void;
  (e: "updateSelectedSport", payload: ISports): void;
  (e: "closeModal"): void;
}>();
const config = useRuntimeConfig();
const selectedSportId = ref<number | null>(null);
const selectedCountries = ref<ILeagueEntity[]>([]);
const currentCountryData = ref<ICountry>({
  COUNTRY_NAME: "",
  COUNTRY_ID: 0,
});
const currentTab = ref(1);
const headerData = {
  "X-RapidAPI-Key": config.public.rapidApiKey,
  "X-RapidAPI-Host": config.public.rapidApiHost,
};
interface IResponseData {
  DATA: ISports[];
}

interface ITournamentList {
  DATA?: ILeagueEntity[] | null;
}

const {
  data: sportsData,
  pending,
  execute: fetchSports,
} = await useAsyncData<IResponseData>(
  "sport",
  () =>
    $fetch("https://flashlive-sports.p.rapidapi.com/v1/sports/list", {
      headers: headerData,
    }),
  { immediate: false },
);

const {
  data: tournamentsData,
  pending: tournamentsPending,
  execute: fetchTournament,
} = await useAsyncData<ITournamentList>(
  "tournaments",
  () =>
    $fetch("https://flashlive-sports.p.rapidapi.com/v1/tournaments/list", {
      headers: headerData,
      params: {
        locale: "en_INT",
        sport_id: selectedSportId.value,
      },
    }),
  {
    immediate: false,
  },
);
const addIcon = (payload: string): string => {
  return (sportEmojis as Record<string, string>)[payload] || "";
};
// Separate "Main" and "Other" sports
const mainSports = computed(() => {
  return sportsData.value?.DATA.filter((sport) =>
    [1, 3, 5, 6, 8].includes(sport.ID),
  );
});

const selectSport = (sport: ISports) => {
  selectedSportId.value = sport.ID;
  emits("updateSelectedSport", sport);
  nextTab();
  fetchTournament();
};

const nextTab = () => {
  if (currentTab.value < 3) {
    currentTab.value++;
  }
};
const previousTab = () => {
  if (currentTab.value > 1) {
    currentTab.value--;
  }
};

const uniqueCountries = computed(() => {
  const uniqueCountryInfoSet = new Set<string>(); // Ensure Set stores strings

  tournamentsData.value?.DATA?.forEach((item) => {
    const countryInfo = {
      COUNTRY_ID: item.COUNTRY_ID,
      COUNTRY_NAME: item.COUNTRY_NAME,
    };
    uniqueCountryInfoSet.add(JSON.stringify(countryInfo));
  });

  return Array.from(uniqueCountryInfoSet).map(
    (str) => JSON.parse(str) as { COUNTRY_ID: number; COUNTRY_NAME: string },
  );
});

const selectCountry = (payload: ICountry) => {
  currentCountryData.value = payload;
  let foundData = tournamentsData.value?.DATA?.filter(
    (country) => country.COUNTRY_ID === payload.COUNTRY_ID,
  );
  if (foundData) {
    selectedCountries.value = foundData;
  }
  nextTab();
};

const selectedLeague = (payload: ILeagueEntity) => {
  emits("selectLeague", payload, currentCountryData.value);
};

//
onMounted(() => {
  fetchSports();
});
</script>
<template>
  <div class="w-full py-4 flex flex-col gap-y-2 bg-white h-full min-h-[45vh] max-h-[55vh]">
    <!-- <h3>Matches Data</h3> -->
    <Transition mode="out-in">
      <div v-if="currentTab === 1" class="w-full flex flex-col gap-y-3 bg-white">
        <h4 class="text-lg text-neutral-700 font-medium z-10 px-4 text-center">
          Select Sport
        </h4>
        <button @click="emits('closeModal')" class="absolute right-6 text-neutral-600 hover:text-neutral-800 z-[99]">
          <Icon name="mdi:close" class="text-xl" />
        </button>

        <Transition mode="out-in">
          <div v-if="pending"
            class="w-full flex flex-col items-center justify-center absolute bg-white top-0 bottom-0 left-0 right-0 z-0">
            <UtilsStarLoading />
          </div>
          <div v-else class="w-full flex flex-col gap-y-3 px-4 sm:px-6">
            <div class="w-full mt-4">
              <ul class="w-full grid grid-cols-2 gap-x-3 gap-y-4">
                <li v-for="sport in mainSports" :key="sport.ID" class="w-full flex flex-col">
                  <button @click="selectSport(sport)" :class="sport.ID === selectedSportId
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-c-seperator/60 hover:bg-c-seperator/75'
                    "
                    class="flex items-center justify-center gap-x-2 flex-nowrap py-2 px-2 rounded-md transition-colors">
                    <span class="text-base">{{ addIcon(sport.NAME) }}</span>
                    <span class="truncate text-sm">{{ sport.NAME }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
      <div v-else-if="currentTab === 2" class="w-full flex flex-col gap-y-2 bg-white divide-y divide-neutral-300">
        <div class="w-full flex gap-x-3 items-center z-10 px-4 pb-1.5">
          <button @click="previousTab" class="flex items-center group">
            <UIcon name="i-heroicons-arrow-left-20-solid"
              class="w-5 h-5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
          </button>
          <h4 class="text-lg text-neutral-700 font-normal leading-none">
            Countries
          </h4>
        </div>
        <Transition>
          <div v-if="tournamentsPending"
            class="w-full flex flex-col items-center justify-center absolute bg-white top-0 bottom-0 left-0 right-0 z-0">
            <UtilsStarLoading />
          </div>
          <div v-else class="w-full flex flex-col px-4">
            <SectionsCreateCountriesCommandPalette :countries="uniqueCountries" @select-country="selectCountry" />
          </div>
        </Transition>
      </div>
      <div v-else-if="currentTab === 3" class="w-full flex flex-col h-full gap-y-2 divide-y divide-neutral-300">
        <div class="w-full flex gap-x-3 items-center z-10 px-4 pb-1.5 bg-white">
          <button @click="previousTab" class="flex items-center group">
            <UIcon name="i-heroicons-arrow-left-20-solid"
              class="w-5 h-5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
          </button>
          <h4 class="text-base text-neutral-700 font-normal leading-none">
            {{ currentCountryData.COUNTRY_NAME }} Leagues
          </h4>
        </div>
        <div class="w-full flex flex-col px-4">
          <SectionsCreateLeaguesPalette :leagues="selectedCountries" @select-league="selectedLeague" />
        </div>
      </div>
    </Transition>
  </div>
</template>
