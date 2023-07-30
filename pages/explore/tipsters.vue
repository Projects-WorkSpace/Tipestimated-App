<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const router = useRouter()

const redirectBtn = (): void => {
    if (window.history.state.back === null) {
        router.push("/");
    } else {
        router.back();
    }
}
</script>
<template>
    <div class="w-full flex flex-col py-6 gap-y-6">
        <header class="w-full flex items-center gap-x-3">
            <div class="flex items-center flex-none">
                <button @click="redirectBtn"
                    class="p-2 rounded-xl bg-gray-50 text-neutral-600 hover:text-neutral-800 focus:text-neutral-800 outline-none hover:bg-gray-100 ring-1 ring-transparent hover:ring-c-seperator/40">
                    <Icon name="mdi:chevron-left" class="text-3xl" />
                </button>
            </div>
            <div class="grow flex items-center">
                <input type="text"
                    class="w-full py-3 px-4 rounded-xl text-base tracking-wide placeholder:text-neutral-500/60 bg-gray-200/70 focus:outline-none ring-1 ring-transparent focus:ring-c-seperator hover:ring-c-seperator/80"
                    placeholder="Type to search">
            </div>
        </header>
        <div class="w-full flex flex-col gap-y-6 mt-4">
            <h4 class="font-medium text-xl text-neutral-600">Suggested</h4>
            <ul class="w-full flex flex-col gap-y-4">
                <li class="w-full flex items-center justify-between px-3.5 py-4 rounded-xl bg-gray-200/70">
                    <div class="flex items-center gap-x-3">
                        <div class="flex items-center justify-center">
                            <NuxtImg src="/images/profile-picture-5.jpg"
                                class="w-14 h-14 p-0.5 rounded-full ring-2 ring-fuchsia-400" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xl text-neutral-800 font-semibold">User 1</span>
                            <small class="text-base text-neutral-600/70">8 followers</small>
                        </div>
                    </div>
                    <div class="flex justify-end items-center">
                        <button
                            class="bg-neutral-600 text-white rounded-xl px-8 py-1.5 text-base hover:bg-neutral-700 focus:bg-neutral-700">Follow</button>
                    </div>
                </li>
                <li class="w-full flex items-center justify-between px-3.5 py-4 rounded-xl bg-gray-200/70">
                    <div class="flex items-center gap-x-3">
                        <div class="flex items-center justify-center">
                            <NuxtImg src="/images/profile-picture-5.jpg"
                                class="w-14 h-14 p-0.5 rounded-full ring-2 ring-fuchsia-400" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xl text-neutral-800 font-semibold">User 1</span>
                            <small class="text-base text-neutral-600/70">8 followers</small>
                        </div>
                    </div>
                    <div class="flex justify-end items-center">
                        <button
                            class="bg-neutral-600 text-white rounded-xl px-8 py-1.5 text-base hover:bg-neutral-700 focus:bg-neutral-700">Follow</button>
                    </div>
                </li>
                <li class="w-full flex items-center justify-between px-3.5 py-4 rounded-xl bg-gray-200/70">
                    <div class="flex items-center gap-x-3">
                        <div class="flex items-center justify-center">
                            <NuxtImg src="/images/profile-picture-5.jpg"
                                class="w-14 h-14 p-0.5 rounded-full ring-2 ring-fuchsia-400" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xl text-neutral-800 font-semibold">User 1</span>
                            <small class="text-base text-neutral-600/70">8 followers</small>
                        </div>
                    </div>
                    <div class="flex justify-end items-center">
                        <button
                            class="bg-neutral-600 text-white rounded-xl px-8 py-1.5 text-base hover:bg-neutral-700 focus:bg-neutral-700">Follow</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>