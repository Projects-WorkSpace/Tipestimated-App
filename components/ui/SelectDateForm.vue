<script setup lang="ts">
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const currentYear = new Date().getFullYear();
const years = Array.from(
    { length: 100 },
    (_, index) => currentYear - index
).filter((year) => currentYear - year > 18);

const props = defineProps<{
    selectedDay: string;
    selectedMonth: string;
    selectedYear: string;
}>();
const emits = defineEmits<{
    (e: 'update:selectedDay', value: string): void;
    (e: 'update:selectedMonth', value: string): void;
    (e: 'update:selectedYear', value: string): void;
}>();
</script>
<template>
    <div class="w-full grid-flow-col grid items-center gap-x-2 gap-y-2">
        <div class="flex items-center relative">
            <select
                :value="selectedDay"
                @input="
                    emits(
                        'update:selectedDay',
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="select-field custom-select"
            >
                <option value="" disabled selected class="text-xs text-gray-500">
                    Day
                </option>
                <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
            <Icon
                name="mdi:chevron-down"
                class="h-4 w-4 text-gray-500 absolute right-1.5"
            />
        </div>
        <div class="flex items-center relative">
            <select
                :value="selectedMonth"
                @input="
                    emits(
                        'update:selectedMonth',
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="select-field custom-select"
            >
                <option value="" disabled selected class="text-xs text-gray-500">
                    Month
                </option>
                <option v-for="(month, index) in months" :value="index + 1">
                    {{ month }}
                </option>
            </select>
            <Icon
                name="mdi:chevron-down"
                class="h-4 w-4 text-gray-500 absolute right-1.5"
            />
        </div>
        <div class="flex items-center relative">
            <select
                :value="selectedYear"
                @input="
                    emits(
                        'update:selectedYear',
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="select-field custom-select"
            >
                <option value="" disabled selected class="text-xs text-gray-500">
                    Year
                </option>
                <option v-for="year in years" :value="year">{{ year }}</option>
            </select>
            <Icon
                name="mdi:chevron-down"
                class="h-4 w-4 text-gray-500 absolute right-1.5"
            />
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
    /* background-image: url('/icons/MdiChevronDown.svg'); */
    background-position: right center;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    filter: grayscale(100%);
}

/* Style the dropdown arrow to make it look like a custom icon */
.custom-select::-ms-expand {
    display: none;
}
</style>
