<script setup lang="ts">
import { IDropdownItem } from '~/types/types';


defineProps<{
    items: IDropdownItem[][] | undefined
}>()

const emits = defineEmits<{
    (e: "clickItem", data: IDropdownItem): void
}>()

</script>

<template>
    <UDropdown :items="items" :ui="{
        item: { disabled: 'cursor-text select-text' },
        divide: 'divide-y divide-neutral-100',
        ring: 'ring-1 ring-neutral-200',
        shadow: 'shadow-lg'
    }" :popper="{ placement: 'bottom-start' }">
        <div class="">
            <slot name="btn" />
        </div>

        <template #item="{ item }">
            <button class="w-full flex items-center" @click="emits('clickItem', item)">
                <span class="truncate">{{ item.label }}</span>
                <Icon :name="item.icon" size="14px" class="flex-shrink-0 ms-auto" />
            </button>
        </template>
    </UDropdown>
</template>
