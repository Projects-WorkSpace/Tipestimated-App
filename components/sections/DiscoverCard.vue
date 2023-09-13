<script setup lang="ts">
defineProps<{
    title: string;
    icon: string;
    cardStyle: string;
}>()
</script>
<template>
    <li
        class="w-full bg-gradient-to-b rounded-md px-6 py-6 flex items-center justify-between gap-x-3"
        :class="cardStyle"
    >
        <span class="text-white text-base font-normal md:font-medium leading-tight">{{title}}</span>
        <div class="flex items-center justify-center">
            <Icon :name="icon" size="36" />
        </div>
    </li>
</template>