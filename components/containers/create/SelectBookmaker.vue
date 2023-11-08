<script setup lang="ts">
import { IPredictionScore, IBookmaker } from "~/types/plays";

const props = defineProps<{
  predictionScore: IPredictionScore | null;
  selectedBookMaker: IBookmaker | null;
}>();

const emits = defineEmits<{
  (e: "selectBookmaker", data: IBookmaker): void;
}>();

const isOpen = ref(false);

const openModal = () => {
  if (props.predictionScore) {
    isOpen.value = true;
  }
};

const selectBookmaker = (data: IBookmaker) => {
  emits("selectBookmaker", data);
  isOpen.value = false;
};
</script>
<template>
  <div class="w-full">
    <button
      @click="openModal"
      :class="
        predictionScore
          ? 'bg-c-seperator/60 hover:bg-c-seperator/75 text-neutral-700'
          : 'bg-c-seperator/40 text-neutral-500'
      "
      class="w-full py-3 rounded-md relative flex items-center justify-center transition-colors duration-200"
    >
      <div v-if="selectedBookMaker" class="flex items-center gap-x-3">
        <NuxtImg
          :src="selectedBookMaker.img || ''"
          class="w-11 h-auto rounded-sm"
        />
        <span class="text-sm">{{ selectedBookMaker.name }}</span>
      </div>
      <span v-else class="text-sm font-normal tracking-wide"
        >Select Bookmaker</span
      >
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>
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
      <SectionsCreateBookmakerList @select-bookmaker="selectBookmaker" />
    </UModal>
  </div>
</template>
