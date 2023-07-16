<script setup lang="ts">
const currentYear = ref(new Date().getFullYear())

const languages = ['English', 'Italian']
const lang = ref(languages[0])
</script>
<template>
    <footer class="w-full flex flex-col pb-4">
        <div class="w-full flex items-center justify-center gap-x-2">
            <div class="flex items-center mx-2">
                <span class="text-[13px] hover:underline text-t-gray cursor-pointer">Home</span>
            </div>
            <div class="flex items-center mx-2">
                <span class="text-[13px] hover:underline text-t-gray cursor-pointer">About</span>
            </div>
            <div class="flex items-center mx-2">
                <span class="text-[13px] hover:underline text-t-gray cursor-pointer">Terms</span>
            </div>
            <div class="flex items-center mx-2">
                <span class="text-[13px] hover:underline text-t-gray cursor-pointer">Others</span>
            </div>
        </div>
        <div class="flex flex-row items-center w-full justify-center mt-2 gap-x-1">
            <div class="flex flex-row mx-2">
                <USelect class="text-xs text-t-gray" variant="none" gap="xs" v-model="lang" :options="languages" />
            </div>
            <div class="flex flex-row items-center mx-2">
                <p class="text-xs text-t-gray">&copy; {{ currentYear }} Tipstimate</p>
            </div>
        </div>
    </footer>
</template>
