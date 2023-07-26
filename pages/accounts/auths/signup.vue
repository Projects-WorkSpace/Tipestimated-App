<script setup lang="ts">
const loading = ref(false);

const selectedDay = ref('');
const selectedMonth = ref('');
const selectedYear = ref('');

const userName = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();
const toast = useToast();

const onSubmitUser = (): void => {
    loading.value = true;
    if (!checkIsFormValid()) {
        loading.value = false;
        return;
    }
    setTimeout(() => {
        loading.value = false;
        router.push({ name: 'home' });
    }, 500);
};
const loadingTipster = ref(false);
const onSubmitAsTipster = (): void => {
    loadingTipster.value = true;
    if (!checkIsFormValid()) {
        loadingTipster.value = false;
        return;
    }
    setTimeout(() => {
        loadingTipster.value = false;
        router.push({ name: 'signupTipster' });
    }, 500);
};

const checkForAboveAge = () => {
    const selectedDate = new Date(
        Number(selectedYear.value),
        Number(selectedMonth.value) - 1,
        Number(selectedDay.value)
    );
    const currentDate = new Date();
    const ageThreshold = new Date();
    ageThreshold.setFullYear(currentDate.getFullYear() - 18);
    return selectedDate <= ageThreshold;
};

const checkIsFormValid = (): boolean => {
    let isValid = true;
    if (selectedDay.value && selectedMonth.value && selectedYear.value) {
        if (!checkForAboveAge()) {
            toast.add({
                title: 'You must be 18 years old or older.',
                ui: {
                    title: 'text-t-gray font-regular',
                    progress: {
                        background: 'bg-[tomato]',
                    },
                },
            });
            isValid = false;
        }
    } else {
        toast.add({
            title: 'You must provide your date of birth before proceeding.',
            ui: {
                title: 'text-t-gray font-regular',
                progress: {
                    background: 'bg-[tomato]',
                },
            },
        });
        isValid = false;
    }
    return isValid;
};
const isFormValid = computed(() => {
    return !userName.value || !email.value || !password.value;
});
</script>
<template>
    <section class="w-full flex flex-col items-center pb-8">
        <div class="w-full max-w-[350px] flex flex-col gap-y-4 mt-[10vh]">
            <ContainersDialog>
                <div class="w-full py-2.5">
                    <div class="w-full flex flex-col mt-6 px-10 gap-y-5">
                        <div class="relative bg-inherit w-full">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Username"
                                v-model="userName"
                            /><label
                                for="username"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                                >Username</label
                            >
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Email"
                                v-model="email"
                            /><label
                                for="email"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                                >Email</label
                            >
                        </div>
                        <div class="w-full flex flex-col gap-y-1">
                            <p class="text-sm text-t-gray">
                                Date of birth +18 only
                            </p>
                            <UiSelectDateForm
                                v-model:selectedDay="selectedDay"
                                v-model:selectedMonth="selectedMonth"
                                v-model:selectedYear="selectedYear"
                            />
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Password"
                                v-model="password"
                            /><label
                                for="password"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                                >Password</label
                            >
                        </div>
                        <div class="w-full flex items-center justify-center">
                            <p
                                class="text-sm text-t-gray text-center leading-relaxed"
                            >
                                By signing up, you agree to our
                                <span class="text-sm font-medium text-base-green"
                                    >Terms</span
                                >
                                and
                                <span class="text-sm font-medium text-base-green"
                                    >Privacy Policy</span
                                >.
                            </p>
                        </div>
                        <div class="w-full flex flex-col">
                            <button
                                :disabled="isFormValid"
                                @click="() => onSubmitUser()"
                                :class="
                                    isFormValid
                                        ? 'cursor-not-allowed'
                                        : 'hover:bg-base-green focus:base-green'
                                "
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center"
                            >
                                <div v-if="!loading" class="">
                                    <span class="leading-none">Sign up</span>
                                </div>
                                <UtilsSmallStarLoading v-else />
                            </button>
                        </div>
                        <div class="w-full flex gap-x-4 mt-0.5">
                            <div
                                class="h-[1px] bg-c-seperator w-full mt-1"
                            ></div>
                            <span
                                class="leading-none text-xs text-t-gray/90 font-medium"
                                >OR</span
                            >
                            <div
                                class="h-[1px] bg-c-seperator w-full mt-1"
                            ></div>
                        </div>
                        <div class="w-full flex flex-col mt-0.5 mb-1.5">
                            <button
                                :disabled="isFormValid"
                                @click="() => onSubmitAsTipster()"
                                :class="
                                    isFormValid
                                        ? 'cursor-not-allowed'
                                        : 'hover:bg-base-green focus:base-green'
                                "
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center"
                            >
                                <Transition mode="out-in">
                                    <div v-if="!loadingTipster" class="">
                                        <span class="leading-none"
                                            >Sign up as Tipster</span
                                        >
                                    </div>
                                    <UtilsSmallStarLoading v-else />
                                </Transition>
                            </button>
                        </div>
                    </div>
                </div>
            </ContainersDialog>
            <ContainersDialog>
                <div class="w-full py-5">
                    <div class="flex justify-center items-center gap-x-1">
                        <p class="text-base text-t-gray">Have an account?</p>
                        <NuxtLink
                            :to="{ name: 'login' }"
                            class="text-base-green font-medium text-base cursor-pointer"
                            >Log in</NuxtLink
                        >
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
