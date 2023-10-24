<script setup lang="ts">
import { ISportOptions } from "~/types/types";

const props = defineProps<{
  sportOptions: ISportOptions[];
  favourite: ISportOptions | undefined;
}>();
const emits = defineEmits<{
  (e: "updateFavouriteSport", payload: ISportOptions): void;
}>();

const updateSelected = (payload: ISportOptions) => {
  emits("updateFavouriteSport", payload);
};
</script>

<template>
  <USelectMenu :model-value="favourite" @update:model-value="updateSelected" by="id" name="labels" :options="sportOptions"
    option-attribute="name" size="lg"
    select-class="bg-c-light rounded-lg ring-0 text-base border border-c-seperator/60 focus:border-neutral-400/60 focus:ring-0 focus:outline-none sm:text-sm">
    <template #label>
      <template v-if="favourite">
        <Icon :name="favourite.icon" class="w-2 h-2" />
        <span class="text-gray-500">{{ favourite.name }}</span>
      </template>
      <template v-else>
        <span class="text-gray-500 truncate">Select favourite sport</span>
      </template>
    </template>

    <template #option="{ option }">
      <Icon :name="option.icon" class="flex-shrink-0 w-2 h-2 mt-px rounded-full" />
      <span class="truncate text-gray-600">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
