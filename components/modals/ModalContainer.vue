<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <button
            type="button"
            @click="openModal"
            class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            Open dialog {{ isOpen }}
        </button>
    </div>
    <TransitionRoot appear :show="isOpen">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <!--  -->
                        <div class="w-full flex flex-col">
                            <slot />
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'

const props = defineProps<{
    isOpen: boolean
}>()
const emit = defineEmits<{
    (e: 'closeModal'): void
    (e: 'openModal'): void
}>()

function closeModal() {
    emit('closeModal')
    // isOpen.value = false
}
function openModal() {
    // isOpen.value = true
    emit('openModal')
}
</script>
