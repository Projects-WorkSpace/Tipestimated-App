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
            <option value="" disabled selected>Day</option>
            <option v-for="day in days" :value="day">{{ day }}</option>
        </select>
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
            <option value="" disabled selected>Month</option>
            <option v-for="(month, index) in months" :value="index + 1">
                {{ month }}
            </option>
        </select>
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
            <option value="" disabled selected>Year</option>
            <option v-for="year in years" :value="year">{{ year }}</option>
        </select>
    </div>
</template>
<style scoped>
.select-field {
    @apply text-sm bg-inherit border border-c-seperator rounded-lg text-gray-600 py-2 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200;
}

.custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none;
    padding-right: 6px;
    background-image: url('/icons/MdiChevronDown.svg');
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
