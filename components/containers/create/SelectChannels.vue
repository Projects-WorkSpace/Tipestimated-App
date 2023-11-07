<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emits = defineEmits<{
  (e: "toggleOpenChannels"): void;
}>();

const selected_all = ref(false);
const channels = ref([
  { id: 1, name: "Channel 1", followers: 10, checked: false, private: false },
  { id: 2, name: "Channel 2", followers: 14, checked: false, private: true },
  { id: 3, name: "Channel 3", followers: 5, checked: false, private: true },
]);

const checkBoxUi = {
  base: "h-5 w-5",
};

const toggleModal = () => {
  emits("toggleOpenChannels");
};

const selectAllChannels = (payload: boolean) => {
  channels.value.forEach((channel) => {
    channel.checked = payload;
  });
  selected_all.value = payload;
};

const selectSingleChannel = (payload: boolean, id: number) => {
  const channel = channels.value.find((channel) => channel.id === id);
  if (channel) {
    channel.checked = payload;
  }
  if (isAllChannelsChecked()) {
    selected_all.value = true;
  } else {
    selected_all.value = false;
  }
};

const isAllChannelsChecked = () => {
  return channels.value.every((channel) => channel.checked);
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
        <h3 class="text-lg text-center font-medium">Select channels</h3>
        <button @click="toggleModal" class="absolute right-1 text-neutral-600 hover:text-neutral-800">
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <div class="w-full flex flex-col">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex items-center mr-4">
              <UCheckbox :checked="selected_all" :ui="checkBoxUi" @click="selectAllChannels(!selected_all)" />
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
          <li v-for="channel in channels" :key="channel.id" class="w-full flex items-center">
            <div role="button" class="flex items-center flex-none mr-4"
              @click="selectSingleChannel(!channel.checked, channel.id)">
              <UCheckbox :checked="channel.checked" :ui="checkBoxUi" />
            </div>
            <div @click="selectSingleChannel(!channel.checked, channel.id)" role="button"
              class="flex grow items-center justify-between py-2.5 rounded-md px-4 bg-c-seperator/30">
              <div class="flex items-center">
                <span class="text-sm font-medium capitalize">{{
                  channel.name
                }}</span>
              </div>
              <div class="flex items-center gap-x-2.5">
                <span class="text-sm font-normal text-neutral-600">{{ channel.followers }} followers</span>
                <div class="flex items-center">
                  <Icon v-if="channel.private" name="ph:lock-simple-fill" class="w-4 h-4 text-neutral-600" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </UModal>
</template>
