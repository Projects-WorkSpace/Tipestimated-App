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
const years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
);

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
    <div class="w-full flex flex-col gap-y-1 mb-1">
        <div class="dob-input w-full flex flex-row justify-between items-center">
            <select
                :value="selectedDay"
                @input="
                    emits(
                        'update:selectedDay',
                        ($event.target as HTMLSelectElement).value
                    )
                "
                class="select-field"
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
                class="select-field"
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
                class="select-field"
            >
                <option value="" disabled selected>Year</option>
                <option v-for="year in years" :value="year">{{ year }}</option>
            </select>
        </div>
    </div>
</template>
<style scoped>
.select-field {
    @apply text-sm bg-inherit border border-c-seperator rounded-lg text-gray-600 py-2 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200;
}
</style>
