<script setup lang="ts">
import { TipsterFollowers } from '~/graphql/schema';
import { ITipsters } from '~/types/types';
import { useAuthStore } from "~/store/authStore";

const router = useRouter();
const authStore = useAuthStore();
const searchText = ref('');
const searchedData = ref<ITipsters>({
    allTipsters: { edges: [] }
})
const loading_search = ref(false);

const redirectBtn = (): void => {
    if (window.history.state.back === null) {
        router.push("/");
    } else {
        router.back();
    }
}

const { data: fetchSuggestions, error: errorSuggestion, pending, refresh: refreshSuggestion } = await useAsyncQuery<ITipsters>(TipsterFollowers, { first: 10 });

const searchTipsters = async () => {
    loading_search.value = true;
    const { data, error } = await useAsyncQuery<ITipsters>(TipsterFollowers, { penName: searchText.value });
    if (data.value) {
        loading_search.value = false;

        searchedData.value = data.value;
    }
    if (error.value) {
        loading_search.value = false;
    }
    if (!searchText.value) {
        refreshSuggestion();
    }
}

const debouncedSearchTipsters = useDebounceFn(() => {
    searchTipsters();
}, 300); // Debounce search function

watch(searchText, (newSearchText, oldSearchText) => {
    debouncedSearchTipsters();
})
</script>
<template>
    <div class="w-full flex flex-col py-4 md:py-6 gap-y-6 mt-14 md:mt-0">
        <header class="w-full flex items-center gap-x-1.5 md:gap-x-3">
            <div class="flex items-center flex-none">
                <button @click="redirectBtn"
                    class="hidden md:block p-2.5 rounded-xl bg-white text-neutral-600 hover:text-neutral-800 focus:text-neutral-800 outline-none border border-transparent hover:border-c-seperator transition duration-200">
                    <Icon name="mdi:chevron-left" class="text-2xl md:text-3xl" />
                </button>
            </div>
            <div class="grow flex items-center relative">
                <input v-model="searchText" type="search"
                    class="w-full py-2.5 pr-4 pl-10 rounded-xl text-base tracking-wide placeholder:text-neutral-500/60 bg-white focus:outline-none border border-transparent focus:border-c-seperator hover:border-c-seperator transition duration-200"
                    placeholder="Type to search...">
                <Icon name="ph:magnifying-glass" class="text-base absolute left-3.5 text-neutral-500" />
            </div>
        </header>
        <div v-if="searchText" class="w-full flex flex-col gap-y-2 mt-5">
            <div v-if="searchedData.allTipsters.edges?.length ?? 0 > 0" class="w-full">
                <ContainersRenderExploreList :pending="loading_search" :data="searchedData?.allTipsters.edges || []" />
            </div>
            <div v-else class="w-full flex flex-col items-center min-h-[6rem]">
                <p>No results found.</p>
            </div>
        </div>
        <div v-else class="w-full flex flex-col gap-y-6 ">
            <p v-if="authStore.if_less_followers" class="text-sm text-neutral-500 italic">You should atleast follow 4
                tipsters.</p>
            <div class="w-full flex flex-col gap-y-2 mt-2">
                <h4 class="tracking-wide text-lg md:text-xl text-neutral-600">Suggested</h4>
                <ContainersRenderExploreList :pending="pending" :data="fetchSuggestions?.allTipsters.edges || []" />
            </div>
        </div>

    </div>
</template>
