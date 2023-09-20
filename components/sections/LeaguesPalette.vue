<template>
  <div class="w-full h-full bg-white flex flex-col gap-y-2 py-2">
    <div class="w-full flex items-center relative">
      <UIcon name="i-heroicons-magnifying-glass-20-solid" class="absolute left-2.5 w-5 h-5 text-neutral-500" />
      <input v-model="query" type="text" placeholder="Search leagues..."
        class="w-full text-base text-neutral-700 placeholder:text-neutral-400 px-9 py-2 focus:outline-none border-transparent border-0 focus:!border-0 ring-1 ring-neutral-300 rounded-md focus:ring-neutral-400 bg-white ring-inset">
      <UButton v-show="query !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="query = ''" class="absolute right-2.5" />
    </div>
    <ul class="w-full flex flex-col max-h-[58vh] overflow-y-auto">
      <li v-for="country, index in filteredLeagues" class="w-full flex flex-col">
        <UButton @click="selectLeague(country)" color="gray" variant="solid"
          class="border-b border-neutral-200 hover:bg-c-light transition-colors duration-200"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
          <span class="truncate font-normal">{{ index + 1 }}. {{ country.LEAGUE_NAME }}</span>
          <template #trailing>
            <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 ms-auto" />
          </template>
        </UButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  leagues: DATAEntity[]
}>()
const emits = defineEmits<{
  (e: 'selectLeague', payload: DATAEntity): void
}>()
interface DATAEntity {
  LEAGUE_NAME: string;
  COUNTRY_NAME: string;
  COUNTRY_ID: number;
  ACTUAL_TOURNAMENT_SEASON_ID: string;
  GROUP_ID: string;
  SEASON_ID: number;
  TEMPLATE_ID: string;
  STAGES?: (STAGESEntity)[] | null;
}
interface STAGESEntity {
  STAGE_ID: string;
  STAGE_NAME: string;
  OUT: string;
}

const query = ref('')

const filteredLeagues = computed(() =>
  query.value === ''
    ? props.leagues.sort((a, b) => a.COUNTRY_ID - b.COUNTRY_ID)
    : props.leagues.filter((country) => {
      return country.LEAGUE_NAME.toLowerCase().includes(query.value.toLowerCase())
    }).sort((a, b) => a.COUNTRY_ID - b.COUNTRY_ID) // Sort by COUNTRY_ID
)

const selectLeague = (payload: DATAEntity) => {
  //  console.log("Selected league 0: ", payload);
  emits('selectLeague', payload);
}
</script>
