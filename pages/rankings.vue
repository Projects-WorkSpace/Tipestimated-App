<template>
    <div class="w-full">
        <NuxtLayout name="users">
            <div class="w-full flex flex-col gap-y-4 py-8">
                <h3 class="text-xl font-medium text-center">Tipster Rankings</h3>
                <div class="w-full flex flex-col">
                    <div class="w-full flex justify-between items-center mt-3">
                        <div class="flex items-center justify-center pl-20">
                            <h5 class="text-lg font-medium">Username</h5>
                        </div>
                        <div class="flex items-center justify-center pr-24">
                            <h5 class="text-lg font-medium">ROI</h5>
                        </div>
                    </div>
                    <ul class="w-full flex flex-col gap-y-2.5 mt-2">
                        <li class="w-full flex justify-between items-center px-3 py-2 bg-light-hover/50 rounded-xl">
                            <div class="flex items-center gap-x-6">
                                <UiAvatar w-and-h="w-14 h-14" />
                                <div class="">
                                    <p class="text-base">User1</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-x-12">
                                <div class="">
                                    <p class="text-lg font-medium">85%</p>
                                </div>
                                <div class="">
                                    <Icon name="🥇" size="1.5em" class="scale-150" />
                                </div>
                            </div>
                        </li>
                        <li class="w-full flex justify-between items-center px-3 py-2 bg-light-hover/50 rounded-xl">
                            <div class="flex items-center gap-x-6">
                                <UiAvatar w-and-h="w-14 h-14" />
                                <div class="">
                                    <p class="text-base">User150</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-x-12">
                                <div class="">
                                    <p class="text-lg font-medium">82%</p>
                                </div>
                                <div class="">
                                    <Icon name="🥈" size="1.5em" class="scale-150" />
                                </div>
                            </div>
                        </li>
                        <li class="w-full flex justify-between items-center px-3 py-2 bg-light-hover/50 rounded-xl">
                            <div class="flex items-center gap-x-6">
                                <UiAvatar w-and-h="w-14 h-14" />
                                <div class="flex flex-col justify-center">
                                    <p class="text-base font-medium">User754</p>
                                    <p class="text-base text-neutral-500">ROI: 73%</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-x-12">
                                <!-- <div class="">
                                    <p class="text-lg font-medium">85%</p>
                                </div> -->
                                <div class="">
                                    <Icon name="🥉" size="1.5em" class="scale-150" />
                                </div>
                            </div>
                        </li>

                        <li class="w-full flex justify-between items-center px-3 py-2 bg-light-hover/50 rounded-xl">
                            <div class="flex items-center gap-x-6">
                                <UiAvatar w-and-h="w-14 h-14" />
                                <div class="flex flex-col justify-center">
                                    <p class="text-base font-medium">User10</p>
                                    <p class="text-base text-neutral-500">ROI: 71%</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-x-12">
                                <!-- <div class="">
                                    <p class="text-lg font-medium">85%</p>
                                </div> -->
                                <!-- <div class="">
                                    <Icon name="🥉" size="1.5em" class="scale-150" />
                                </div> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>