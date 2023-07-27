<script setup lang="ts">
import { RegisterAppUser } from '~/graphql/schema';
import { useAuthStore } from '~/store/authStore';

const selectedDay = ref('');
const selectedMonth = ref('');
const selectedYear = ref('');

const userName = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();
const authStore = useAuthStore();
const { onLogin } = useApollo();

const today = new Date();
const user_payload = useCookie("user_payload", {
    expires: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000),
    sameSite: true,
});

const toast = useToast();
const { mutate: postUserDetails, loading, error: error, onDone, onError } = useMutation(RegisterAppUser);
const onSubmitUser = (): void => {
    if (!checkIsFormValid()) {
        return;
    }
    const date = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value
    const formattedDate = formatDateToYYYYMMDD(date);
    postUserDetails({ email: email.value, userName: userName.value, dob: formattedDate, password1: password.value, password2: password.value });

    onDone((data) => {
        if (data.data.registerAppUser.errors.length > 0) {
            console.log("Errors:", data.data.registerAppUser.errors);
            data.data.registerAppUser.errors.forEach((error: { field: string; messages: string[]; }) => {
                toast.add({
                    title: error.field,
                    description: error.messages[0], // Show the error message as the title
                    ui: {
                        title: 'text-t-gray font-medium capitalize',
                        description: "text-t-gray text-sm",
                        progress: {
                            "base": "absolute bottom-0 end-0 start-0 h-0",
                        },
                        icon: {
                            "color": "text-[tomato]"
                        },
                        transition: transition,
                    },
                    icon: 'i-heroicons-information-circle',
                    timeout: 2000
                });
            });
            return;
        } else {
            authStore.updateUserPayload(JSON.parse(data.data.registerAppUser.payload));
            user_payload.value = JSON.parse(data.data.registerAppUser.payload);
            onLogin(data.data.registerAppUser.token);
            authStore.updateIsLoggedIn()
            router.push("/")
        }
    })

    onError((error) => {
        toast.add({
            title: error.message,
            ui: {
                title: "text-t-gray text-base",
                progress: {
                    "base": "absolute bottom-0 end-0 start-0 h-0",
                },
                icon: {
                    "color": "text-[tomato]"
                },
                transition: transition,
            },
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        });
        return;
    })
};
const { mutate: postUserTipsterDetails, loading: loadingTipster, error: errorTipster, onDone: onDoneTipster, onError: onErrorTipster } = useMutation(RegisterAppUser);
const onSubmitAsTipster = (): void => {
    if (!checkIsFormValid()) {
        return;
    }
    const date = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value
    const formattedDate = formatDateToYYYYMMDD(date);
    postUserTipsterDetails({ email: email.value, userName: userName.value, dob: formattedDate, password1: password.value, password2: password.value });

    onDoneTipster((data) => {
        if (data.data.registerAppUser.errors.length > 0) {
            console.log("Errors:", data.data.registerAppUser.errors);
            data.data.registerAppUser.errors.forEach((error: { field: string; messages: string[]; }) => {
                toast.add({
                    title: error.field,
                    description: error.messages[0], // Show the error message as the title
                    ui: {
                        title: 'text-t-gray font-medium capitalize',
                        description: "text-t-gray text-sm",
                        progress: {
                            "base": "absolute bottom-0 end-0 start-0 h-0",
                        },
                        icon: {
                            "color": "text-[tomato]"
                        },
                        transition: transition,
                    },
                    icon: 'i-heroicons-information-circle',
                    timeout: 2000
                });
            });
            return;
        } else {
            authStore.updateUserPayload(JSON.parse(data.data.registerAppUser.payload));
            user_payload.value = JSON.parse(data.data.registerAppUser.payload);
            onLogin(data.data.registerAppUser.token);
            authStore.updateIsLoggedIn()
            router.push("/accounts/signup-tipster")
        }
    })

    onErrorTipster((error) => {
        toast.add({
            title: error.message,
            ui: {
                title: "text-t-gray text-base",
                progress: {
                    "base": "absolute bottom-0 end-0 start-0 h-0",
                },
                icon: {
                    "color": "text-[tomato]"
                },
                transition: transition,
            },
            icon: 'i-heroicons-information-circle',
            timeout: 3000
        });
        return;
    })
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

const transition = {
    "enterActiveClass": "transform ease-out duration-300 transition",
    "enterFromClass": "-translate-y-2 opacity-0",
    "enterToClass": "translate-y-0 opacity-100",
    "leaveActiveClass": "transition ease-in duration-100",
    "leaveFromClass": "opacity-100",
    "leaveToClass": "opacity-0"
}

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
                    transition: transition,
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
                transition: transition,
            },
        });
        isValid = false;
    }
    return isValid;
};

const isFormValid = computed(() => {
    return !userName.value || !email.value || !password.value;
});
const formatDateToYYYYMMDD = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

</script>
<template>
    <section class="w-full flex flex-col items-center pb-8">
        <div class="w-full px-6 md:px-0 md:max-w-[400px] flex flex-col gap-y-4 mt-12">
            <ContainersDialog>
                <div class="w-full py-2.5">
                    <div class="flex items-center justify-center py-6">
                        <h1 class="text-3xl md:text-4xl">Tipstimate</h1>
                    </div>
                    <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
                        <div class="relative bg-inherit w-full">
                            <input type="text" id="username" name="username"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Username" v-model="userName" /><label for="username"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Username</label>
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input type="email" id="email" name="email"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Email" v-model="email" /><label for="email"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Email</label>
                        </div>
                        <div class="w-full flex flex-col gap-y-1">
                            <p class="text-sm text-t-gray">
                                Date of birth +18 only
                            </p>
                            <UiSelectDateForm v-model:selectedDay="selectedDay" v-model:selectedMonth="selectedMonth"
                                v-model:selectedYear="selectedYear" />
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input type="password" id="password" name="password"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Password" v-model="password" /><label for="password"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Password</label>
                        </div>
                        <div class="w-full flex items-center justify-center">
                            <p class="text-sm text-t-gray text-center leading-relaxed">
                                By signing up, you agree to our
                                <span class="text-sm font-medium text-base-green">Terms</span>
                                and
                                <span class="text-sm font-medium text-base-green">Privacy Policy</span>.
                            </p>
                        </div>
                        <div class="w-full flex flex-col">
                            <button :disabled="isFormValid" @click="() => onSubmitUser()" :class="isFormValid
                                ? 'cursor-not-allowed'
                                : 'hover:bg-base-green focus:base-green'
                                "
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center">
                                <Transition mode="out-in">
                                    <div v-if="!loading" class="">
                                        <span class="leading-none">Sign up</span>
                                    </div>
                                    <UtilsSmallStarLoading v-else class="my-[3px]" />
                                </Transition>
                            </button>
                        </div>
                        <div class="w-full flex gap-x-4 mt-0.5">
                            <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                            <span class="leading-none text-xs text-t-gray/90 font-medium">OR</span>
                            <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                        </div>
                        <div class="w-full flex flex-col mt-0.5 mb-1.5">
                            <button :disabled="isFormValid" @click="() => onSubmitAsTipster()" :class="isFormValid
                                ? 'cursor-not-allowed'
                                : 'hover:bg-base-green focus:base-green'
                                "
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center">
                                <Transition mode="out-in">
                                    <div v-if="!loadingTipster" class="">
                                        <span class="leading-none">Sign up as Tipster</span>
                                    </div>
                                    <UtilsSmallStarLoading v-else class="my-[3px]" />
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
                        <NuxtLink to="/accounts/login" class="text-base-green font-medium text-base cursor-pointer">Log
                            in</NuxtLink>
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
    