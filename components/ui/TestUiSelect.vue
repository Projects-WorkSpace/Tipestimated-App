<script setup lang="ts">
const options = ref<ISelected[]>([
  { id: 1, name: "SOCCER", color: "⚽" },
  { id: 2, name: "BASKETBALL", color: "🏀" },
  { id: 3, name: "AMERICAN_FOOTBALL", color: "🏈" },
  { id: 4, name: "BASEBALL", color: "⚾" },
  { id: 5, name: "RUGBY_UNION", color: "🏉" },
]);

interface ISelected {
  id: number;
  name: string;
  color: string;
}
const selected = ref<ISelected[]>([]);

const labels = computed({
  // return se
  get: () => selected.value,
  set: async (labels) => {
    const promises = labels.map(async (label) => {
      if (label.id) {
        return label;
      }

      // In a real app, you would make an API call to create the label
      const response = {
        id: label.id,
        name: label.name,
        color: generateColorFromString(label.name),
      };

      options.value.push(response);

      return response;
    });

    selected.value = await Promise.all(promises);
  },
});

// Look at the component example to see how this is used
function generateColorFromString(str: string) {
  // ...
  return str;
}
const uiInput = {
  background: "bg-c-light",
  ring: "ring-0",
  empty: "py-3.5",
  input:
    "block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-3.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 focus:border-inherit sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none",
};
</script>

<template>
  <USelectMenu v-model="labels" by="id" name="labels" :options="options" option-attribute="name" size="lg"
    select-class="bg-c-light rounded-lg ring-0 text-base border border-c-seperator/60 focus:border-neutral-400/60 focus:ring-0 focus:outline-none sm:text-sm"
    multiple>
    <!-- <UButton class="text-gray-500 text-base"> -->
    <template #label>
      <template v-if="labels.length">
        <span class="flex items-center -space-x-1">
          <!-- <span v-for="label of labels" :key="label.id" class="flex-shrink-0 w-2 h-2 mt-px rounded-full" -->
          <!--   :style="{ background: `#${label.color}` }" /> -->
          <Icon v-for="label of labels" :key="label.id" :name="label.color" class="flex-shrink-0 w-2 h-2" />
        </span>
        <span class="text-gray-500">{{ labels.length }} selected</span>
      </template>
      <template v-else>
        <span class="text-gray-500 truncate">Select labels</span>
      </template>
    </template>
    <!-- </UButton> -->

    <template #option="{ option }">
      <Icon :name="option.color" class="flex-shrink-0 w-2 h-2 mt-px rounded-full" />
      <!-- <span class="flex-shrink-0 w-2 h-2 mt-px rounded-full" :style="{ background: `#${option.color}` }" /> -->
      <span class="truncate">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
