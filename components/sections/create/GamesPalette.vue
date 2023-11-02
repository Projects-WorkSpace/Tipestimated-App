<template>
  <div class="w-full h-full bg-white flex flex-col gap-y-2 py-2">
    <div class="w-full flex items-center relative">
      <UIcon name="i-heroicons-magnifying-glass-20-solid"
        class="absolute left-2.5 w-4 sm:w-5 h-4 sm:h-5 text-neutral-500" />
      <input v-model="query" type="text" placeholder="Search games..."
        class="w-full text-sm sm:text-base text-neutral-700 placeholder:text-neutral-400 px-9 py-2 focus:outline-none border-transparent border-0 focus:!border-0 ring-1 ring-neutral-300 rounded-md focus:ring-neutral-400 bg-white ring-inset" />
      <UButton v-show="query !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="query = ''" class="absolute right-2.5" />
    </div>
    <div class="w-full h-[60vh] overflow-y-auto flex flex-col">
      <Transition mode="out-in">
        <div v-if="loading" class="h-full mt-8 flex justify-center">
          <UtilsStarLoading />
        </div>
        <div v-else class="w-full flex flex-col">
          <div v-if="!filteredEvents" class="w-full flex flex-col">No data</div>
          <ul v-else class="w-full flex flex-col h-[60vh] overflow-y-auto divide-y divide-c-seperator">
            <li v-for="event in filteredEvents" class="w-full flex flex-col" :key="event.EVENT_ID">
              <div @click="selectEvent(event)"
                class="w-full flex items-center justify-between px-3.5 py-1.5 cursor-pointer hover:bg-c-seperator/30 transition-colors duration-200">
                <div class="flex items-center gap-x-4">
                  <div class="flex items-center gap-x-1">
                    <small class="text-xs text-neutral-500">{{
                      formatTimestamp(event.START_TIME)
                    }}</small>
                  </div>
                  <div class="flex flex-col gap-y-1">
                    <div class="flex items-center gap-x-2.5">
                      <NuxtImg :src="event.HOME_IMAGES[0] || ''" class="w-4 sm:w-5 h-4 sm:h-5" />
                      <span class="text-sm text-neutral-600">{{
                        event.HOME_NAME
                      }}</span>
                    </div>
                    <div class="flex items-center gap-x-2.5">
                      <NuxtImg :src="event.AWAY_IMAGES[0] || ''" class="w-4 sm:w-5 h-4 sm:h-5" />
                      <span class="text-sm text-neutral-600">{{
                        event.AWAY_NAME
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-chevron-right-20-solid"
                    class="w-4 sm:w-5 h-4 sm:h-5 ms-auto text-neutral-500" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IFixturesDataEntity, IFixturesEventsEntity } from "~/types/plays";

const props = defineProps<{
  events: IFixturesDataEntity | null;
  loading: boolean;
}>();
const emits = defineEmits<{
  (e: "selectEvent", payload: IFixturesEventsEntity): void;
}>();
const query = ref("");

const filteredEvents = computed(() => {
  if (props.events) {
    if (query.value !== "") {
      const lowercaseQuery = query.value.toLowerCase();
      return props.events.EVENTS.filter((event) => {
        const homeNameMatch =
          event.HOME_NAME.toLowerCase().includes(lowercaseQuery);
        const awayNameMatch =
          event.AWAY_NAME.toLowerCase().includes(lowercaseQuery);
        return homeNameMatch || awayNameMatch;
      });
    } else {
      return props.events.EVENTS;
    }
  }
  return null;
});

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const datePart = `${day}.${month}`;
  const timePart = `${hours}:${minutes}`;

  return `${datePart}. ${timePart}`;
};

const selectEvent = (payload: IFixturesEventsEntity) => {
  emits("selectEvent", payload);
};
</script>
