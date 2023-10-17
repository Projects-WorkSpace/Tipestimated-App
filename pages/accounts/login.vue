<script setup lang="ts">
import { ObtainToken } from "~/graphql/schema";
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from '~/store/pageFeatures';
import { ILoginResponse } from '~/types/types';

interface ILoginDetail {
    email: string;
    password: string;
}

const form_details = ref<ILoginDetail>({
    email: "",
    password: "",
});
const form_errors = ref({
    email: false, password: false, response_error: false, message: ''
})

const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const router = useRouter();
const { onLogin } = useApollo();
const tipster_payload = useCookie("tipster_payload", { sameSite: true });

const today = new Date();
const user_payload = useCookie("user_payload", {
    expires: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000),
    sameSite: true,
});

const { mutate: postAuthDetails, loading, onDone, onError } = useMutation<ILoginResponse>(ObtainToken);

const submitDetails = (): void => {
    form_errors.value.response_error = false;
    if (!form_details.value.email) {
        form_errors.value.email = true;
        return;
    }
    if (!form_details.value.password) {
        form_errors.value.password = true;
        return;

    }
    postAuthDetails(form_details.value);
};

onDone((data) => {
    let response = data.data;
    if (response?.tokenAuth) {
        authStore.updateUserPayload(response?.tokenAuth.payload);
        user_payload.value = response.tokenAuth.payload as unknown as string;
        onLogin(response?.tokenAuth.token);
        authStore.updateIsLoggedIn()
        if (response.tokenAuth.tipster !== null) { // if is tipster
            tipster_payload.value = response.tokenAuth.tipster as unknown as string;
            authStore.updateTipsterPayload(JSON.parse(response.tokenAuth.tipster as unknown as string))
            featureStore.updateIsTipster(true);
        } else {
            featureStore.updateIsTipster(false);
        }

        if (window.history.state.back === null) {
            router.push("/");
        } else if (window.history.state.back === "/accounts/signup") {
            router.push("/");
        } else {
            router.back();
        }

    }

});

onError((error) => {
    form_errors.value.response_error = true;
    form_errors.value.message = error.message;
})
</script>
<template>
    <section class="w-full flex flex-col items-center mb-8">
        <div class="w-full px-8 md:px-0 md:max-w-[400px] flex flex-col gap-y-4 mt-24">
            <ContainersDialog>
                <div class="w-full flex flex-col gap-y-3">
                    <div class="w-full py-2.5">
                        <div class="flex items-center justify-center py-6">
                            <h1 class="text-3xl md:text-4xl">Tipstimate</h1>
                        </div>
                        <div v-if="form_errors.response_error" class="w-full flex flex-col px-10 pb-2">
                            <p class="text-red-500 text-sm">{{ form_errors.message }}</p>
                        </div>
                        <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
                            <div class="relative bg-inherit w-full">
                                <input v-model="form_details.email" @input="form_errors.email = false" type="email"
                                    id="email" name="username"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg placeholder-transparent ring-1 px-2  focus:outline-none"
                                    :class="form_errors.email ? 'text-red-500 ring-red-400' : 'text-gray-700 ring-c-seperator/60 focus:ring-neutral-400/60'"
                                    placeholder="Email" />
                                <label for="email"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs  bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm  peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-xs transition-all"
                                    :class="form_errors.email ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-t-gray peer-placeholder-shown:text-gray-500 '">
                                    Email
                                </label>
                            </div>
                            <div class="relative bg-inherit w-full">
                                <input v-model="form_details.password" @input="form_errors.password = false" type="password"
                                    id="password" name="password"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg placeholder-transparent ring-1 px-2 focus:outline-none"
                                    :class="form_errors.password ? 'text-red-500 ring-red-400' : 'text-gray-700 ring-c-seperator/60 focus:ring-neutral-400/60'"
                                    placeholder="Password" />
                                <label for="password"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm  peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-xs transition-all"
                                    :class="form_errors.password ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-t-gray peer-placeholder-shown:text-gray-500'">
                                    Password
                                </label>
                            </div>
                            <div class="w-full flex flex-col">
                                <button @click="() => submitDetails()"
                                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-black tracking-wide rounded-lg hover:bg-base-green focus:bg-base-green transition flex items-center justify-center">
                                    <div v-if="!loading" class="">
                                        <span class="leading-none">Login</span>
                                    </div>
                                    <UtilsSmallStarLoading v-else class="my-[3px]" />
                                </button>
                            </div>
                            <div class="w-full flex gap-x-4 mt-1">
                                <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                                <span class="leading-none text-sm text-t-gray/90 font-medium">OR</span>
                                <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                            </div>
                            <div class="w-full flex flex-col mt-1 mb-1.5">
                                <div class="flex justify-center">
                                    <span class="text-sm font-medium text-base-green cursor-pointer">Forgot password?</span>
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
                        <NuxtLink to="/accounts/signup" class="text-base-green font-medium text-base cursor-pointer">Sign
                            up</NuxtLink>
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
