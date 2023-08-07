<template>
    <main class="w-full flex flex-row h-screen justify-center">
        <nav class="fixed left-0 top-0 bottom-0 hidden md:block">
            <NavsSideNavTipster />
        </nav>
        <div
            class="w-full max-w-[570px] md:max-w-[780px] lg:max-w-[680px] md:pl-[6rem] px-4 sm:px-2 lg:pl-4 pr-4 md:px-3 grow">
            <slot />
        </div>
    </main>
</template>
