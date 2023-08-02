<script setup lang="ts">
defineProps<{
    wAndH?: string
}>()
</script>
<template>
    <div class="flex items-center justify-center">
        <NuxtImg src="/images/profile-picture-5.jpg"
            :class="['p-0.5 rounded-full ring-2 ring-fuchsia-400', wAndH || 'w-14 h-14']" />
    </div>
</template>