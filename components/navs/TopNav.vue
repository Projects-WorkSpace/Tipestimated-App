<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/authStore";

const authStore = useAuthStore();
const { is_logged_in } = storeToRefs(authStore);
</script>
<template>
    <nav
        class="fixed top-0 w-full flex md:hidden items-center justify-between bg-white z-50 px-4 py-2 border-b border-c-seperator">
        <div class="flex items-center">
            <button class="text-lg font-sans font-medium italic">Tipstimate</button>
        </div>
        <transition mode="out-in">
            <div v-if="is_logged_in" class="flex items-center gap-x-2.5 pr-2">
                <button class="p-1 text-2xl group">
                    <Icon name="ph:bell" class="group-hover:scale-105 group-hover:text-black" />
                </button>
            </div>
            <div v-else class="flex pr-2">
                <NuxtLink to="/accounts/login"
                    class="text-sm sm:text-base text-center text-white bg-green-600 rounded-lg px-4 py-2 hover:bg-green-700 transition-colors duration-200">
                    Sign in</NuxtLink>
            </div>
        </transition>
    </nav>
</template>
<style scoped>
.link-active {
    @apply hidden;
}
</style>
