<script setup lang="ts">
import rugbyResults from '~/constants/rugbyResults';
import { IAsianHandicap } from '~/types/plays';

const props = defineProps<{
  matchWinnerScoreValue: string;
  asianHandicapScoreValue: IAsianHandicap | null;
}>()

const emits = defineEmits<{
  (e: 'updatePredictionScore', key: string, value: any): void
}>()

const possibleScores = computed(() => rugbyResults.sort((a, b) => a.id - b.id));

const selectMWBtn = (value: string) => {
  emits('updatePredictionScore', 'mw', { value: value })
}
const inputHomeAsianHValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'asianH', { home: data, away: null });
}
const inputAwayAsianHValue = (e: Event) => {
  let data = (e.target as HTMLInputElement).value;
  emits('updatePredictionScore', 'asianH', { away: data, home: null });
}


</script>
<template>
  <div class="w-full flex flex-col">
    <ul class="w-full flex flex-col gap-y-4">
      <li v-for="score in possibleScores" class="w-full flex flex-col gap-y-2.5" :key="score.id">
        <h4 class="text-base font-medium">{{ score.name }}</h4>
        <ul v-if="score.id === 1" class="w-full grid gap-3 grid-cols-3">
          <li v-for="value, index in score.values" class="w-full flex flex-col" :key="index">
            <button @click="selectMWBtn(value.value)"
              :class="matchWinnerScoreValue === value.value ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-c-seperator/60 text-neutral-600 hover:bg-c-seperator/90'"
              class="px-3.5 py-1.5  text-sm rounded-md ring-1 ring-c-seperator  transition-colors duration-200">
              {{ value.value }}
            </button>
          </li>
        </ul>

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

      </li>
    </ul>

  </div>
</template>
