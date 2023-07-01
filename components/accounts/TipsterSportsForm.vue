<script setup lang="ts">
const sports = ['Football', 'Basketball', 'Hockey', 'Tennis', 'Cricket']
const countries = ['Italy', 'England', 'Spain', 'United States', 'France', 'Germany']
const selectedSport = ref('')
const selectedOtherSport = ref('')
const selectedCountry = ref('')
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col pb-6 gap-y-4">
            <div class="relative bg-inherit w-full">
                <input
                    type="text"
                    id="penname"
                    name="penname"
                    class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                    placeholder="Pen name"
                /><label
                    for="penname"
                    class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                    >Pen name</label
                >
            </div>
            <div class="w-full">
                <select v-model="selectedCountry" class="select-input">
                    <option value="" disabled selected>Nationality</option>
                    <option v-for="country in countries" :value="country">{{ country }}</option>
                </select>
            </div>
            <div class="w-full">
                <select v-model="selectedSport" class="select-input">
                    <option value="" disabled selected>Favorite Sport</option>
                    <option v-for="sport in sports" :value="sport">{{ sport }}</option>
                </select>
            </div>
            <div class="w-full">
                <select v-model="selectedOtherSport" class="select-input">
                    <option value="" disabled selected>Other sports</option>
                    <option v-for="sport in sports" :value="sport">{{ sport }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-input {
    @apply w-full text-sm bg-inherit border border-c-seperator rounded-sm text-gray-600 py-2 px-2 focus:ring-neutral-400 focus:border-neutral-400 outline-none transition duration-200;
}

select::-webkit-datetime-edit-fields-wrapper::after {
    @apply text-c-seperator; /* Set the color of the arrow icon */
}

/* For Firefox */
select::-moz-focus-inner {
    @apply text-c-seperator; /* Set the color of the arrow icon */
}
</style>
