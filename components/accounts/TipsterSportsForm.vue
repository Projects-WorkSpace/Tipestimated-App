<script setup lang="ts">
import { IErrorTipsterStatus, IListProps } from '~/types/types';
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
    error_status: IErrorTipsterStatus
}>();

const sports: IListProps[] = [
    { name: 'Football', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Hockey', icon: '🏑' },
    { name: 'Cricket', icon: '🏏' },
];
const updatedSelectedSport = (payload: IListProps) => {
    emits('updateSelectedSport', payload);
};
const updatedOtherSportSelected = (payload: IListProps) => {
    emits('updateSelectedOtherSport', payload);
};
const onClickSubmit = (): void => {
    emits('submitSportData');
};
const updateNationality = (payload: string) => {
    emits('update:nationality', payload)
}
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col pb-6 gap-y-5">
            <div class="w-full flex flex-col">
                <div class="relative bg-inherit w-full flex items-center">

                    <input type="text" id="penname" name="penname"
                        class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                        placeholder="Pen name" :value="pen_name" @input="
                            emits(
                                'update:pen_name',
                                ($event.target as HTMLInputElement).value
                            )
                            " /><label for="penname"
                        class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Pen
                        name</label>
                </div>
                <p v-if="error_status.pen_name" class="w-full text-xs text-red-500 mt-1.5 ml-0.5">Enter valid Pen Name</p>
            </div>
            <div class="w-full flex flex-col">
                <UiSelectCountries :nationality="nationality" @update:nationality="updateNationality"
                    :error_status="error_status.nationality" />
            </div>
            <div class="w-full">
                <ContainersListboxComponent :selected="favorite_sport" :list="sports"
                    @updated-selected="updatedSelectedSport" :error_status="error_status.favorite_sport"
                    error_text="Select your favorite sport" />
            </div>
            <div class="w-full">
                <ContainersListboxComponent :selected="other_sport" :list="sports"
                    @updated-selected="updatedOtherSportSelected" />
            </div>
            <div class="w-full flex flex-col mt-4 gap-y-5 pb-6">
                <button @click="() => onClickSubmit()"
                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded hover:bg-base-green focus:bg-base-green transition flex items-center justify-center">
                    <div class="">
                        <span class="leading-none">Continue</span>
                    </div>
                </button>
            </div>
        </div>
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
