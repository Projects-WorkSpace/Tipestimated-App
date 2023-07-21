<script setup lang="ts">
import { IListProps } from '~/types/types';

const countries = [
    'Italy',
    'England',
    'Spain',
    'United States',
    'France',
    'Germany',
];
const selectedSport = ref<IListProps>({
    name: 'Favorite Sport',
    icon: '',
    disabled: true,
});
const selectedOtherSport = ref<IListProps>({
    name: 'Other Sport',
    icon: '',
    disabled: true,
});
const selectedCountry = ref('');

const sports: IListProps[] = [
    { name: 'Football', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Hockey', icon: '🏑' },
    { name: 'Cricket', icon: '🏏' },
];
const updatedSelected = (data: IListProps) => {
    selectedSport.value = data;
};
const updatedOtherSelected = (data: IListProps) => {
    selectedOtherSport.value = data;
};
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col pb-6 gap-y-4">
            <div class="relative bg-inherit w-full flex items-center">
                <input
                    type="text"
                    id="penname"
                    name="penname"
                    class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                    placeholder="Pen name"
                /><label
                    for="penname"
                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                    >Pen name</label
                >
            </div>
            <div class="w-full relative flex items-center">
                <select
                    v-model="selectedCountry"
                    class="select-field custom-select"
                >
                    <option value="" disabled selected>Nationality</option>
                    <option v-for="country in countries" :value="country">
                        {{ country }}
                    </option>
                </select>
                <Icon
                    name="mdi:chevron-down"
                    class="h-4 w-4 text-gray-400 absolute right-2"
                />
            </div>
            <div class="w-full">
                <ContainersListboxComponent
                    :selected="selectedSport"
                    :list="sports"
                    @updated-selected="updatedSelected"
                />
            </div>
            <div class="w-full">
                <ContainersListboxComponent
                    v-model="selectedOtherSport"
                    :selected="selectedOtherSport"
                    :list="sports"
                    @updated-selected="updatedOtherSelected"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-field {
    @apply text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none;
}

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
