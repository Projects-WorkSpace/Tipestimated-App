<template>
    <div class="w-full min-w-[250px] h-full flex flex-col justify-between pt-8 pb-4 border-r border-c-seperator">
        <div class="w-full flex flex-col px-4">
            <h3 class="text-xl font-semibold tracking-wide">Tipstimate</h3>
        </div>
        <div class="w-full flex flex-col px-2 gap-y-2">
            <div class="w-full flex flex-col gap-y-2 mb-10">
                <div
                    class="w-full px-2 py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded transition-colors duration-200 cursor-pointer"
                >
                    <div class="p-3.5 bg-white rounded-xl">
                        <Icon name="mdi:home-variant" class="text-neutral-700 text-2xl" />
                    </div>
                    <span class="text-base">Home</span>
                </div>
                <div
                    class="w-full px-2 py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded transition-colors duration-200 cursor-pointer"
                >
                    <div class="p-3.5 bg-white rounded-xl">
                        <Icon name="mdi:plus" class="text-neutral-700 text-2xl" />
                    </div>
                    <span class="text-base">Create</span>
                </div>
                <div
                    class="w-full px-2 py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded transition-colors duration-200 cursor-pointer"
                >
                    <div class="p-3.5 bg-white rounded-xl">
                        <Icon name="mdi:medal-outline" class="text-neutral-700 text-2xl" />
                    </div>
                    <span class="text-base">Tipster Rank</span>
                </div>
                <div
                    class="w-full px-2 py-1 flex flex-row gap-x-2 items-center hover:bg-[#e2e2e2]/60 rounded transition-colors duration-200 cursor-pointer"
                >
                    <div class="p-3.5 bg-white rounded-xl">
                        <Icon name="mdi:trophy" class="text-neutral-700 text-2xl" />
                    </div>
                    <span class="text-base">Contest</span>
                </div>
                <div
                    class="w-full flex flex-row items-center gap-x-2 px-2 py-1 mt-5 hover:bg-[#e2e2e2]/60 rounded transition-colors duration-200 cursor-pointer"
                >
                    <div class="p-2 bg-white rounded-xl">
                        <button class="p-1.5 rounded-full bg-slate-200 flex items-center justify-center">
                            <Icon name="mdi:account" class="text-neutral-700 text-2xl" />
                        </button>
                    </div>
                    <span class="text-base">Profile</span>
                </div>
            </div>
            <div class="w-full flex flex-col">
                <button class="flex flex-row items-center justify-start gap-x-2 px-2 py-2">
                    <div class="p-3.5 bg-white rounded-xl">
                        <Icon name="mdi:menu" class="text-2xl" />
                    </div>
                    <span class="text-lg">More</span>
                </button>
            </div>
        </div>
    </div>
</template>
