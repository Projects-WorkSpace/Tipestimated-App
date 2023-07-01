<script setup lang="ts">
const experience = ['3 years', '4 years', 'more than 5 years']
const selectedExp = ref('')
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col gap-y-5 pb-6">
            <div class="relative bg-inherit w-full">
                <input
                    type="text"
                    id="telegram"
                    name="telegram"
                    class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                    placeholder="Telegram link"
                /><label
                    for="telegram"
                    class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                    >Telegram link</label
                >
            </div>
            <div class="relative bg-inherit w-full">
                <input
                    type="text"
                    id="social"
                    name="social"
                    class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                    placeholder="Social media link"
                /><label
                    for="social"
                    class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                    >Social media link</label
                >
            </div>
            <div class="w-full">
                <select v-model="selectedExp" class="select-input">
                    <option value="" disabled selected>Years of experience</option>
                    <option v-for="x in experience" :value="x">{{ x }}</option>
                </select>
            </div>
            <div class="w-full flex flex-col">
                <label class="block mb-1 text-t-gray text-xs" for="file_input">Upload profile</label>
                <input
                    class="block w-full text-sm text-gray-600 border border-c-seperator rounded-sm cursor-pointer bg-gray-50 focus:outline-none"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                />
                <p class="mt-1 text-xs text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-input {
    @apply w-full text-sm bg-inherit border border-c-seperator rounded-sm text-gray-600 py-2 px-2 focus:ring-neutral-400 focus:border-neutral-400 outline-none transition duration-200;
}
input[type='file'] {
    background: unset;
    appearance: none;
}
input[type='file']::-webkit-file-upload-button {
    /* Styles for the file upload button in WebKit browsers (Chrome, Safari, etc.) */
    @apply border-c-seperator border-b rounded-l-sm text-t-gray py-1.5 px-2 text-sm;
}

select::-webkit-datetime-edit-fields-wrapper::after {
    @apply text-c-seperator; /* Set the color of the arrow icon */
}

/* For Firefox */
select::-moz-focus-inner {
    @apply text-c-seperator; /* Set the color of the arrow icon */
}
</style>
