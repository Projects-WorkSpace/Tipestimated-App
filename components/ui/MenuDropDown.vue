<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
  
<template>
    <div class="w-full relative">
        <Menu as="div" class="relative inline-block text-left w-full">
            <div class="w-full">
                <MenuButton class="inline-flex w-full">
                    <slot name="button" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute left-0 bottom-full mb-2 w-56 origin-bottom-left divide-y divide-gray-200 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <slot name="items" />
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>