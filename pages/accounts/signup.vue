<script setup lang="ts">
import { RegisterAppUser } from '~/graphql/schema';
import { useAuthStore } from '~/store/authStore';
import { IRegisterUserResponse } from '~/types/types';

const dob = ref({ selectedDay: '', selectedMonth: '', selectedYear: '' })
const user = ref({ userName: '', email: '', password: '' })
const asTipster = ref(false);
const loadingStatus = ref({
    user: false,
    tipster: false
})
const form_errors = ref({
    error: false, messages: [''],
})

const router = useRouter();
const authStore = useAuthStore();
const { onLogin } = useApollo();

const today = new Date();
const user_payload = useCookie("user_payload", {
    expires: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000),
    sameSite: true,
});


const { mutate: postUserDetails, onDone, onError } = useMutation<IRegisterUserResponse>(RegisterAppUser);
const onSubmitUser = (payload: boolean): void => {
    form_errors.value = { error: false, messages: [] };
    if (!checkIsFormValid()) {
        return;
    }
    const date = dob.value.selectedYear + "-" + dob.value.selectedMonth + "-" + dob.value.selectedDay
    const formattedDate = formatDateToYYYYMMDD(date);
    asTipster.value = payload;
    if (payload) {
        loadingStatus.value.tipster = true;
    } else {
        loadingStatus.value.user = true;
    }
    postUserDetails({
        email: user.value.email,
        userName: user.value.userName,
        dob: formattedDate,
        password1: user.value.password,
        password2: user.value.password
    });

};
onDone((data) => {
    loadingStatus.value = {
        user: false,
        tipster: false
    }
    let response = data.data?.registerAppUser;
    if (response) {
        if (response.errors.length >= 1) {
            form_errors.value.error = true;
            response.errors.forEach((error) => {
                error.messages.forEach((message) => {
                    form_errors.value.messages.push(message);
                })
            });
            return;
        } else {
            authStore.updateUserPayload(JSON.parse(response.payload));
            user_payload.value = JSON.parse(response.payload);
            onLogin(response.token);
            authStore.updateIsLoggedIn(true)
            if (asTipster.value) {
                router.push("/accounts/signup-tipster")
            } else {
                router.push("/")
            }

        }

    }
})

onError((error) => {
    loadingStatus.value = {
        user: false,
        tipster: false
    }
    form_errors.value.error = true;
    form_errors.value.messages = [error.message]

    return;
})

const checkForAboveAge = () => {
    const selectedDate = new Date(
        Number(dob.value.selectedYear),
        Number(dob.value.selectedMonth) - 1,
        Number(dob.value.selectedDay)
    );
    const currentDate = new Date();
    const ageThreshold = new Date();
    ageThreshold.setFullYear(currentDate.getFullYear() - 18);
    return selectedDate <= ageThreshold;
};



const checkIsFormValid = (): boolean => {
    let isValid = true;
    if (dob.value.selectedDay && dob.value.selectedMonth && dob.value.selectedYear) {
        if (!checkForAboveAge()) {
            form_errors.value.error = true;
            form_errors.value.messages = ['You must be 18 years old or older.']
            isValid = false;
        }
    } else {
        form_errors.value.error = true;
        form_errors.value.messages = ['You must provide your date of birth before proceeding.']

        isValid = false;
    }
    return isValid;
};

const isFormValid = computed(() => {
    return !user.value.userName || !user.value.email || !user.value.password;
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
                    <div class="flex items-center justify-center py-5">
                        <h1 class="text-3xl md:text-4xl">Tipstimate</h1>
                    </div>
                    <div v-if="form_errors.error" class="w-full flex flex-col px-14 pb-2">
                        <ul class="w-full flex flex-col gap-y-2 list-disc">
                            <li v-for="error, index in form_errors.messages" :key="index" class="text-sm text-red-500">
                                {{ error }}</li>
                        </ul>
                    </div>

                    <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
                        <div class="relative bg-inherit w-full">
                            <input type="text" id="username" name="username"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Username" v-model="user.userName" /><label for="username"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Username</label>
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input type="email" id="email" name="email"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Email" v-model="user.email" /><label for="email"
                                class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Email</label>
                        </div>
                        <div class="w-full flex flex-col gap-y-1">
                            <p class="text-sm text-t-gray">
                                Date of birth +18 only
                            </p>
                            <UiSelectDateForm v-model:selectedDay="dob.selectedDay"
                                v-model:selectedMonth="dob.selectedMonth" v-model:selectedYear="dob.selectedYear" />
                        </div>
                        <div class="relative bg-inherit w-full">
                            <input type="password" id="password" name="password"
                                class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                placeholder="Password" v-model="user.password" /><label for="password"
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
                            <button :disabled="isFormValid" @click="() => onSubmitUser(false)"
                                :class="isFormValid ? 'cursor-not-allowed' : 'hover:bg-base-green focus:base-green'"
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center">
                                <Transition mode="out-in">
                                    <div v-if="!loadingStatus.user" class="">
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
                            <button :disabled="isFormValid" @click="() => onSubmitUser(true)"
                                :class="isFormValid ? 'cursor-not-allowed' : 'hover:bg-base-green focus:base-green'"
                                class="w-full py-2 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded transition flex items-center justify-center">
                                <Transition mode="out-in">
                                    <div v-if="!loadingStatus.tipster">
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
    
