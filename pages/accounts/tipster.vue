<script setup lang="ts">
const layout = 'tipster'
</script>
<template>
    <main class="w-full flex flex-col">
        <NuxtLayout :name="layout">
            <NuxtPage />
        </NuxtLayout>
    </main>
</template>
