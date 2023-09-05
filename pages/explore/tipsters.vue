<script setup lang="ts">
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
    <div class="w-full flex flex-col py-4 md:py-6 gap-y-6">
        <header class="w-full flex items-center gap-x-1.5 md:gap-x-3">
            <div class="flex items-center flex-none">
                <button @click="redirectBtn"
                    class="p-2.5 rounded-xl bg-white text-neutral-600 hover:text-neutral-800 focus:text-neutral-800 outline-none border border-transparent hover:border-c-seperator transition duration-200">
                    <Icon name="mdi:chevron-left" class="text-2xl md:text-3xl" />
                </button>
            </div>
            <div class="grow flex items-center relative">
                <input type="search"
                    class="w-full py-2.5 pr-4 pl-10 rounded-xl text-base tracking-wide placeholder:text-neutral-500/60 bg-white focus:outline-none border border-transparent focus:border-c-seperator hover:border-c-seperator transition duration-200"
                    placeholder="Type to search...">
                <Icon name="ph:magnifying-glass" class="text-base absolute left-3.5 text-neutral-500" />
            </div>
        </header>
        <div class="w-full flex flex-col gap-y-2 mt-2">
            <h4 class="tracking-wide text-lg md:text-xl text-neutral-600">Suggested</h4>
            <ul class="w-full flex flex-col gap-y-2 md:gap-y-3.5">
                <li class="w-full">
                    <UiUserExploreDetails />
                </li>
                <li class="w-full">
                    <UiUserExploreDetails />
                </li>
                <li class="w-full">
                    <UiUserExploreDetails />
                </li>
            </ul>
        </div>
    </div>
</template>