<script setup lang="ts">
import { IBookmaker } from "~/types/plays";

const props = defineProps<{
  selectedBookMaker: IBookmaker | null;
  predictionOdds: number | null;
}>();

const emits = defineEmits<{
  (e: "updatePredictionOdds", value: number): void;
}>();

const isOpen = ref(false);
const openModal = () => {
  if (props.selectedBookMaker) {
    isOpen.value = true;
  }
};
const closeModal = () => {
  isOpen.value = false;
};

const updatePredictedOdds = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;
  emits("updatePredictionOdds", parseFloat(inputValue));
};
</script>
<template>
  <div class="w-full">
    <button @click="openModal" :class="selectedBookMaker
        ? 'bg-c-seperator/60 hover:bg-c-seperator/75 text-neutral-700'
        : 'bg-c-seperator/40 text-neutral-500'
      " class="w-full py-3 rounded-md relative flex items-center justify-center transition-colors duration-200">
      <span v-if="predictionOdds" class="text-sm font-normal tracking-wide">{{
        predictionOdds
      }}</span>
      <span v-else class="text-sm font-normal tracking-wide">Total odds</span>
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>
    <UModal v-model="isOpen" :overlay="true" :ui="{
      width: 'w-[90vw] sm:w-[30vw]',
      height: 'max-h-[55vh]',
      background: 'bg-white',
      rounded: 'rounded-xl',
      container: 'flex min-h-full items-center justify-center text-center',
    }">
      <div class="w-full h-full flex flex-col justify-between py-6 px-4 gap-y-2 relative min-h-[45vh]">
        <button @click="closeModal" class="absolute right-6 text-neutral-600 hover:text-neutral-800">
          <Icon name="mdi:close" class="text-xl" />
        </button>
        <div class="w-full flex flex-col gap-y-5">
          <label for="odds" class="text-lg text-center font-medium">Enter odds</label>
          <div class="w-full flex flex-col mt-4">
            <input :value="predictionOdds" @input="updatePredictedOdds" id="odds" type="number" placeholder="Type here..."
              class="w-full text-base text-neutral-700 placeholder:text-neutral-400 px-4 py-2.5 focus:outline-none border-transparent border-0 focus:!border-0 ring-1 ring-neutral-300 rounded-md focus:ring-2 bg-white ring-inset transition duration-200" />
          </div>
        </div>
        <div class="absolute bottom-4 -translate-y-1/2 right-4 left-4">
          <button @click="closeModal"
            class="w-full px-4 py-2.5 text-base bg-neutral-600 text-white tracking-wide rounded-md hover:bg-neutral-700 transition-colors duration-200">
            Save
          </button>
        </div>
      </div>
    </UModal>
  </div>
</template>
