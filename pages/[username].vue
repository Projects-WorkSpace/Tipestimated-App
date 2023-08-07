<script setup lang="ts">
// definePageMeta({
//     middleware: 'auth',
// });
</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-8">
                <div class="w-full flex items-center gap-x-10">
                    <UiAvatar w-and-h="w-28 h-28" />
                    <div class="flex flex-col items-center gap-y-6 grow">
                        <div class="w-full flex items-center justify-between">
                            <div class="flex flex-col">
                                <span class="text-2xl font-medium">@user1</span>
                                <span class="text-base text-neutral-700">Nome Cognome</span>
                            </div>
                            <div class="flex items-center gap-x-4">
                                <div class="">
                                    <button
                                        class="bg-neutral-600/80 text-white font-medium text-lg rounded-xl px-5 py-1 hover:bg-neutral-600 transition duration-200">
                                        Following
                                        <Icon name="mdi:chevron-down" class="text-lg ml-1" />
                                    </button>
                                </div>
                                <div class="">
                                    <button
                                        class="bg-neutral-600/80 text-white font-medium text-lg rounded-xl px-5 py-1 hover:bg-neutral-600 transition duration-200">Message</button>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex items-center justify-between">
                            <div class="flex items-center gap-x-2">
                                <span class="text-lg">Ranking</span>
                                <span class="text-lg font-medium">#3</span>
                            </div>
                            <div class="flex items-center gap-x-2">
                                <span class="text-lg">Followers</span>
                                <span class="text-lg font-medium">10.4k</span>
                            </div>
                            <div class="flex items-center gap-x-2">
                                <span class="text-lg">ROI</span>
                                <span class="text-lg font-medium">82%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-center gap-x-8 mt-8">
                    <button class="flex items-center px-2">
                        <Icon name="⚽" class="scale-110 mr-1.5" />
                        <p class="text-base ml-1">Football</p>
                    </button>
                    <button class="flex items-center px-2">
                        <Icon name="🏀" class="scale-110 mr-1.5" />
                        <p class="text-base">Basket</p>
                    </button>
                    <button class="flex items-center px-2">
                        <Icon name="🏍️" class="mr-1.5 scale-110" />
                        <p class="text-base">MotorGP</p>
                    </button>
                    <button class="flex items-center px-2">
                        <Icon name="🎾" class="mr-1.5 scale-110" />
                        <p class="text-base">Tennis</p>
                    </button>
                </div>
                <div class="w-full grid grid-cols-2 gap-x-3 mt-5">
                    <button
                        class="bg-base-green py-2.5 text-base rounded-xl font-medium tracking-wide hover:bg-base-green/80 transition duration-200">Active</button>
                    <button
                        class="py-2.5 text-base rounded-xl font-medium tracking-wide focus:outline-none hover:bg-light-hover/60 focus:bg-light-hover/60 transition duration-200">Expired</button>
                </div>
                <hr>
                <div class="w-full flex flex-col gap-y-4 mt-2">
                    <SectionsPostCard />
                    <SectionsPostCard />
                    <SectionsPostCard />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
