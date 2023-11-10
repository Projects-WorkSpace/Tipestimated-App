<template>
  <div class="w-full bg-white flex flex-col gap-y-2 py-2">
    <div class="w-full flex items-center relative">
      <UIcon
        name="i-heroicons-magnifying-glass-20-solid"
        class="absolute left-2.5 w-4 sm:w-5 h-4 sm:h-5 text-neutral-500"
      />
      <input
        v-model="query"
        type="text"
        placeholder="Search countries..."
        class="w-full text-sm sm:text-base text-neutral-700 placeholder:text-neutral-400 px-9 py-2 focus:outline-none border-transparent border-0 focus:!border-0 ring-1 ring-neutral-300 rounded-md focus:ring-neutral-400 bg-white ring-inset"
      />
      <UButton
        v-show="query !== ''"
        color="gray"
        variant="link"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="query = ''"
        class="absolute right-2.5"
      />
    </div>
    <ul class="w-full flex flex-col max-h-[34vh] overflow-y-auto">
      <li
        v-for="(country, index) in filteredCountries"
        class="w-full flex flex-col"
        @click="selectCountry(country)"
      >
        <UButton
          color="white"
          variant="ghost"
          class="border-b border-neutral-200 hover:bg-c-light transition-colors duration-200"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <span class="truncate font-normal text-sm"
            >{{ index + 1 }}. {{ country.COUNTRY_NAME }}</span
          >
          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-4 h-4 ms-auto"
            />
          </template>
        </UButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface ICountry {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
}

const props = defineProps<{
  countries: ICountry[];
}>();

const emits = defineEmits<{
  (e: "selectCountry", country: ICountry): void;
}>();

const query = ref("");

const filteredCountries = computed(
  () =>
    query.value === ""
      ? props.countries.sort((a, b) => a.COUNTRY_ID - b.COUNTRY_ID)
      : props.countries
          .filter((country) => {
            return country.COUNTRY_NAME.toLowerCase().includes(
              query.value.toLowerCase(),
            );
          })
          .sort((a, b) => a.COUNTRY_ID - b.COUNTRY_ID), // Sort by COUNTRY_ID
);
const selectCountry = (country: ICountry) => {
  //  console.log("Selected Country: ", country)
  emits("selectCountry", country);
};
</script>
