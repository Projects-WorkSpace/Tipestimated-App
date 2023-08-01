<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
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
    <div class="w-full xl:min-w-[250px] h-full flex flex-col justify-between pt-8 pb-4 border-r border-c-seperator">
        <div class="w-full flex flex-col px-4">
            <h3 class="text-3xl font-normal tracking-wide hidden xl:block">Tipstimate</h3>
        </div>
        <div class="w-full flex flex-col px-2 gap-y-2">
            <div class="w-full flex flex-col gap-y-2 mb-10">
                <div class="w-full">

                    <NuxtLink href="/"
                        class="w-full px-2 py-2 xl:py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded-lg transition-colors duration-200 cursor-pointer">
                        <div class="p-3.5 bg-white rounded-xl">
                            <Icon name="mdi:home-variant" class="text-neutral-700 text-2xl" />
                        </div>
                        <span class="text-base hidden xl:block">Home</span>
                    </NuxtLink>
                </div>
                <div class="w-full">
                    <div
                        class="w-full px-2 py-2 xl:py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded-lg transition-colors duration-200 cursor-pointer">
                        <div class="p-3.5 bg-white rounded-xl">
                            <Icon name="mdi:plus" class="text-neutral-700 text-2xl" />
                        </div>
                        <span class="text-base hidden xl:block">Create</span>
                    </div>
                </div>
                <div class="w-full">

                    <NuxtLink href="#"
                        class="w-full px-2 py-2 xl:py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded-lg transition-colors duration-200 cursor-pointer">
                        <div class="p-3.5 bg-white rounded-xl">
                            <Icon name="mdi:medal-outline" class="text-neutral-700 text-2xl" />
                        </div>
                        <span class="text-base hidden xl:block">Tipster Rank</span>
                    </NuxtLink>
                </div>
                <div class="w-full">

                    <NuxtLink href="#"
                        class="w-full px-2 py-2 xl:py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded-lg transition-colors duration-200 cursor-pointer">
                        <div class="p-3.5 bg-white rounded-xl">
                            <Icon name="mdi:trophy" class="text-neutral-700 text-2xl" />
                        </div>
                        <span class="text-base hidden xl:block">Contest</span>
                    </NuxtLink>
                </div>
                <div class="w-full">

                    <NuxtLink href="#"
                        class="w-full flex flex-row items-center gap-x-2 px-2 py-2 xl:py-1 mt-5 hover:bg-[#e2e2e2]/60 rounded-lg transition-colors duration-200 cursor-pointer">
                        <div class="p-2 bg-white rounded-xl">
                            <button class="p-1.5 rounded-full bg-slate-200 flex items-center justify-center">
                                <Icon name="mdi:account" class="text-neutral-700 text-2xl" />
                            </button>
                        </div>
                        <span class="text-base hidden xl:block">Profile</span>
                    </NuxtLink>
                </div>
            </div>
            <div class="w-full flex flex-col">
                <UiMenuDropDown>
                    <template #button>
                        <div
                            class="flex w-full rounded-lg flex-row items-center justify-start gap-x-2 px-2 py-2 hover:bg-[#e2e2e2]/60">
                            <div class="p-3.5 bg-white rounded-xl">
                                <Icon name="mdi:menu" class="text-2xl" />
                            </div>
                            <span class="text-lg hidden xl:block">More</span>
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
    </div>
</template>
