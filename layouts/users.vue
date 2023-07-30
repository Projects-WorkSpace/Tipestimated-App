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
        <nav class="fixed left-0 top-0 bottom-0">
            <NavsSideNavTipster />
        </nav>
        <div class="w-full max-w-[400px]">
            <slot />
        </div>
        <nav class="fixed right-0 flex flex-col">
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
