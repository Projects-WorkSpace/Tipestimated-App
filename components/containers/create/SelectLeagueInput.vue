<script setup lang="ts">
import { ISports, ICountry } from "~/types/plays";
import { ILeagueEntity } from "~/types/types";

defineProps<{
  label: string;
}>();

const emits = defineEmits<{
  (e: "selectLeague", payload: ILeagueEntity, country: ICountry): void;
  (e: "updateSelectedSport", payload: ISports): void;
}>();

const isOpen = ref(false);
const selectLeague = (payload: ILeagueEntity, country: ICountry) => {
  emits("selectLeague", payload, country);
  isOpen.value = false;
};
const updateSelectedSport = (sport: ISports) => {
  emits("updateSelectedSport", sport);
};
</script>

<template>
  <div class="w-full">
    <div
      role="button"
      @click="isOpen = true"
      class="w-full py-3 rounded-md bg-c-seperator/60 hover:bg-c-seperator/75 relative flex items-center justify-center text-neutral-700 transition-colors duration-200"
    >
      <span class="text-sm font-normal tracking-wide">{{ label }}</span>
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </div>
    <UModal
      v-model="isOpen"
      :overlay="true"
      :ui="{
        width: 'w-[90vw] sm:w-[30vw]',
        height: 'max-h-[55vh]',
        background: 'bg-white',
        rounded: 'rounded-xl',
        container: 'flex min-h-full items-center justify-center text-center',
      }"
      class="z-[99999]"
    >
      <div class="w-full h-full flex flex-col">
        <SectionsCreateMatchesData
          @select-league="selectLeague"
          @update-selected-sport="updateSelectedSport"
          @close-modal="isOpen = false"
        />
      </div>
    </UModal>
  </div>
</template>
