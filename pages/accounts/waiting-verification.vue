<script setup lang="ts">
definePageMeta({
    layout: false,
});
</script>

<template>
    <main
        class="w-full flex flex-col z-50 fixed top-0 bottom-0 left-0 right-0 bg-c-light px-4 md:px-0"
    >
        <NuxtLayout name="empty-layout">
            <section class="w-full h-full flex items-center justify-center">
                <div class="max-w-[450px] flex flex-col">
                    <ContainersDialog>
                        <div class="w-full flex flex-col px-6 md:px-12 py-8">
                            <div
                                class="w-full flex flex-col items-center justify-center pb-4 gap-y-6"
                            >
                                <div class="flex items-center justify-center">
                                    <Icon name="🥳" class="!text-7xl" />
                                </div>
                                <div class="flex flex-col items-center gap-y-2">
                                    <h3 class="text-3xl font-bold text-center">
                                        We are still reviewing <br />
                                        your details.
                                    </h3>
                                    <p class="text-xs text-t-gray">
                                        Waiting since July 2, 2023 at 11:00 AM
                                    </p>
                                </div>
                            </div>
                            <div class="w-full flex flex-col pt-1 pb-4 gap-y-2">
                                <div class="w-full flex gap-x-1 items-center">
                                    <NuxtImg
                                        src="/icons/docs.png"
                                        class="h-5 w-5"
                                    />
                                    <p class="text-base font-semibold">
                                        Read more about this.
                                    </p>
                                </div>
                                <div class="w-full">
                                    <p class="text-sm text-t-gray">
                                        We appreciate your patience during this
                                        process, and we look forward to welcoming
                                        you as a valuable member of our Tipster
                                        community. If you have any questions or
                                        require further assistance, please don't
                                        hesitate to reach out to our support
                                        team.
                                    </p>
                                </div>
                                <div class="w-full flex flex-col mt-2.5">
                                    <button
                                        class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-black tracking-wide rounded-lg hover:bg-base-green focus:bg-base-green transition flex items-center justify-center"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ContainersDialog>
                </div>
            </section>
        </NuxtLayout>
    </main>
</template>
