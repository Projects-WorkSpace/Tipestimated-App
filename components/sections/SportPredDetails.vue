<template>
    <div class="w-full flex-col flex sm:px-2 py-4 gap-y-1">
        <div class="title w-full">
            <p class="text-base font-medium">Milan - Hellas Verona</p>
        </div>
        <div class="w-full flex flex-col gap-y-3 sm:gap-y-1 relative">
            <div class="flex gap-x-2 items-center w-full">
                <div class="flex items-center gap-x-2">
                    <Icon name="⚽" class="text-sm text-neutral-500 bg-opacity-50" />
                    <p class="text-sm text-neutral-600">Football</p>
                </div>
                <div class="flex items-center gap-x-2 text-sm text-neutral-500">
                    <span>-</span>
                    <span>Italy</span>
                    <span>-</span>
                    <span>Seria A</span>
                </div>
            </div>
            <div class="w-full flex justify-between items-start pl-8 mt-2.5 gap-x-4">
                <div class="flex items-center gap-x-2">
                    <span class="text-xs sm:text-sm uppercase font-medium ">U/O OUTCOME 1ST : 0.5 UNDER</span>
                </div>
                <div class="flex items-center gap-x-2">
                    <span class="text-xs sm:text-sm uppercase font-medium ">
                        2.85</span>
                </div>
            </div>
            <span class="absolute left-1.5 top-[40%] bottom-[15%] w-[1px] bg-neutral-400"></span>
            <span class="absolute left-1.5 bottom-[15%] w-5 h-[1px] bg-neutral-400"></span>
        </div>
    </div>
</template>
