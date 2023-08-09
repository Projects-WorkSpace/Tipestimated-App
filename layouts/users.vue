<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageFeatureStore } from '~/store/pageFeatures';


// const { toggleCreateModal, updateToggleCreateModal } = usePageFeatureStore()
const stores = storeToRefs(usePageFeatureStore())

const closeFollowerModal = (): void => {
    // isOpen.value = false
    console.log('Closed')
    stores.openCreate.value = false
}

const openFollowerModal = (): void => {
    // isOpen.value = true
    console.log('Clicked Open')
    stores.openCreate.value = true
}
</script>
<template>
    <main class="w-full flex flex-row justify-center">
        <nav class="fixed left-0 top-0 bottom-0 hidden md:block">
            <NavsSideNavTipster />
        </nav>
        <div
            class="w-full max-w-[570px] md:max-w-[780px] lg:max-w-[680px] md:pl-[6rem] pl-4 sm:pl-0 lg:pl-4 pr-4 md:px-3 grow">
            <slot />
            {{ stores.openCreate.value }}
        </div>
        <nav class="fixed right-0 flex-col hidden xl:flex">
            <NavsRightTipsteraNav />
        </nav>
    </main>
</template>
