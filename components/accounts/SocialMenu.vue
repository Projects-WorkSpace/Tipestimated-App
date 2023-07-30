<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { IListProps } from '~/types/types';
defineProps<{
    social_name: IListProps;
    socials: IListProps[];
}>();
defineEmits<{
    (e: 'updateSocialName', payload: IListProps): void;
}>();
</script>

<template>
    <div class="flex z-0">
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton
                    class="inline-flex w-full justify-center items-center rounded-l-lg bg-c-light px-3 h-10 text-sm font-medium hover:bg-c-light/90 focus:outline-none ring-1 ring-c-seperator/60 focus-visible:ring-neutral-400/60">
                    <Icon :name="social_name.icon || ''" class="text-xl text-t-gray" />
                    <Icon name="mdi:chevron-down" class="ml-2 -mr-1 text-base text-t-gray/80 hover:text-base-green"
                        aria-hidden="true" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute z-10 left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }" v-for="social in socials">
                        <button @click="$emit('updateSocialName', social)" :class="[
                            active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]">
                            <Icon :name="social.icon || ''" class="text-lg mr-2" />
                            {{ social.name }}
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
