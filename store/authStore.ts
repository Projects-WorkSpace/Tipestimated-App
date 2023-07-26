import { defineStore } from "pinia";
import { IPayload, IUserAuth } from "~/types/types";

export const useAuthStore = defineStore("user", () => {
    const appUser = ref<IUserAuth>();
    const userPayload = ref<IPayload>();
    const is_logged_in = ref<boolean>(false)
    const updateAppUser = (payload: IUserAuth) => {
        appUser.value = payload;
    };
    const updateUserPayload = (payload: IPayload) => {
        userPayload.value = payload;
    };
    const updateIsLoggedIn = () => {
        is_logged_in.value = !is_logged_in.value;
    }
    return { appUser, userPayload, is_logged_in, updateAppUser, updateUserPayload, updateIsLoggedIn };
});