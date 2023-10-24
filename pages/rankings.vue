<script setup lang="ts">
import { IDropdownItem } from "~/types/types";

const items = ref<IDropdownItem[][] | undefined>([
    [
        {
            label: "Football",
            icon: "⚽",
        },
    ],
    [
        {
            label: "Basketball",
            icon: "🏀",
        },
    ],
    [
        {
            label: "Tennis",
            icon: "🎾",
        },
    ],
    [
        {
            label: "Hockey",
            icon: "🏑",
        },
    ],
    [
        {
            label: "Cricket",
            icon: "🏏",
        },
    ],
    [
        {
            label: "MotorGP",
            icon: "🏍️",
        },
    ],
]);

const activeItemIndex = ref<number>(0);

const selectedActiveItem = computed(() => {
    if (items.value) {
        return items.value[activeItemIndex.value];
    } else {
        return [
            {
                label: "None",
                icon: "❓",
            },
        ];
    }
});

const selectSport = (data: IDropdownItem) => {
    // Find the index of the selected item based on its label
    const labelToSelect = data.label;
    if (items.value) {
        const index = items.value.findIndex((itemGroup) =>
            itemGroup.some((item) => item.label === labelToSelect),
        );

        // Update the activeItemIndex with the found index
        if (index !== -1) {
            activeItemIndex.value = index;
        }
    }
};
</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-8">
                <div class="w-full flex items-center gap-x-5">
                    <div class="flex items-center grow-0">
                        <Icon :name="selectedActiveItem[0].icon || ''" size="56" />
                    </div>
                    <div class="grow flex flex-col items-start">
                        <h1 class="text-2xl font-medium md:font-bold">
                            Discover the rankings
                        </h1>
                        <ContainersSimpleDropdown :items="items" @click-item="selectSport">
                            <template #btn>
                                <button class="flex items-center text-neutral-500 hover:underline">
                                    <span class="text-sm">Change sport</span>
                                    <Icon name="mdi:chevron-down" class="ml-0.5 text-lg" />
                                </button>
                            </template>
                        </ContainersSimpleDropdown>
                    </div>
                </div>
                <div
                    class="w-full flex flex-nowrap md:flex-wrap gap-y-1 gap-x-3 items-center mt-3.5 md:mt-6 overflow-x-auto">
                    <button class="px-4 py-1.5 bg-white rounded-lg flex items-center">
                        <span class="text-sm sm:text-base font-semibold truncate">Top 50</span>
                        <Icon name="🌐" size="16px" class="ml-1" />
                    </button>
                    <button class="px-4 py-1.5 hover:bg-white rounded-lg flex items-center duration-200 transition">
                        <span class="text-sm sm:text-base font-medium truncate">Top 50</span>
                        <Icon name="🇮🇹" size="16px" class="ml-1" />
                    </button>
                    <button class="px-4 py-1.5 hover:bg-white rounded-lg flex items-center duration-200 transition">
                        <span class="text-sm sm:text-base font-medium truncate">Top 50</span>
                        <Icon name="🇪🇸" size="16px" class="ml-1" />
                    </button>
                    <button class="px-4 py-1.5 hover:bg-white rounded-lg flex items-center duration-200 transition">
                        <span class="text-sm sm:text-base font-medium truncate">Top 50 Week</span>
                        <Icon name="🌐" size="16px" class="ml-1" />
                    </button>
                </div>
                <div class="w-full flex flex-col">
                    <div class="w-full flex justify-between items-center mt-3">
                        <div class="flex items-center justify-center pl-20">
                            <h5 class="text-base font-medium">User Name</h5>
                        </div>
                        <div class="flex items-center justify-center pr-24">
                            <h5 class="text-base font-medium">ROI</h5>
                        </div>
                    </div>
                    <ul class="w-full flex flex-col gap-y-2.5 mt-2">
                        <li class="w-full">
                            <UiRankDetails img-url="https://avatars.githubusercontent.com/u/739984?v=4" user-name="User1"
                                icon="🥇" roi="85" :index="1" />
                        </li>
                        <li class="w-full">
                            <UiRankDetails img-url="https://avatars.githubusercontent.com/u/904724?v=4" user-name="User150"
                                icon="🥈" roi="82" :index="2" />
                        </li>
                        <li class="w-full">
                            <UiRankDetails img-url="https://avatars.githubusercontent.com/u/7547335?v=4" user-name="User754"
                                icon="🥉" roi="82" :index="3" />
                        </li>
                        <li class="w-full">
                            <UiRankDetails img-url="" user-name="User159" icon="🥉" roi="80" :index="4" />
                        </li>
                    </ul>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>
* {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
}

::-webkit-scrollbar {
    width: 0.1rem;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
