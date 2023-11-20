<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePageFeatureStore } from "~/store/pageFeatures";
import { ITipsterPayload } from "~/types/types";
import { GetTipsterDetails } from "@/graphql/accounts";
import { useAuthStore } from "~/store/authStore";

const featureStore = usePageFeatureStore();
const { isTipster } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;
const authStore = useAuthStore();
const { is_logged_in } = storeToRefs(authStore);

const route = useRoute();
const { getToken } = useApollo();
const tipster_payload = useCookie<ITipsterPayload | null>("tipster_payload", {
    sameSite: true,
});
const tipster_details = ref<IGetTipster>();

interface ITipsterDetails {
    getTipster: IGetTipster;
}
interface IGetTipster {
    id: string;
    imageUrl: string;
}

const getTipster = () => {
    const { onResult, onError } = useQuery<ITipsterDetails>(GetTipsterDetails, {
        tipsterId: tipster_payload.value?.tipsterID,
    });
    onResult((result) => {
        tipster_details.value = result.data.getTipster;
    });
    onError((err) => {
        console.log("Tipster error: ", err.message);
    });
};

const redirectToMyAccount = () => {
    if (tipster_payload.value) {
        if (!route.params.penName) {
            navigateTo(`a/${tipster_payload.value.penName}`);
        }
    }
};

onMounted(async () => {
    let token = await getToken();
    if (token && tipster_payload.value) {
        getTipster();
    }
});
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
        <div class="flex items-center justify-center">
            <NuxtLink to="/explore" class="p-2.5">
                <span class="inactive-icon">
                    <Icon name="ph:magnifying-glass" class="text-3xl" />
                </span>
                <span class="active-icon hidden">
                    <Icon name="ph:magnifying-glass-bold" class="text-3xl hidden text-black" />
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
            <button v-if="is_logged_in" @click="redirectToMyAccount"
                class="w-full flex flex-row gap-x-2 items-center group">
                <transition mode="out-in">
                    <Icon name="mdi:account" v-if="!tipster_details" class="text-neutral-700 text-3xl" />
                    <NuxtImg v-else :src="tipster_details.imageUrl"
                        class="w-7 h-7 ring-1 ring-offset-1 ring-base-pink rounded-full" />
                </transition>
            </button>
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
