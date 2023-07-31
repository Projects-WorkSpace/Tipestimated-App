<template>
    <ContainersDialog>
        <div class="w-full flex flex-col gap-y-3 px-4 py-4">
            <div class="w-full card-header flex justify-between items-center">
                <div class="flex gap-x-4 items-center">
                    <UiAvatar />
                    <span class="text-xl font-medium">User 1</span>
                </div>
                <div class="flex items-center">
                    <button
                        class="text-base uppercase text-neutral-500 border border-c-seperator rounded-3xl px-8 py-2">follow</button>
                </div>
            </div>
            <UiCardDetails>
                <div class="flex flex-col gap-y-2 px-4 py-2 divide-y divide-gray-400">
                    <div class="w-full flex-col flex px-2 py-4 gap-y-1">
                        <div class="title w-full">
                            <p class="text-base font-medium">Milan - Hellas Verona</p>
                        </div>
                        <div class="flex gap-x-2 items-center w-full">
                            <div class="flex items-center gap-x-2">
                                <Icon name="⚽" class="text-sm text-neutral-500 bg-opacity-50" />
                                <p class="text-sm text-neutral-600">Football</p>
                            </div>
                            <div class="flex items-center gap-x-2 text-sm text-neutral-500">
                                <span>-</span>
                                <span>Italy</span>
                                <span>-</span>
                                <span>Seria A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UiCardDetails>
            <div class="w-full flex items-center justify-between px-4 pt-1">
                <div class="flex items-center gap-x-4">
                    <button class="flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:cards-heart-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">10.5k</span>
                    </button>
                    <button class="flex flex-col gap-y-1 justify-cente items-center">
                        <Icon name="mdi:share-variant-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">Share</span>
                    </button>
                    <button class="flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:plus-circle-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">Add story</span>
                    </button>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center bg-green-500 gap-x-2 rounded-xl px-3 py-3 divide-x divide-c-seperator">
                        <div class="flex items-center">
                            <NuxtImg src="/images/bet365.svg" class="h-4" />
                        </div>
                        <div class="flex items-center flex-col text-c-light px-2">
                            <p class="text-sm">Played</p>
                            <small class="text-xs">258 times</small>
                        </div>
                        <div class="flex items-center flex-col text-c-light px-2">
                            <p class="text-sm">Probability</p>
                            <small class="text-xs">1.17</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContainersDialog>
</template>