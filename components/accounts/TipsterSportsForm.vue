<script setup lang="ts">
import { IListProps } from '~/types/types';
const emits = defineEmits<{
    (e: 'submitSportData'): void;
    (e: 'update:pen_name', payload: string): void;
    (e: 'update:nationality', payload: string): void;
    (e: 'updateSelectedSport', payload: IListProps): void;
    (e: 'updateSelectedOtherSport', payload: IListProps): void;
}>();
const props = defineProps<{
    pen_name: string;
    nationality: string;
    favorite_sport: IListProps;
    other_sport: IListProps;
}>();

const countries = [
    'Italy',
    'England',
    'Spain',
    'United States',
    'France',
    'Germany',
];

const sports: IListProps[] = [
    { name: 'Football', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Hockey', icon: '🏑' },
    { name: 'Cricket', icon: '🏏' },
];
const updatedSelected = (payload: IListProps) => {
    emits('updateSelectedSport', payload);
};
const updatedOtherSelected = (payload: IListProps) => {
    emits('updateSelectedOtherSport', payload);
};
const onClickSubmit = (): void => {
    emits('submitSportData');
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
                    :value="pen_name"
                    @input="
                        emits(
                            'update:pen_name',
                            ($event.target as HTMLInputElement).value
                        )
                    "
                /><label
                    for="penname"
                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                    >Pen name</label
                >
            </div>
            <div class="w-full relative flex items-center">
                <select
                    :value="nationality"
                    @input="
                        emits(
                            'update:nationality',
                            ($event.target as HTMLSelectElement).value
                        )
                    "
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
                    :selected="favorite_sport"
                    :list="sports"
                    @updated-selected="updatedSelected"
                />
            </div>
            <div class="w-full">
                <ContainersListboxComponent
                    :selected="other_sport"
                    :list="sports"
                    @updated-selected="updatedOtherSelected"
                />
            </div>
            <div class="w-full flex flex-col mt-4 gap-y-5 pb-6">
                <button
                    @click="() => onClickSubmit()"
                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded hover:bg-base-green focus:bg-base-green transition flex items-center justify-center"
                >
                    <div class="">
                        <span class="leading-none">Continue</span>
                    </div>
                </button>
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
