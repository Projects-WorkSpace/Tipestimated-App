<script setup lang="ts">
import { NodeData } from "@/types/create";
const props = defineProps<{
  isOpen: boolean;
  selected_all: boolean;
  channels: NodeData[];
}>();

const emits = defineEmits<{
  (e: "toggleOpenChannels"): void;
  (e: "selectAllChannels", payload: boolean): void;
  (e: "selectSingleChannel", payload: boolean, id: string): void;
}>();

const checkBoxUi = {
  base: "h-5 w-5",
};

const toggleModal = () => {
  emits("toggleOpenChannels");
};

const selectAllChannels = (payload: boolean) => {
  emits("selectAllChannels", payload);
};

const selectSingleChannel = (payload: boolean, id: string) => {
  emits("selectSingleChannel", payload, id);
};
</script>

<template>
  <UModal
    :model-value="isOpen"
    @update:model-value="toggleModal"
    :overlay="true"
    :ui="{
      width: 'w-[90vw] sm:w-[30vw]',
      height: 'h-full min-h-[45vh]',
      background: 'bg-white',
      rounded: 'rounded-xl',
      container: 'flex min-h-full items-center justify-center text-center',
    }"
  >
    <div class="w-full flex flex-col px-5 py-4 gap-y-4">
      <div class="w-full flex flex-col items-center justify-center relative">
        <h3 class="text-lg text-center font-medium">Select channels</h3>
        <button
          @click="toggleModal"
          class="absolute right-1 text-neutral-600 hover:text-neutral-800"
        >
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <div class="w-full flex flex-col">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex items-center mr-4">
              <UCheckbox
                :checked="selected_all"
                :ui="checkBoxUi"
                @click="selectAllChannels(!selected_all)"
              />
            </div>
            <div class="">
              <h4 class="text-base text-neutral-500">Select all</h4>
            </div>
          </div>
          <!-- Search groups -->
          <div class="flex items-center relative">
            <button
              class="px-2.5 py-1.5 rounded-lg outline-none border border-c-seperator/50 bg-c-seperator/40"
            >
              <Icon
                name="ph:magnifying-glass"
                class="w-4 h-4 text-neutral-700"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col py-1">
        <ul v-if="channels.length > 0" class="w-full flex flex-col gap-y-2">
          <li
            v-for="channel in channels"
            :key="channel.id"
            class="w-full flex items-center"
          >
            <div
              role="button"
              class="flex items-center flex-none mr-4"
              @click="selectSingleChannel(!channel.checked, channel.id)"
            >
              <UCheckbox :checked="channel.checked" :ui="checkBoxUi" />
            </div>
            <button
              @click="selectSingleChannel(!channel.checked, channel.id)"
              class="flex grow items-center justify-between py-2.5 rounded-md px-4 bg-c-seperator/30"
            >
              <div class="flex items-center">
                <span class="text-sm font-medium capitalize">{{
                  channel.name
                }}</span>
              </div>
              <div class="flex items-center gap-x-2.5">
                <span class="text-sm font-normal text-neutral-600"
                  >{{ channel.followerCount }} followers</span
                >
                <div class="flex items-center">
                  <Icon
                    v-if="channel.isPrivate"
                    name="ph:lock-simple-fill"
                    class="w-4 h-4 text-neutral-600"
                  />
                </div>
              </div>
            </button>
          </li>
        </ul>
        <div v-else class="w-full flex flex-col items-center justify-center">
          <div class="mb-3">
            <Icon name="mdi:bullhorn" class="w-14 h-14 text-neutral-600" />
          </div>
          <p class="text-xl">Empty channels</p>
          <div class="mt-2.5">
            <button class="text-blue-500 hover:underline">Create new</button>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>
