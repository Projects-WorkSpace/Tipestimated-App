<script setup lang="ts">
// definePageMeta({
//     middleware: 'auth',
// });
</script>
<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col items-center gap-y-2 md:gap-y-4 py-3 md:py-8 mt-6 md:mt-0">
                <ContainersTipsterHeader />
                <div class="w-full flex items-center md:justify-center gap-x-2 md:gap-x-8 mt-4 md:mt-8">
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
                <div class="w-full mt-3">
                    <ContainersPostStatusTab />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
