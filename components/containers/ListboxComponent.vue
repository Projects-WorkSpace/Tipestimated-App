<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import { IListProps } from '~/types/types';

defineProps<{
    list: IListProps[];
    selected: IListProps;
    error_status?: boolean
    error_text?: string
}>();
defineEmits<{
    (e: 'updatedSelected', data: IListProps): void;
}>();
</script>
<template>
    <div class="w-full z-0">
        <Listbox :model-value="selected" @update:model-value="$emit('updatedSelected', $event)">
            <div class="relative">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg text-gray-500 bg-c-light py-2.5 pl-3 pr-10 text-left border border-c-seperator/60 focus:border-neutral-400/60 focus:outline-none sm:text-sm">
                    <span class="flex items-center truncate">
                        <Icon v-if="selected.icon" :name="selected.icon" class="h-5 w-5 mr-3" aria-hidden="true" />
                        {{ selected.name }}
                    </span>
                    <span role="button"
                        class="flex flex-col justify-center pointer-events-none absolute inset-y-0 right-0 items-center pr-2">
                        <Icon name="mdi:chevron-up" class="h-4 w-4 text-gray-400" aria-hidden="true" />
                        <Icon name="mdi:chevron-down" class="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>
                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="item in list" :key="item.name" :value="item"
                            :disabled="item.disabled" as="template">
                            <li :class="[
                                active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-4 flex items-center',
                            ]">
                                <span v-if="item.icon" class="flex items-center text-amber-600">
                                    <Icon :name="item.icon" class="h-5 w-5 mr-3" aria-hidden="true" />
                                </span>
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate text-sm',
                                ]">{{ item.name }}</span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
            <p v-if="error_status" class="text-xs text-red-500 mt-1.5 ml-0.5">{{ error_text }}</p>
        </Listbox>
    </div>
</template>
