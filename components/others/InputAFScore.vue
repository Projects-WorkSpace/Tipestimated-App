<script setup lang="ts">
import americanFootballResults from '~/constants/americanFootballResults';
import { IOverUnder, IAsianHandicap } from '~/types/plays';

const props = defineProps<{
  homeAwayScoreValue: string;
  overUnderScoreValue: IOverUnder | null;
  asianHandicapScoreValue: IAsianHandicap | null;
  scoringQuarter: string;
}>()

const emits = defineEmits<{
  (e: 'updatePredictionScore', key: string, value: any): void
}>()

const possibleScores = computed(() => americanFootballResults.sort((a, b) => a.id - b.id));

const selectHomeAwayBtn = (value: string) => {
  emits('updatePredictionScore', 'homeAway', value)
}

const inputOverValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'oUScore', { over: data, under: null });
}
const inputUnderValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'oUScore', { under: data, over: null });
}

const inputHomeAsianHValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'asianH', { home: data, away: null });
}
const inputAwayAsianHValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'asianH', { away: data, home: null });
}
const selectScoringQBtn = (value: string) => {
  emits('updatePredictionScore', 'scoringQ', value)
}

</script>
<template>
  <div class="w-full flex flex-col">
    <ul class="w-full flex flex-col gap-y-4">
      <li v-for="score in possibleScores" class="w-full flex flex-col gap-y-2.5" :key="score.id">
        <h4 class="text-base font-medium">{{ score.name }}</h4>
        <ul v-if="score.id === 1" class="w-full grid gap-3 grid-cols-2">
          <li v-for="value, index in score.values" class="w-full flex flex-col" :key="index">
            <button @click="selectHomeAwayBtn(value.value)"
              :class="homeAwayScoreValue === value.value ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-c-seperator/60 text-neutral-600 hover:bg-c-seperator/90'"
              class="px-3.5 py-1.5  text-sm rounded-md ring-1 ring-c-seperator  transition-colors duration-200">
              {{ value.value }}
            </button>
          </li>
        </ul>

        <div v-else-if="score.id === 3" class="w-full flex flex-col gap-y-2">
          <div class="w-full grid grid-cols-2 items-center gap-x-3">
            <span class="text-sm text-neutral-700 tracking-wide">Under</span>
            <!-- <span>:</span> -->
            <span class="text-sm text-neutral-700 tracking-wide">Over</span>
          </div>
          <div class="w-full grid grid-cols-2 items-center gap-x-3">
            <input type="number" min="0" max="10" :value="overUnderScoreValue?.under" @input="inputUnderValue"
              class="w-full py-2 px-4 ring-1 ring-c-seperator rounded-md bg-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors duration-200"
              placeholder="Type points here..." />
            <input type="number" min="0" max="10" :value="overUnderScoreValue?.over" @input="inputOverValue"
              class="w-full py-2 px-4 ring-1 ring-c-seperator rounded-md bg-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors duration-200"
              placeholder="Type points here..." />
          </div>
        </div>
        <div v-else-if="score.id === 2" class="w-full flex flex-col gap-y-2">
          <div class="w-full grid grid-cols-2 items-center gap-x-3">
            <span class="text-sm text-neutral-700 tracking-wide">Home</span>
            <!-- <span>:</span> -->
            <span class="text-sm text-neutral-700 tracking-wide">Away</span>
          </div>
          <div class="w-full grid grid-cols-2 items-center gap-x-3">
            <input :value="asianHandicapScoreValue?.home" @input="inputHomeAsianHValue" type="number" min="0" max="10"
              class="w-full py-2 px-4 ring-1 ring-c-seperator rounded-md bg-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors duration-200"
              placeholder="Type score here..." />
            <input :value="asianHandicapScoreValue?.away" @input="inputAwayAsianHValue" type="number" min="0" max="10"
              class="w-full py-2 px-4 ring-1 ring-c-seperator rounded-md bg-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors duration-200"
              placeholder="Type score here..." />
          </div>

        </div>
        <ul v-else-if="score.id === 4" class="w-full grid gap-3 grid-cols-2">
          <li v-for="value, index in score.values" class="w-full flex flex-col" :key="index">
            <button @click="selectScoringQBtn(value.value)"
              :class="scoringQuarter === value.value ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-c-seperator/60 text-neutral-600 hover:bg-c-seperator/90'"
              class="px-3.5 py-1.5  text-sm rounded-md ring-1 ring-c-seperator  transition-colors duration-200">
              {{ value.value }}
            </button>
          </li>
        </ul>


      </li>
    </ul>

  </div>
</template>
