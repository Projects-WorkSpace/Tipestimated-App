<script setup lang="ts">
const props = defineProps<{
    nationality: string
    error_status: boolean
}>()
defineEmits<{
    (e: 'update:nationality', payload: string): void
}>()

interface Country {
    name: {
        common: string;
        official?: string;
        nativeName?: Record<string, { official: string; common: string }>;
    };
}

const { data: countries, pending, error, refresh } = await useFetch<Country[]>('https://restcountries.com/v3.1/all?fields=name')

</script>
<template>
    <div class="w-full">
        <div v-if="pending">
            loading...
        </div>
        <div class="flex w-full items-center text-red-400 gap-x-2" v-if="error">
            <Icon name="mdi:reload" class="text-base" />
            <p class="text-sm">Error</p>
        </div>
        <div class="w-full relative flex items-center">

            <select :value="nationality" @input="
                $emit(
                    'update:nationality',
                    ($event.target as HTMLSelectElement).value
                )
                "
                class="custom-select text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 px-2 ring-1 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none">
                <option value="" disabled selected>Nationality</option>
                <option v-for="country in countries" :value="country.name.common">
                    {{ country.name.common }}
                </option>
            </select>
            <Icon name="mdi:chevron-down" class="h-4 w-4 text-gray-400 absolute right-2" />
        </div>
        <p v-if="error_status" class="text-xs text-red-500 mt-1.5 ml-0.5">Enter valid nationality</p>
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