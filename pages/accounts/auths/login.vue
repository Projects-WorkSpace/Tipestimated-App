<script setup lang="ts">
const loading = ref(false);
const toggleLoading = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 500);
};
</script>
<template>
    <section class="w-full flex flex-col items-center mb-8">
        <div class="w-full max-w-[350px] flex flex-col gap-y-4 mt-[25vh]">
            <ContainersDialog>
                <div class="w-full flex flex-col gap-y-3">
                    <div class="w-full py-2.5">
                        <div class="w-full flex flex-col mt-6 px-10 gap-y-5">
                            <div class="relative bg-inherit w-full">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                    placeholder="Username or email"
                                /><label
                                    for="username"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                                    >Username or email</label
                                >
                            </div>
                            <div class="relative bg-inherit w-full">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                    placeholder="Password"
                                /><label
                                    for="password"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                                    >Password</label
                                >
                            </div>
                            <div class="w-full flex flex-col">
                                <button
                                    @click="() => toggleLoading()"
                                    class="w-full py-2.5 text-sm font-semibold bg-base-green/90 text-black tracking-wide rounded-lg hover:bg-base-green focus:bg-base-green transition flex items-center justify-center"
                                >
                                    <div v-if="!loading" class="">
                                        <span class="leading-none">Log in</span>
                                    </div>
                                    <UtilsSmallStarLoading v-else />
                                </button>
                            </div>
                            <div class="w-full flex gap-x-4 mt-1">
                                <div
                                    class="h-[1px] bg-c-seperator w-full mt-1"
                                ></div>
                                <span
                                    class="leading-none text-sm text-t-gray/90 font-medium"
                                    >OR</span
                                >
                                <div
                                    class="h-[1px] bg-c-seperator w-full mt-1"
                                ></div>
                            </div>
                            <div class="w-full flex flex-col mt-1 mb-1.5">
                                <div class="flex justify-center">
                                    <span
                                        class="text-sm font-medium text-base-green cursor-pointer"
                                        >Forgot password?</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainersDialog>
            <ContainersDialog>
                <div class="w-full py-5">
                    <div class="flex justify-center items-center gap-x-1">
                        <p class="text-base">Don't have an account?</p>
                        <NuxtLink
                            :to="{ name: 'signup' }"
                            class="text-base-green font-medium text-base cursor-pointer"
                            >Sign up</NuxtLink
                        >
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
