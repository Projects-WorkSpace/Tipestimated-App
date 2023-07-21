<script setup lang="ts">
const loading = ref(false);
const second_form = ref(false);
const router = useRouter();

const onClickContinue = (): void => {
    second_form.value = true;
};

const onSubmitTipsterDetails = (): void => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        // second_form.value = false
        router.push({ name: 'waiting-verification' });
    }, 500);
};
</script>
<template>
    <section class="w-full flex flex-col items-center pb-6">
        <div class="mt-[10vh] w-full max-w-[350px] flex flex-col gap-y-3">
            <ContainersDialog>
                <div class="w-full py-1 relative">
                    <div
                        class="py-4 flex justify-center flex-col items-center px-8 gap-y-4"
                    >
                        <p class="text-t-gray text-base font-normal text-center">
                            To get started as a tipster provide the following
                            details.
                        </p>
                    </div>
                    <div class="w-full flex flex-col mt-4 px-6 gap-y-5 pb-6">
                        <div class="w-full flex flex-col">
                            <Transition mode="out-in">
                                <AccountsTipsterSportsForm v-if="!second_form" />
                                <AccountsTipsterSocialForm v-else />
                            </Transition>
                            <Transition mode="out-in">
                                <button
                                    v-if="!second_form"
                                    @click="() => onClickContinue()"
                                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded hover:bg-base-green focus:bg-base-green transition flex items-center justify-center"
                                >
                                    <div class="">
                                        <span class="leading-none"
                                            >Continue</span
                                        >
                                    </div>
                                </button>
                                <button
                                    v-else
                                    @click="() => onSubmitTipsterDetails()"
                                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded hover:bg-base-green focus:bg-base-green transition flex items-center justify-center"
                                >
                                    <div v-if="!loading" class="">
                                        <span class="leading-none">Submit</span>
                                    </div>
                                    <UtilsSmallStarLoading v-else />
                                </button>
                            </Transition>
                        </div>
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
