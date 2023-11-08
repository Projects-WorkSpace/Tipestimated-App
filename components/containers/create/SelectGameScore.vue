<script setup lang="ts">
import {
  IFixturesEventsEntity,
  IExactScore,
  IOverUnder,
  IAsianHandicap,
  IPredictionScore,
  ISports,
} from "~/types/plays";

const props = defineProps<{
  matchData: IFixturesEventsEntity | null;
  predictionScore: IPredictionScore | null;
  selectedSport: ISports | null;
}>();
const emits = defineEmits<{
  (e: "updatePredictionScore", payload: IPredictionScore): void;
}>();

const exactScoreValue = ref<IExactScore | null>(null);
const overUnderScoreValue = ref<IOverUnder | null>(null);
const asianHandicapScoreValue = ref<IAsianHandicap | null>(null);
const homeAwayScoreValue = ref("");
const matchWinnerScoreValue = ref("");
const bothToScoreValue = ref("");
const scoringQuarter = ref("");

const isOpen = ref(false);
const openModal = () => {
  if (props.matchData) {
    isOpen.value = true;
  }
};
const closeModal = () => {
  isOpen.value = false;
};

onMounted(() => {
  if (props.predictionScore) {
    let score = props.predictionScore;
    if (score.name === "matchWinner") {
      matchWinnerScoreValue.value = score.value;
    } else if (score.name === "bothTeamToScore") {
      bothToScoreValue.value = score.value;
    } else if (score.name === "exactScore") {
      let splitArr = score.value.split("-").map(Number);
      exactScoreValue.value = { home: splitArr[0], away: splitArr[1] };
    } else if (score.name === "overUnder") {
      let splitArr = score.value.split("/").map(Number);
      overUnderScoreValue.value = { under: splitArr[0], over: splitArr[1] };
    } else if (score.name === "homeAway") {
      homeAwayScoreValue.value = score.value;
    } else if (score.name === "asianHandicap") {
      let splitArr = score.value.split("/").map(Number);
      asianHandicapScoreValue.value = { home: splitArr[0], away: splitArr[0] };
    } else if (score.name === "scoringQuarter") {
      scoringQuarter.value = score.value;
    }
  }
});

const updatePredictionScore = (key: string, value: any) => {
  if (key === "mw") {
    matchWinnerScoreValue.value = value.value as unknown as string;
    emits("updatePredictionScore", { name: "matchWinner", value: value.value });
    bothToScoreValue.value = "";
    homeAwayScoreValue.value = "";
    exactScoreValue.value = null;
    overUnderScoreValue.value = null;
    scoringQuarter.value = "";
    asianHandicapScoreValue.value = null;
  } else if (key === "gg") {
    bothToScoreValue.value = value.value;
    emits("updatePredictionScore", {
      name: "bothTeamToScore",
      value: value.value,
    });

    matchWinnerScoreValue.value = "";
    homeAwayScoreValue.value = "";
    exactScoreValue.value = null;
    overUnderScoreValue.value = null;
    scoringQuarter.value = "";
    asianHandicapScoreValue.value = null;
  } else if (key === "exactScore") {
    exactScoreValue.value = value;
    emits("updatePredictionScore", {
      name: "exactScore",
      value: value.home + " - " + value.away,
    });

    bothToScoreValue.value = "";
    matchWinnerScoreValue.value = "";
    homeAwayScoreValue.value = "";
    overUnderScoreValue.value = null;
    scoringQuarter.value = "";
    asianHandicapScoreValue.value = null;
  } else if (key === "oUScore") {
    overUnderScoreValue.value = value;
    let scoreHere = value.under + "/" + value.over;
    emits("updatePredictionScore", { name: "overUnder", value: scoreHere });

    bothToScoreValue.value = "";
    matchWinnerScoreValue.value = "";
    homeAwayScoreValue.value = "";
    exactScoreValue.value = null;
    scoringQuarter.value = "";
    asianHandicapScoreValue.value = null;
  } else if (key === "homeAway") {
    homeAwayScoreValue.value = value;
    emits("updatePredictionScore", { name: "homeAway", value: value });

    bothToScoreValue.value = "";
    matchWinnerScoreValue.value = "";
    overUnderScoreValue.value = null;
    exactScoreValue.value = null;
    scoringQuarter.value = "";
    asianHandicapScoreValue.value = null;
  } else if (key === "scoringQ") {
    scoringQuarter.value = value;
    emits("updatePredictionScore", { name: "scoringQuarter", value: value });

    matchWinnerScoreValue.value = "";
    bothToScoreValue.value = "";
    homeAwayScoreValue.value = "";
    exactScoreValue.value = null;
    overUnderScoreValue.value = null;
    asianHandicapScoreValue.value = null;
  } else if (key === "asianH") {
    asianHandicapScoreValue.value = value;

    let scoreHere = value.home + "/" + value.away;
    emits("updatePredictionScore", { name: "asianHandicap", value: scoreHere });

    matchWinnerScoreValue.value = "";
    bothToScoreValue.value = "";
    homeAwayScoreValue.value = "";
    exactScoreValue.value = null;
    overUnderScoreValue.value = null;
    scoringQuarter.value = "";
  }
};
</script>
<template>
  <div class="w-full">
    <UiScoreButton
      :match-data="matchData"
      :prediction-score="predictionScore"
      @open-modal="openModal"
    />
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
      <SectionsCreateScoresList
        :match-data="matchData"
        :match-winner-score-value="matchWinnerScoreValue"
        :both-to-score-value="bothToScoreValue"
        :exact-score-value="exactScoreValue"
        :asian-handicap-score-value="asianHandicapScoreValue"
        :scoring-quarter="scoringQuarter"
        :home-away-score-value="homeAwayScoreValue"
        :over-under-score-value="overUnderScoreValue"
        @update-prediction-score="updatePredictionScore"
        @close-modal="closeModal"
        :selected-sport="selectedSport"
      />
    </UModal>
  </div>
</template>
