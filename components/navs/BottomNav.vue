<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePageFeatureStore } from "~/store/pageFeatures";

const featureStore = usePageFeatureStore();
const { isTipster } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;
</script>
<template>
    <nav
        class="fixed bottom-0 w-full flex md:hidden gap-x-2 justify-evenly items-center px-4 border-t border-c-seperator bg-c-light">
        <div class="flex items-center justify-center">
            <NuxtLink to="/" class="p-2.5">
                <span class="inactive-icon">
                    <Icon name="ph:house" class="text-3xl" />
                </span>
                <span class="active-icon hidden">
                    <Icon name="ph:house-fill" class="text-3xl hidden" />
                </span>
            </NuxtLink>
        </div>
        <div v-if="isTipster" class="flex items-center justify-center">
            <button @click="updateOpenCreateModal" class="p-2.5">
                <Icon name="ph:plus-square" class="text-3xl" />
            </button>
        </div>
        <div class="flex items-center justify-center">
            <NuxtLink to="/rankings" class="p-2.5">
                <span class="inactive-icon">
                    <Icon name="ph:trophy" class="text-3xl" />
                </span>
                <span class="active-icon hidden">
                    <Icon name="ph:trophy-fill" class="text-3xl hidden" />
                </span>
            </NuxtLink>
        </div>
        <div class="flex items-center justify-center">
            <button class="p-2.5">
                <Icon name="mdi:medal-outline" class="text-3xl scale-90" />
            </button>
        </div>
        <div class="flex items-center justify-center">
            <NuxtLink to="/" class="p-2.5">
                <Icon name="ph:user-circle" class="text-3xl" />
            </NuxtLink>
        </div>
    </nav>
</template>

<style scoped>
.link-active .active-icon {
    @apply block;
}

.link-active .inactive-icon {
    @apply hidden;
}
</style>
