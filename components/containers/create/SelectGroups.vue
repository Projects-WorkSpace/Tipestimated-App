<script setup lang="ts">
import { NodeData } from "@/types/create";
const props = defineProps<{
  isOpen: boolean;
  selected_all: boolean;
  groups: NodeData[];
}>();

const emits = defineEmits<{
  (e: "toggleOpenGroups"): void;
  (e: "selectAllGroups", payload: boolean): void;
  (e: "selectSingleGroup", payload: boolean, id: string): void;
}>();

const checkBoxUi = {
  base: "h-5 w-5",
};

const toggleModal = () => {
  emits("toggleOpenGroups");
};

const selectAllGroups = (payload: boolean) => {
  emits("selectAllGroups", payload);
};

const selectSingleGroup = (payload: boolean, id: string) => {
  emits("selectSingleGroup", payload, id);
};
</script>
<template>
  <UModal :model-value="isOpen" @update:model-value="toggleModal" :overlay="true" :ui="{
    width: 'w-[90vw] sm:w-[30vw]',
    height: 'h-full min-h-[45vh]',
    background: 'bg-white',
    rounded: 'rounded-xl',
    container: 'flex min-h-full items-center justify-center text-center',
  }">
    <div class="w-full flex flex-col px-5 py-4 gap-y-4">
      <div class="w-full flex flex-col items-center justify-center relative">
        <h3 class="text-lg text-center font-medium">Select groups</h3>
        <button @click="toggleModal" class="absolute right-1 text-neutral-600 hover:text-neutral-800">
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <div class="w-full flex flex-col">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex items-center mr-4">
              <UCheckbox :checked="selected_all" :ui="checkBoxUi" @click="selectAllGroups(!selected_all)" />
            </div>
            <div class="">
              <h4 class="text-base text-neutral-500">Select all</h4>
            </div>
          </div>
          <!-- Search groups -->
          <div class="flex items-center relative">
            <button class="px-2.5 py-1.5 rounded-lg outline-none border border-c-seperator/50 bg-c-seperator/40">
              <Icon name="ph:magnifying-glass" class="w-4 h-4 text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col py-1">
        <ul class="w-full flex flex-col gap-y-2">
          <li v-for="group in groups" :key="group.id" class="w-full flex items-center">
            <div role="button" class="flex items-center flex-none mr-4"
              @click="selectSingleGroup(!group.checked, group.id)">
              <UCheckbox :checked="group.checked" :ui="checkBoxUi" />
            </div>
            <div @click="selectSingleGroup(!group.checked, group.id)" role="button"
              class="flex grow items-center justify-between py-2.5 rounded-md px-4 bg-c-seperator/30">
              <div class="flex items-center">
                <span class="text-sm font-medium capitalize">{{
                  group.name
                }}</span>
              </div>
              <div class="flex items-center gap-x-2.5">
                <span class="text-sm font-normal text-neutral-600">{{ group.followerCount }} followers</span>
                <div class="flex items-center">
                  <Icon v-if="group.isPrivate" name="ph:lock-simple-fill" class="w-4 h-4 text-neutral-600" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </UModal>
</template>
