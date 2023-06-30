<template>
    <div class="w-full flex flex-col mt-8 px-4">
        <div class="h-72">
            <NuxtLink to="/tipster" class="font-bold text-xl cursor-pointer">Tipstimate</NuxtLink>
        </div>
        <div class="flex flex-col space-y-6">
            <div class="flex flex-row space-x-3 items-center">
                <div class="w-10 h-10 rounded-full">
                    <nuxt-img
                        src="/images/rick-gebhardt-F3v6OP0cl8g-unsplash.jpg"
                        alt="user's profile"
                        class="w-full h-full rounded-full object-cover"
                    ></nuxt-img>
                </div>
                <NuxtLink t0="" class="font-bold cursor-pointer">Profilo</NuxtLink>
            </div>
            <div class="flex flex-row space-x-3 items-center py-6">
                <Icon name="mdi:plus" class="h-6 w-6 cursor-pointer"></Icon>
                <NuxtLink to="" class="font-bold cursor-pointer">Create Evento</NuxtLink>
            </div>
            <div class="flex flex-row space-x-3 items-center">
                <Icon name="mdi:home" class="h-6 w-6 cursor-pointer"></Icon>
                <NuxtLink to="" class="font-bold cursor-pointer">Home</NuxtLink>
            </div>
            <div class="flex flex-row space-x-3 items-center">
                <Icon name="mdi:trophy" class="h-6 w-6 cursor-pointer"></Icon>
                <NuxtLink to="" class="font-bold cursor-pointer">Contest</NuxtLink>
            </div>
            <div class="flex flex-row space-x-3 items-center">
                <Icon name="mdi:medal-outline" class="h-6 w-6 cursor-pointer"></Icon>
                <NuxtLink to="" class="font-bold cursor-pointer">classifica Tipster</NuxtLink>
            </div>
        </div>
    </div>
</template>
