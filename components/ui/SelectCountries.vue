<script setup lang="ts">
const props = defineProps<{
  nationality: string;
  error_status: boolean;
}>();
const emits = defineEmits<{
  (e: "update:nationality", payload: string): void;
}>();

interface Country {
  name: {
    common: string;
  };
}
const { data: countriesData, pending } = await useLazyFetch<Country[]>(
  "https://restcountries.com/v3.1/all?fields=name",
);

const computedCountries = computed(
  () => countriesData.value?.map((country) => country.name.common),
);
const selectCountry = (payload: string) => {
  emits("update:nationality", payload);
};
</script>
<template>
  <div class="w-full flex flex-col">
    <div v-if="pending">loading...</div>
    <USelectMenu :model-value="nationality" @update:model-value="selectCountry" class="w-full" size="lg"
      placeholder="Select your country" searchable-placeholder="Search a country..."
      select-class="bg-c-light py-2.5 rounded-lg ring-0 text-gray-500 text-base border border-c-seperator/60 focus:border-neutral-400/60 focus:ring-0 focus:outline-none sm:text-sm"
      :options="computedCountries" searchable />
    <p v-if="error_status" class="text-sm text-red-500 mt-1.5 ml-0.5">
      required
    </p>
  </div>
</template>

<style scoped>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  padding-right: 6px;
  background-position: right center;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: 18px 18px;
  filter: grayscale(100%);
}
</style>
