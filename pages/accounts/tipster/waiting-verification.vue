<template>
    <section class="w-full flex flex-col items-center">
        <div class="w-full max-w-[390px] mt-16 border border-c-seperator flex flex-col">
            <div
                class="w-full flex flex-col items-center justify-center px-3 py-4 mt-4 gap-y-6 border-b border-c-seperator"
            >
                <div class="">
                    <button class="p-2 rounded-full bg-slate-200 flex items-center justify-center">
                        <Icon name="mdi:account" class="text-neutral-500/50 text-7xl" />
                    </button>
                </div>
                <div class="flex flex-col items-center gap-y-2">
                    <h3 class="text-xl font-semibold text-neutral-700">We are still reviewing your details.</h3>
                    <p class="text-xs text-t-gray">Waiting since July 2, 2023 at 11:00 AM</p>
                </div>
            </div>
            <div class="w-full flex flex-col px-3 py-4 gap-y-2">
                <div class="w-full flex gap-x-2 items-center">
                    <NuxtImg src="/icons/docs.png" class="h-5 w-5 opacity-60" />
                    <p class="text-gray-700 text-lg font-medium">Read more about this.</p>
                </div>
                <div class="w-full">
                    <p class="text-sm text-t-gray">
                        We appreciate your patience during this process, and we look forward to welcoming you as a
                        valuable member of our Tipster community. If you have any questions or require further
                        assistance, please don't hesitate to reach out to our support team.
                    </p>
                </div>
                <div class="w-full flex flex-col mt-2.5">
                    <button
                        class="w-full py-2 text-sm font-semibold bg-blue-500 text-white tracking-wide rounded hover:bg-blue-600 focus:bg-blue-600 transition flex items-center justify-center"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
