<script setup lang="ts">
import { ILeagueEntity } from '~/types/types';

defineProps<{
  label: string;
}>()

const emits = defineEmits<{
  (e: 'selectLeague', payload: DATAEntity): void
}>()

const isOpen = ref(false)
const selectLeague = (payload: ILeagueEntity) => {
  emits('selectLeague', payload);
  isOpen.value = false;
}

</script>

<template>
  <div class="w-full">
    <button @click="isOpen = true"
      class="w-full py-2.5 rounded-md bg-c-seperator/60 hover:bg-c-seperator/75 relative flex items-center justify-center text-neutral-600 transition-colors duration-200">
      <span class="text-sm font-normal tracking-wide">{{ label }}</span>
      <div class="absolute right-4">
        <Icon name="mdi:chevron-down" class="text-xl" />
      </div>
    </button>
    <UModal v-model="isOpen" :overlay="false" :ui="{ width: 'w-[110%]', height: 'min-h-[60vh]', background: 'bg-white' }">
      <SectionsMatchesData @select-league="selectLeague" />
    </UModal>
  </div>
</template>
