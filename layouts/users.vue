<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePageFeatureStore } from "~/store/pageFeatures";

const { isTipster } = storeToRefs(usePageFeatureStore());
</script>
<template>
  <main ref="el" class="flex flex-col h-screen overflow-y-auto">
    <NavsTopNav />
    <nav class="fixed left-0 top-0 bottom-0 hidden md:block lg:pl-4 2xl:pl-8">
      <NavsSideNavTipster />
    </nav>
    <div class="w-full flex flex-row justify-center">
      <div
        class="w-full max-w-[570px] md:max-w-[780px] lg:max-w-[680px] md:pl-[6rem] pl-4 sm:pl-0 lg:pl-4 pr-4 md:px-3 mb-14 mt-11 md:mt-0 grow"
      >
        <slot />
      </div>
    </div>
    <nav class="fixed right-0 flex-col hidden xl:flex lg:pr-4 2xl:pr-8">
      <NavsRightTipsteraNav />
    </nav>
    <NavsBottomNav />

    <!-- Global Modals -->
    <LazyContainersCreateTip v-if="isTipster" />
  </main>
</template>
