<script setup lang="ts">
import { sportEmojis } from "~/constants/sportsEmojis";
import { ILeagueEntity } from "~/types/types";

const emits = defineEmits<{
  (e: 'selectLeague', payload: ILeagueEntity): void
}>()
const config = useRuntimeConfig();
const selectedSportId = ref<number | null>(null);
const selectedCountries = ref<ILeagueEntity[]>([]);
const currentCountryData = ref({
  COUNTRY_NAME: '', COUNTRY_ID: 0
})
const currentTab = ref(1)
const headerData = {
  'X-RapidAPI-Key': config.public.rapidApiKey,
  'X-RapidAPI-Host': config.public.rapidApiHost
}
interface IResponseData {
  DATA: ISports[];
}
interface ISports {
  ID: number;
  NAME: string;
  icon?: string;
}

interface ITournamentList {
  DATA?: (ILeagueEntity)[] | null;
}

const { data: sportsData, pending, error, refresh } = await useLazyFetch<IResponseData>(
  'https://flashlive-sports.p.rapidapi.com/v1/sports/list',
  {
    headers: headerData
  }
)

const { data: tournamentsData, pending: tournamentsPending, execute: fetchTournament, error: tournamentsError } = await useAsyncData<ITournamentList>(
  'tournaments',
  () => $fetch('https://flashlive-sports.p.rapidapi.com/v1/tournaments/list', {
    headers: headerData,
    params: {
      locale: 'en_INT',
      sport_id: selectedSportId.value
    }
  }), {
  immediate: false
})
const addIcon = (payload: string): string => {
  return (sportEmojis as Record<string, string>)[payload] || ""
}
// Separate "Main" and "Other" sports
const mainSports = computed(() => {
  return sportsData.value?.DATA.filter((sport) => sport.ID < 9);
})


const otherSports = computed(() => {
  return sportsData.value?.DATA.filter((sport) => sport.ID >= 9);
})
const selectSport = (sportId: number) => {
  selectedSportId.value = sportId;
  nextTab();
  fetchTournament();
}

const nextTab = () => {
  if (currentTab.value < 3) {
    currentTab.value++;
  }
}
const previousTab = () => {
  if (currentTab.value > 1) {
    currentTab.value--;
  }
}

const uniqueCountries = computed(() => {
  const uniqueCountryInfoSet = new Set<string>(); // Ensure Set stores strings

  tournamentsData.value?.DATA?.forEach((item) => {
    const countryInfo = { COUNTRY_ID: item.COUNTRY_ID, COUNTRY_NAME: item.COUNTRY_NAME };
    uniqueCountryInfoSet.add(JSON.stringify(countryInfo));
  });

  return Array.from(uniqueCountryInfoSet).map((str) => JSON.parse(str) as { COUNTRY_ID: number, COUNTRY_NAME: string });
});

interface ICountry {
  COUNTRY_ID: number;
  COUNTRY_NAME: string
}

const selectCountry = (payload: ICountry) => {
  currentCountryData.value = payload;
  let foundData = tournamentsData.value?.DATA?.filter((country) => country.COUNTRY_ID === payload.COUNTRY_ID);
  if (foundData) {
    selectedCountries.value = foundData;
  }
  nextTab();
}

const selectedLeague = (payload: ILeagueEntity) => {
  //  console.log("From Input Selected league 1: ", payload);
  emits("selectLeague", payload);
}
</script>
<template>
  <div class="w-full py-4 flex flex-col gap-y-2 bg-white h-[74vh] overflow-y-auto">
    <!-- <h3>Matches Data</h3> -->
    <Transition mode="out-in">
      <div v-if="currentTab === 1" class="w-full flex flex-col gap-y-3 bg-white px-4">
        <h4 class="text-base text-neutral-700 font-normal z-10">Select Sport</h4>
        <Transition mode="out-in">
          <div v-if="pending"
            class="w-full flex flex-col items-center justify-center absolute bg-white top-0 bottom-0 left-0 right-0 z-0">
            <UtilsStarLoading />
          </div>
          <div v-else class="w-full flex flex-col gap-y-3">

            <div class="w-full">
              <ul class="w-full flex flex-wrap gap-x-2 gap-y-2">
                <li v-for="sport in mainSports" :key="sport.ID">
                  <button @click="selectSport(sport.ID)"
                    :class="sport.ID === selectedSportId ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-c-seperator/60 hover:bg-c-seperator/75'"
                    class="text-sm py-1 px-2 rounded-md  transition-colors">
                    {{ addIcon(sport.NAME) }} {{ sport.NAME }}
                  </button>
                </li>
              </ul>
            </div>
            <div class="w-full flex flex-col gap-y-2 mt-1.5">
              <p class="text-sm text-neutral-600">Other sports</p>
              <ul class="w-full flex flex-wrap gap-x-2 gap-y-2">
                <li v-for="sport in otherSports" :key="sport.ID">
                  <button @click="selectSport(sport.ID)"
                    :class="sport.ID === selectedSportId ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-c-seperator/60 hover:bg-c-seperator/75'"
                    class="text-sm py-1 px-2 rounded-md  transition-colors">
                    {{ addIcon(sport.NAME) }} {{ sport.NAME }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
      <div v-else-if="currentTab === 2" class="w-full h-full flex flex-col gap-y-2 bg-white divide-y divide-neutral-300">
        <div class="w-full flex gap-x-3 items-center z-10 px-4 pb-1.5">
          <button @click="previousTab" class=" flex items-center group">
            <UIcon name="i-heroicons-arrow-left-20-solid"
              class="w-5 h-5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
          </button>
          <h4 class="text-base text-neutral-700 font-normal leading-none">Countries</h4>
        </div>
        <Transition>
          <div v-if="tournamentsPending"
            class="w-full flex flex-col items-center justify-center absolute bg-white top-0 bottom-0 left-0 right-0 z-0">
            <UtilsStarLoading />
          </div>
          <div v-else class="w-full h-full flex flex-col px-4">
            <SectionsCountriesCommandPalette :countries="uniqueCountries" @select-country="selectCountry" />
          </div>
        </Transition>
      </div>
      <div v-else-if="currentTab === 3" class="w-full flex flex-col h-full gap-y-2 divide-y divide-neutral-300">
        <div class="w-full flex gap-x-3 items-center z-10 px-4 pb-1.5 bg-white">
          <button @click="previousTab" class=" flex items-center group">
            <UIcon name="i-heroicons-arrow-left-20-solid"
              class="w-5 h-5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
          </button>
          <h4 class="text-base text-neutral-700 font-normal leading-none">{{ currentCountryData.COUNTRY_NAME }} Leagues
          </h4>
        </div>
        <div class="w-full flex flex-col px-4">
          <SectionsLeaguesPalette :leagues="selectedCountries" @select-league="selectedLeague" />
        </div>
      </div>
    </Transition>
  </div>
</template>

