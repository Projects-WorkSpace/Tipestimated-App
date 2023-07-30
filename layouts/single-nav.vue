<template>
    <main class="w-full flex flex-row h-screen justify-center">
        <nav class="fixed left-0 top-0 bottom-0">
            <NavsSideNavTipster />
        </nav>
        <div class="w-full max-w-[580px]">
            <slot />
        </div>
    </main>
</template>
