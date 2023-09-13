<template>
    <nav
        class="fixed top-0 w-full flex md:hidden items-center justify-between bg-white z-50 px-4 py-2 border-b border-c-seperator">
        <div class="flex items-center">
            <button class="text-xl font-medium">tipstimate</button>
        </div>
        <div class="flex items-center gap-x-2.5 pr-2">
            <NuxtLink to="/explore"
                class="py-1 px-2.5 text-lg group bg-c-seperator/50 hover:bg-c-seperator/70 rounded-xl flex items-center gap-x-1">
                <Icon name="ph:magnifying-glass" class="group-hover:scale-105" />
                <span class="text-neutral-500 group-hover:text-neutral-800 text-sm mr-4">Search...</span>
            </NuxtLink>
            <button class="p-1 text-2xl group">
                <Icon name="ph:bell" class="group-hover:scale-105" />
            </button>
        </div>
    </nav>
</template>
<style scoped>
.link-active {
    @apply hidden;
}
</style>
