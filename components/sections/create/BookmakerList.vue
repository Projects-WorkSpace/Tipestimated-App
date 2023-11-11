<script setup lang="ts">
import bookmakers from "~/constants/bookmakers";
import { IBookmaker } from "~/types/plays";

const emits = defineEmits<{
  (e: "selectBookmaker", data: IBookmaker): void;
}>();
const query = ref("");
const bookmakersData = bookmakers;

const filteredBookmakers = computed(() =>
  query.value === ""
    ? bookmakersData
    : bookmakersData.filter((bookmaker) => {
      return bookmaker.name.toLowerCase().includes(query.value.toLowerCase());
    }),
);

const selectBookmakers = (data: IBookmaker) => {
  emits("selectBookmaker", data);
};
</script>
<template>
  <div class="w-full py-4 flex flex-col gap-y-2 bg-white h-[74vh] overflow-y-auto">
    <div class="w-full flex flex-col divide-y divide-c-seperator">
      <div class="w-full flex flex-col items-center px-4 pb-2">
        <h2 class="text-base font-medium text-center">Bookmakers</h2>
      </div>
      <div class="w-full flex items-center relative px-4 py-2">
        <UIcon name="i-heroicons-magnifying-glass-20-solid"
          class="absolute left-4 translate-x-1/2 w-4 sm:w-5 h-4 sm:h-5 text-neutral-500" />
        <input v-model="query" type="text" placeholder="Search games..."
          class="w-full text-sm sm:text-base text-neutral-700 placeholder:text-neutral-400 px-9 py-2 focus:outline-none border-transparent border-0 focus:!border-0 ring-1 ring-neutral-300 rounded-md focus:ring-neutral-400 bg-white ring-inset" />
        <UButton v-show="query !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
          @click="query = ''" class="absolute right-4 -translate-x-1/2" />
      </div>
    </div>
    <div class="w-full flex flex-col pb-3 h-[68vh] overflow-y-auto px-4">
      <ul class="w-full flex flex-col divide-y divide-c-seperator/80">
        <li v-if="filteredBookmakers.length === 0" class="w-full">
          <div class="text-center py-4 text-neutral-500">
            No bookmakers found.
          </div>
        </li>
        <li v-else v-for="bookmaker in filteredBookmakers" class="w-full" :key="bookmaker.id">
          <button @click="selectBookmakers(bookmaker)"
            class="w-full px-2.5 py-3 relative flex items-center gap-x-3 rounded hover:bg-c-seperator/80 transition-colors duration-200">
            <NuxtImg :src="bookmaker.img" alt="" class="w-10 sm:w-11 h-auto rounded-sm" />
            <span class="text-sm capitalize">{{ bookmaker.name }}</span>
            <UIcon name="i-heroicons-chevron-right-20-solid"
              class="w-4 sm:w-5 h-4 sm:h-5 ms-auto text-neutral-500 absolute right-0 sm:right-4 -translate-x-1/2" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
