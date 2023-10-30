<script setup lang="ts">
import { IFixturesEventsEntity, IPredictionScore } from "~/types/plays";

const props = defineProps<{
  matchData: IFixturesEventsEntity | null;
  predictionScore: IPredictionScore | null;
}>();
const emits = defineEmits<{
  (e: "openModal"): void;
}>();
const openModal = () => {
  emits("openModal");
};

const scores = computed(() => {
  if (props.matchData && props.predictionScore) {
    let score = props.predictionScore;

    if (score.name === "matchWinner") {
      return `3 Way Pick: ${score.value}`;
    } else if (score.name === "bothTeamToScore") {
      return `Both Teams To Score: ${score.value}`;
    } else if (score.name === "homeAway") {
      return `${score.value} Win`;
    } else if (score.name === "overUnder") {
      let splitArr = score.value.split("/").map(Number);
      if (splitArr[0]) {
        return `Under: ${splitArr[0]}`;
      } else return `Over:  ${splitArr[1]}`;
    } else if (score.name === "asianHandicap") {
      let splitArr = score.value.split("/").map(Number);
      console.log("AH: ", score.value);
      if (splitArr[0]) {
        return `Asian Handicap: Home ${splitArr[0]}`;
      } else return `Asian Handicap: Away ${splitArr[1]}`;
    } else if (score.name === "scoringQuarter") {
      return `Highest Scoring Quarter: ${score.value}`;
    } else if (score.name === "exactScore") {
      return score.value;
    } else {
      return "";
    }
  }
});
</script>
<template>
  <div class="w-full flex flex-col">
    <button @click="openModal" :class="matchData
        ? 'bg-c-seperator/60 hover:bg-c-seperator/75 text-neutral-700'
        : 'bg-c-seperator/40 text-neutral-500'
      " class="w-full py-3 rounded-md relative flex items-center justify-center transition-colors duration-200">
      <Transition mode="out-in">
        <div v-if="predictionScore" class="flex items-center gap-x-3">
          <span class="text-sm">{{ scores }}</span>
        </div>
        <span v-else class="text-sm font-normal tracking-wide">Enter your prediction</span>
      </Transition>
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>
  </div>
</template>
