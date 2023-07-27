<script setup lang="ts">
import { DialogPanel, DialogTitle } from '@headlessui/vue'
const emit = defineEmits<{
    (e: 'closeModal'): void
}>()
</script>
<template>
    <DialogPanel
        class="w-full min-w-[400px] transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all">
        <DialogTitle as="div"
            class="w-full flex flex-row items-center justify-center relative py-3.5 border-b border-c-seperator">
            <h3 class="text-xl font-normal leading-6 text-gray-900">Follow</h3>
            <button @click="emit('closeModal')" class="p-1 absolute right-4 text-gray-600">
                <Icon name="mdi:close" class="text-2xl" />
            </button>
        </DialogTitle>
        <div class="grid grid-cols-2 w-f">
            <div class="border-b border-slate-400 flex items-center justify-center py-2" role="button">
                <span class="text-base text-slate-800 font-medium tracking-wide">Tipsters</span>
            </div>
            <div class="border-b border-slate-200 flex items-center justify-center py-2" role="button" aria-disabled="true">
                <span class="text-base text-slate-500 font-medium tracking-wide">Channels</span>
            </div>
        </div>

        <div class="min-h-[250px] max-h-[350px] flex flex-col w-full overflow-y-scroll">
            <form class="flex items-center py-1 px-2.5">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Icon name="mdi:magnify" class="text-base text-t-gray" />
                    </div>
                    <input type="text" id="simple-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full pl-8 py-2.5 focus:outline-none"
                        placeholder="Search tipster or channel name..." required />
                </div>
                <button type="submit"
                    class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <Icon name="mdi:magnify" class="text-xl" />
                    <span class="sr-only">Search</span>
                </button>
            </form>
            <div class="w-full flex flex-col px-4 mt-2.5 gap-y-2.5 pb-1.5">
                <UiFollowListItem />
                <UiFollowListItem />
                <UiFollowListItem />
                <UiFollowListItem />
                <UiFollowListItem />
                <UiFollowListItem />
                <UiFollowListItem />
            </div>
            <!-- <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="emit('closeModal')"
            >
                Got it, thanks!
            </button> -->
        </div>
    </DialogPanel>
</template>
