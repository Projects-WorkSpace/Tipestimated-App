<script setup lang="ts">
import { IFixturesEventsEntity, IExactScore, IOverUnder, IAsianHandicap, ISports } from '~/types/plays';


defineProps<{
  matchData: IFixturesEventsEntity | null;
  matchWinnerScoreValue: string;
  bothToScoreValue: string;
  exactScoreValue: IExactScore | null;
  overUnderScoreValue: IOverUnder | null;
  homeAwayScoreValue: string;
  asianHandicapScoreValue: IAsianHandicap | null;
  scoringQuarter: string;
  selectedSport: ISports | null;
}>()
const emits = defineEmits<{
  (e: 'closeModal'): void
  (e: 'updatePredictionScore', key: string, value: any): void

}>();

const closeModal = () => {
  emits('closeModal');
}

const updatePredictionScore = (key: string, value: any) => {
  emits('updatePredictionScore', key, value)
}
</script>
<template>
  <div class="w-full py-4 flex flex-col bg-white  divide-y divide-neutral-200">
    <div class="w-full px-4 flex justify-between items-center pt-1 pb-2.5">
      <div class="flex items-center gap-x-3">
        <!-- <span class="text-base">Game here!</span> -->
        <div class="flex gap-x-1 items-center">
          <NuxtImg :src="matchData?.HOME_IMAGES[0] || ''" class="w-5 h-5" />
          <span class="text-base font-medium ">{{ matchData?.HOME_NAME }}</span>
        </div>
        <span class="text-sm font-normal tracking-wide">-</span>
        <div class="flex gap-x-1 items-center">
          <NuxtImg :src="matchData?.AWAY_IMAGES[0] || ''" class="w-5 h-5" />
          <span class="text-base font-medium ">{{ matchData?.AWAY_NAME }}</span>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <button @click="closeModal"
          class="px-2 py-1 text-red-400 hover:text-red-500 transition-colors duration-200">Cancel</button>
        <button @click="closeModal"
          class="px-4 py-1.5 rounded-md text-sm text-white bg-neutral-600 tracking-wide hover:bg-neutral-700 transition-colors duration-200">Save</button>

      </div>
    </div>
    <div class="w-full flex flex-col pt-4 pb-8 px-4 h-[66vh] overflow-y-auto">
      <div v-if="selectedSport?.NAME === 'SOCCER'" class="w-full">
        <OthersInputFootballScore :match-winner-score-value="matchWinnerScoreValue"
          :both-to-score-value="bothToScoreValue" :exact-score-value="exactScoreValue"
          :over-under-score-value="overUnderScoreValue" @update-prediction-score="updatePredictionScore" />
      </div>
      <div v-else-if="selectedSport?.NAME === 'BASKETBALL'" class="w-full">
        <OthersInputBasketballScore :home-away-score-value="homeAwayScoreValue"
          :over-under-score-value="overUnderScoreValue" @update-prediction-score="updatePredictionScore" />
      </div>
      <div v-else-if="selectedSport?.NAME === 'AMERICAN_FOOTBALL'" class="w-full">
        <OthersInputAFScore :home-away-score-value="homeAwayScoreValue"
          :asian-handicap-score-value="asianHandicapScoreValue" :over-under-score-value="overUnderScoreValue"
          :scoring-quarter="scoringQuarter" @update-prediction-score="updatePredictionScore" />
      </div>
      <div v-else-if="selectedSport?.NAME === 'BASEBALL'" class="w-full">
        <OthersInputBaseballScore :home-away-score-value="homeAwayScoreValue"
          :asian-handicap-score-value="asianHandicapScoreValue" :over-under-score-value="overUnderScoreValue"
          @update-prediction-score="updatePredictionScore" />
      </div>
      <div v-else-if="selectedSport?.NAME === 'RUGBY_UNION'" class="w-full">
        <OthersInputRugbyScore :match-winner-score-value="matchWinnerScoreValue"
          :asian-handicap-score-value="asianHandicapScoreValue" @update-prediction-score="updatePredictionScore" />
      </div>


    </div>
  </div>
</template>
