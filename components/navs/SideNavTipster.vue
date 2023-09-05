<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import { usePageFeatureStore } from '~/store/pageFeatures';
import { DialogTitle } from '@headlessui/vue'


const featureStore = usePageFeatureStore()

const closeCreateModal = (): void => {
    featureStore.updateOpenCreateModal();
};

const openCreateModal = (): void => {
    featureStore.updateOpenCreateModal();
}
const { onLogout } = useApollo()
const router = useRouter()
const user_payload = useCookie("user_payload")
const logoutUser = (): void => {
    user_payload.value = null;
    onLogout()
    router.push("/accounts/login")
}
</script>
<template>
    <div class="w-full xl:min-w-[250px] h-full flex flex-col justify-between pt-8 pb-4">
        <div class="w-full flex flex-col px-4">
            <h3 class="text-2xl font-sans font-bold tracking-wide hidden lg:block">tipstimate</h3>
        </div>
        <div class="w-full flex flex-col px-4 gap-y-2">
            <div class="w-full flex flex-col">
                <button class="w-full flex flex-row gap-x-2 items-center" @click="openCreateModal">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white rounded-xl transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:plus" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Create</span>
                </button>
            </div>
            <div class="w-full flex flex-col">
                <button class="w-full flex flex-row gap-x-2 items-center">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white rounded-t-xl transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:account" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Profile</span>
                </button>
                <NuxtLink to="/" class="w-full flex flex-row gap-x-2 items-center">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:home-variant" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Home</span>
                </NuxtLink>
                <NuxtLink href="/rankings" class="w-full flex flex-row gap-x-2 items-center">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:trophy" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Tipster Rank</span>
                </NuxtLink>
                <button class="w-full flex flex-row gap-x-2 items-center">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:medal-outline" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Contest</span>
                </button>
                <button class="w-full flex flex-row gap-x-2 items-center">
                    <span
                        class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white rounded-b-xl transition-colors duration-200 cursor-pointer">
                        <Icon name="mdi:chart-bar" class="text-neutral-700 text-xl md:text-2xl" />
                    </span>
                    <span class="text-base font-medium hidden xl:block">Tipster Analysis</span>
                </button>
            </div>
            <div class="w-full flex flex-col">
                <UiMenuDropDown>
                    <template #button>
                        <div class="w-full flex flex-row gap-x-2 items-center">
                            <div
                                class="p-4 lg:p-5 hover:bg-[#e2e2e2]/60 bg-white rounded-xl transition-colors duration-200 cursor-pointer">
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
        </div>

        <!-- Modals -->

        <ModalsModalContainer :is-open="featureStore.openCreate" @open-modal="openCreateModal"
            @close-modal="closeCreateModal">
            <div class="w-full flex flex-col justify-between min-h-[30vh]">
                <div class="w-full flex flex-col">
                    <DialogTitle as="div" class="flex items-center justify-center relative">
                    <h3 class="text-lg font-semibold leading-6 text-gray-900">Create Tip</h3>
                    <button @click="closeCreateModal" class="absolute right-1 text-neutral-600 hover:text-neutral-800 ">
                        <Icon name="mdi:close" class="text-xl" />
                    </button>
                </DialogTitle>
                <div class="w-full mt-3.5 flex flex-col gap-y-2.5">
                    <div class="w-full">
                        <ContainersSelectInput />
                    </div>
                    <div class="w-full">
                        <ContainersSelectInput />
                    </div>
                    <div class="w-full">
                        <ContainersSelectInput />
                    </div>
                    <div class="w-full">
                        <ContainersSelectInput />
                    </div>
                    <div class="w-full">
                        <ContainersSelectInput />
                    </div>
                </div>
                </div>
                <div class="w-full flex justify-end items-center mt-4 gap-x-2">
                    <span class="text-base">Insert another game</span>
                    <button class="bg-light-hover/80 p-1.5 rounded-lg">
                        <Icon name="mdi:plus-thick" class="text-xl text-neutral-700" />
                    </button>
                </div>
                <div class="mt-8 flex items-center justify-between">
                    <div class="flex items-center gap-x-5">
                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-light-hover/80 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none"
                            @click="closeCreateModal">
                            <Icon name="mdi:account-multiple" class="text-xl mr-1" />
                            Friends
                        </button>
                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-light-hover/80 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-light-hover focus:outline-none">
                            <Icon name="mdi:bullhorn" class="text-xl mr-1" />
                            Channel
                        </button>
                    </div>
                    <div class="flex items-center gap-x-5">
                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white hover:bg-base-green focus:outline-none">
                            Promote
                        </button>
                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-green-500/80 px-4 py-2 text-sm font-medium text-white hover:bg-base-green focus:outline-none">
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </ModalsModalContainer>
    </div>
</template>
