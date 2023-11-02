<script setup lang="ts">
import { IFixturesData, IFixturesEventsEntity } from "~/types/plays";
import { ILeagueEntity, STAGESEntity } from "~/types/types";

const props = defineProps<{
  leagueData: ILeagueEntity | null;
}>();

const emits = defineEmits<{
  (e: "selectEvent", payload: IFixturesEventsEntity): void;
}>();

const config = useRuntimeConfig();
const selectedStage = ref<STAGESEntity | null>(null);
const headerData = {
  "X-RapidAPI-Key": config.public.rapidApiKey,
  "X-RapidAPI-Host": config.public.rapidApiHost,
};

const activeStage = computed(() => {
  if (selectedStage.value) {
    return selectedStage.value;
  } else {
    if (props.leagueData) {
      if (props.leagueData?.STAGES) {
        if (props.leagueData.STAGES?.length >= 1) {
          return props.leagueData?.STAGES[0];
        }
      }
    }
    return null;
  }
});

const {
  data,
  error,
  pending,
  refresh: refetchFIxtures,
} = await useLazyAsyncData<IFixturesData>(
  "fixtures",
  () =>
    $fetch("https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures", {
      headers: headerData,
      params: {
        locale: "en_INT",
        tournament_stage_id: activeStage.value?.STAGE_ID,
        page: 1,
      },
    }),
  {
    //immediate: false
  },
);

const chooseStage = (stage: STAGESEntity) => {
  selectedStage.value = stage;
  refetchFIxtures();
};
const selectEvent = (payload: IFixturesEventsEntity) => {
  emits("selectEvent", payload);
};
</script>
<template>
  <div class="w-full py-4 flex flex-col gap-y-2 bg-white divide-y divide-neutral-300">
    <div class="w-full px-4 flex flex-nowrap overflow-x-auto gap-2.5 items-center py-1">
      <button v-for="item in leagueData?.STAGES" :key="item.STAGE_ID" @click="chooseStage(item)" :class="activeStage?.STAGE_ID === item.STAGE_ID
          ? 'bg-green-500 text-white '
          : 'text-neutral-700 bg-c-seperator/60 hover:bg-c-seperator/90'
        " class="px-3 py-1 text-sm rounded-md flex items-center transition-colors duration-200 truncate">
        {{ item.STAGE_NAME }}
      </button>
    </div>
    <Transition mode="out-in">
      <div v-if="error" class="w-full h-[68vh] flex flex-col py-6 px-4 items-start">
        <p class="text-neutral-700 flex">
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5 ms-auto text-red-500 mr-2" />
          We couldn't load the matches for this stage at the moment.
        </p>
      </div>

      <div v-else class="w-full h-full px-4 flex flex-col relative">
        <SectionsCreateGamesPalette :events="data?.DATA[0] || null" :loading="pending" @select-event="selectEvent" />
      </div>
    </Transition>
  </div>
</template>
