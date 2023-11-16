<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MenuItem } from "@headlessui/vue";
import { ITipsterPayload } from "~/types/types";
import { GetTipsterDetails } from "@/graphql/accounts";
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from "~/store/pageFeatures";

const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const { is_logged_in } = storeToRefs(authStore);
const { isTipster } = storeToRefs(featureStore);
const { updateOpenCreateModal } = featureStore;

const router = useRouter();
const { getToken, onLogout } = useApollo();
const user_payload = useCookie("user_payload", { sameSite: true });
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

const logoutUser = (): void => {
    authStore.updateIsLoggedIn(false);
    user_payload.value = null;
    tipster_payload.value = null;
    onLogout();
    router.push("/accounts/login");
};

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
        router.push(`a/${tipster_payload.value.penName}`);
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
    <div class="w-full xl:min-w-[250px] h-full flex flex-col justify-between pt-8 pb-4">
        <div class="w-full flex flex-col px-6">
            <h3 class="text-2xl font-sans font-medium italic hidden lg:block">
                Tipstimate
            </h3>
        </div>
        <div class="w-full flex flex-col px-6 gap-y-4">
            <div v-if="isTipster" class="w-full flex flex-col">
                <button class="w-full flex flex-row gap-x-2 items-center group" @click="updateOpenCreateModal">
                    <span
                        class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white rounded-xl transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:plus" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Create</span>
                </button>
            </div>
            <div class="w-full flex flex-col">
                <button v-if="is_logged_in" @click="redirectToMyAccount"
                    class="w-full flex flex-row gap-x-2 items-center group">
                    <transition mode="out-in">
                        <span v-if="!tipster_details"
                            class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white rounded-t-xl transition-colors duration-200 cursor-pointer">
                            <Icon name="mdi:account" class="text-neutral-700 text-xl md:text-2xl" />
                        </span>
                        <span v-else
                            class="p-3 group-hover:bg-[#e2e2e2]/60 bg-white rounded-t-xl transition-colors duration-200 cursor-pointer">
                            <NuxtImg :src="tipster_details.imageUrl"
                                class="w-8 lg:w-10 h-8 lg:h-10 ring-1 ring-offset-1 ring-base-pink rounded-full" />
                        </span>
                    </transition>
                    <span class="text-base font-medium hidden xl:block">Profile</span>
                </button>
                <NuxtLink to="/" class="w-full flex flex-row gap-x-2 items-center group">
                    <span
                        class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer"
                        :class="is_logged_in ? '' : 'rounded-t-xl'">
                        <Icon name="mdi:home-variant" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Home</span>
                </NuxtLink>
                <NuxtLink href="/rankings" class="w-full flex flex-row gap-x-2 items-center group">
                    <span
                        class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:trophy" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Tipster Rank</span>
                </NuxtLink>
                <button class="w-full flex flex-row gap-x-2 items-center group">
                    <span
                        class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:medal-outline" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Contest</span>
                </button>
                <button class="w-full flex flex-row gap-x-2 items-center group">
                    <span
                        class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white rounded-b-xl transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:chart-bar" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Tipster Analysis</span>
                </button>
            </div>
            <!-- {{ is_logged_in }} -->
            <transition mode="out-in">
                <div v-if="is_logged_in" class="w-full flex flex-col">
                    <UiMenuDropDown>
                        <template #button>
                            <div class="w-full flex flex-row gap-x-2 items-center group">
                                <div
                                    class="p-4 lg:p-5 group-hover:bg-[#e2e2e2]/60 bg-white rounded-xl transition-colors duration-200 cursor-pointer">
                                    <Icon name="mdi:menu" class="text-neutral-700 text-xl md:text-2xl" />
                                </div>
                                <span class="text-lg font-medium hidden xl:block">More</span>
                            </div>
                        </template>
                        <template #items>
                            <div class="px-2 py-2">
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-[#e2e2e2]/60' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2.5 py-2.5 text-base hover:bg-[#e2e2e2]/60',
                                ]">
                                    <Icon name="mdi:cog" :active="active" class="mr-2 h-5 w-5 text-gray-700"
                                        aria-hidden="true" />
                                    Settings
                                </button>
                                </MenuItem>
                            </div>
                            <div class="px-2 py-2">
                                <MenuItem v-slot="{ active }">
                                <button @click="logoutUser" :class="[
                                    active ? 'bg-[#e2e2e2]/60' : 'text-gray-900',
                                    'group flex w-full items-center rounded-lg px-2.5 py-2.5 text-base hover:bg-[#e2e2e2]/60',
                                ]">
                                    Logout
                                </button>
                                </MenuItem>
                            </div>
                        </template>
                    </UiMenuDropDown>
                </div>
                <div v-else class="w-full flex flex-col pb-1.5">
                    <NuxtLink to="/accounts/login"
                        class="text-base text-center text-white bg-green-600 rounded-lg px-4 py-2 hover:bg-green-700 transition-colors duration-200">
                        Sign in</NuxtLink>
                </div>
            </transition>
        </div>

        <!-- Modals -->
    </div>
</template>
