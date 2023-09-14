<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";
definePageMeta({
    middleware: 'auth',
});
const authStore = useAuthStore();



</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-4 mt-2">
                <UiSliderHorizontal />
                <div class="w-full flex flex-col gap-y-4 mt-2">
                    <SectionsPostCard />
                    <SectionsPostCard />
                    <SectionsPostCard />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
