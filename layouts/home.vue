<template>
    <main class="grid grid-cols-10">
        <NavsTipsterLeft class="col-span-2" />
        <div class="col-span-6">
            <slot />
        </div>
        <NavsTipsterRight class="col-span-2" />
    </main>
</template>
