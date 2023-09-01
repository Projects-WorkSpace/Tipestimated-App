<script setup lang="ts">
// definePageMeta({
//     middleware: 'auth',
// });
</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-3 md:py-8">
                <div class="w-full flex items-center gap-x-5 md:gap-x-10">
                    <UiAvatar w-and-h="w-24 md:w-28 h-24 md:h-28" />
                    <div class="flex flex-col items-center gap-y-6 grow">
                        <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-y-2.5">
                            <div class="flex md:flex-col items-baseline md:items-start gap-x-2">
                                <span class="text-2xl font-semibold">@User 1</span>
                                <span class="text-sm md:text-base text-neutral-700 hidden md:block">Nome Cognome</span>
                            </div>
                            <div class="flex items-center gap-x-4">
                                <div class="">
                                    <button
                                        class="bg-neutral-600/80 text-white font-medium text-sm md:text-base rounded-xl px-8 py-1.5 hover:bg-neutral-600 transition duration-200">
                                        Following
                                    </button>
                                </div>
                                <div class="">
                                    <button
                                        class="bg-neutral-600/80 text-white font-medium text-sm md:text-base rounded-xl px-8 py-1.5 hover:bg-neutral-600 transition duration-200">Message</button>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex items-center justify-between">
                            <div class="flex items-center gap-x-1.5">
                                <span class="text-sm md:text-base">Ranking</span>
                                <span class="text-sm md:text-base font-medium">#3</span>
                            </div>
                            <div class="flex items-center gap-x-1.5">
                                <span class="text-sm md:text-base">ROI</span>
                                <span class="text-sm md:text-base font-medium">82%</span>
                            </div>
                            <div class="flex items-center gap-x-1.5">
                                <span class="text-sm md:ext-base">Followers</span>
                                <span class="text-sm md:text-base font-medium">10.4k</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-center gap-x-2 md:gap-x-8 mt-4 md:mt-8">
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
                        class="bg-base-green py-2.5 text-base rounded-xl font-medium tracking-wide hover:bg-base-green transition duration-200">Active</button>
                    <button
                        class="py-2.5 text-base rounded-xl font-medium tracking-wide focus:outline-none bg-white hover:bg-base-green transition duration-200">Expired</button>
                </div>
                <div class="w-full flex flex-col gap-y-4 mt-2">
                    <SectionsPostCard />
                    <SectionsPostCard />
                    <SectionsPostCard />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
