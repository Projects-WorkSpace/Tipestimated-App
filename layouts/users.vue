<script setup lang="ts">

const isOpen = ref(false)

const closeFollowerModal = (): void => {
    isOpen.value = false
}

const openFollowerModal = (): void => {
    isOpen.value = true
    console.log('Clicked Open')
}
</script>
<template>
    <main class="w-full flex flex-row h-screen justify-center">
        <nav class="fixed left-0 top-0 bottom-0 hidden md:block">
            <NavsSideNavTipster />
        </nav>
        <div class="w-full max-w-[570px] md:max-w-[680px] px-2 md:px-0">
            <slot />
        </div>
        <nav class="fixed right-0 flex-col hidden xl:flex">
            <NavsRightTipsteraNav />
        </nav>
        <!-- <UModal v-model="isOpen"> -->
        <ClientOnly>
            <ModalsModalContainer :is-open="isOpen" @open-modal="openFollowerModal" @close-modal="closeFollowerModal">
                <!-- <UiFollowers @close-modal="closeFollowerModal" /> -->
            </ModalsModalContainer>
        </ClientOnly>
        <!-- </UModal> -->
    </main>
</template>
