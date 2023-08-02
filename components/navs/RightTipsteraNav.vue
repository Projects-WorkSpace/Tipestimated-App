<template>
    <div class="w-full flex flex-col py-8 px-5">
        <div class="w-full flex flex-row items-center gap-x-4">
            <NuxtLink href="/explore/tipsters"
                class="p-3.5 bg-white rounded-xl hover:bg-[#e2e2e2]/60 focus:bg-[#e2e2e2]/60 transition-colors duration-200">
                <Icon name="mdi:magnify" class="text-neutral-600 text-2xl" />
            </NuxtLink>
            <div class="p-3.5 bg-white rounded-xl">
                <Icon name="mdi:bell" class="text-neutral-600 text-2xl" />
            </div>
            <div class="p-3.5 bg-white rounded-xl">
                <Icon name="mdi:account-multiple" class="text-neutral-600 text-2xl" />
            </div>
        </div>
    </div>
</template>
