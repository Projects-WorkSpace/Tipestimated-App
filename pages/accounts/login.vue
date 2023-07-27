<script setup lang="ts">
import { ObtainToken } from "~/graphql/schema";
import { useAuthStore } from "~/store/authStore";

interface ILoginDetail {
    email: string;
    password: string;
}
const form_details = ref<ILoginDetail>({
    email: "",
    password: "",
});

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const { onLogin } = useApollo();

const today = new Date();
const user_payload = useCookie("user_payload", {
    expires: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000),
    sameSite: true,
});
const { mutate: postAuthDetails, loading, error: submitError, onDone, onError } = useMutation(ObtainToken);

const transition = {
    "enterActiveClass": "transform ease-out duration-300 transition",
    "enterFromClass": "-translate-y-2 opacity-0",
    "enterToClass": "translate-y-0 opacity-100",
    "leaveActiveClass": "transition ease-in duration-100",
    "leaveFromClass": "opacity-100",
    "leaveToClass": "opacity-0"
}
const submitDetails = (): void => {
    if (!form_details.value || !form_details.value.email || !form_details.value.password) {
        toast.add({
            title: "Form details are missing.",
            ui: {
                title: 'text-t-gray font-regular',
                progress: {
                    background: 'bg-[tomato]',
                },
                transition: transition,
            },
            timeout: 6000
        });
        return;
    }
    postAuthDetails(form_details.value);
    onDone((data) => {
        if (!submitError.value) {
            authStore.updateUserPayload(data.data.tokenAuth.payload);
            user_payload.value = data.data.tokenAuth.payload;
            onLogin(data.data.tokenAuth.token);
            authStore.updateIsLoggedIn()
            if (window.history.state.back === null) {
                router.push("/");
            } else {
                router.back();
            }
        }
    });
    onError((error) => {
        toast.add({
            title: error.message,
            ui: {
                title: 'text-t-gray font-regular',
                progress: {
                    background: 'bg-[tomato]',
                },
                notifications: {
                    // Show toasts at the top right of the screen
                    position: 'top-0 left-50 translate-1/2',
                },
                transition: transition,
            },
            timeout: 6000
        });
    })
};
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
                        <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
                            <div class="relative bg-inherit w-full">
                                <input v-model="form_details.email" type="email" id="email" name="username"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                    placeholder="Email" />
                                <label for="email"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">
                                    Email
                                </label>
                            </div>
                            <div class="relative bg-inherit w-full">
                                <input v-model="form_details.password" type="password" id="password" name="password"
                                    class="peer text-sm bg-c-light h-10 w-full rounded-lg text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                                    placeholder="Password" /><label for="password"
                                    class="absolute cursor-text left-1.5 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all">Password</label>
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
