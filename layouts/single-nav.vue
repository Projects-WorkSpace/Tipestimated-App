<template>
    <main class="flex flex-col">
        <NavsTopNav />
        <nav class="fixed left-0 top-0 bottom-0 hidden md:block">
            <NavsSideNavTipster />
        </nav>
        <div class="w-full flex flex-row justify-center">
            <div
                class="w-full max-w-[570px] md:max-w-[780px] lg:max-w-[680px] md:pl-[6rem] pl-4 sm:pl-0 lg:pl-4 pr-4 md:px-3 mb-14 grow">
                <slot />
                <!-- <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full md:w-auto px-6">
                    <ContainersOnProgress />
                </div> -->
            </div>
        </div>
        <NavsBottomNav />
    </main>
</template>
