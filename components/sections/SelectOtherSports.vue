<script setup lang="ts">
import { ISportOptions } from "~/types/types";

const props = defineProps<{
  sportOptions: ISportOptions[];
  otherSports: ISportOptions[];
}>();
const emits = defineEmits<{
  (e: "updateOtherSports", payload: ISportOptions[]): void;
}>();
const updateSelected = (payload: ISportOptions[]) => {
  emits("updateOtherSports", payload);
};
</script>

<template>
  <USelectMenu :model-value="otherSports" @update:model-value="updateSelected" by="id" name="labels"
    :options="sportOptions" option-attribute="name" size="lg"
    select-class="bg-c-light rounded-lg ring-0 text-base border border-c-seperator/60 focus:border-neutral-400/60 focus:ring-0 focus:outline-none sm:text-sm"
    multiple>
    <template #label>
      <template v-if="otherSports.length">
        <span class="flex items-center -space-x-1">
          <Icon v-for="label of otherSports" :key="label.id" :name="label.icon" class="flex-shrink-0 w-2 h-2" />
        </span>
        <span class="text-gray-500">{{ otherSports.length }} selected</span>
      </template>
      <template v-else>
        <span class="text-gray-500 truncate">Select other sports</span>
      </template>
    </template>

    <template #option="{ option }">
      <Icon :name="option.icon" class="flex-shrink-0 w-2 h-2 mt-px rounded-full" />
      <span class="truncate text-gray-600">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
