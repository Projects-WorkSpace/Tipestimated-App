<script setup lang="ts">
import { IFixturesEventsEntity } from '~/types/plays';

interface IPredictionScore {
  name: string;
  value: string;
}

const props = defineProps<{
  matchData: IFixturesEventsEntity | null;
  predictionScore: IPredictionScore | null
}>()
const emits = defineEmits<{
  (e: 'openModal'): void;
}>()
const openModal = () => {
  emits('openModal')
}

const scores = computed(() => {
  if (props.matchData && props.predictionScore) {
    let score = props.predictionScore;
    if (score.name === 'matchWinner') {
      return score.value;
    }
  }
})
</script>
<template>
  <div class="w-full flex flex-col">
    <button @click="openModal"
      :class="!matchData === null ? 'bg-c-seperator/40 text-neutral-500' : 'bg-c-seperator/60 hover:bg-c-seperator/75 text-neutral-600'"
      class="w-full py-2.5 rounded-md  relative flex items-center justify-center  transition-colors duration-200">
      <Transition mode="out-in">
        <div v-if="predictionScore" class="flex items-center gap-x-3">
          <span>Scores</span>
        </div>
        <span v-else class="text-sm font-normal tracking-wide">Enter your prediction</span>
      </Transition>
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>

  </div>
</template>
