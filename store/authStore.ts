import { defineStore } from "pinia";
import { IPayload, ITipsterPayload, IUserAuth } from "~/types/types";

export const useAuthStore = defineStore("user", () => {
    const appUser = ref<IUserAuth>();
    const userPayload = ref<IPayload>();
    const is_logged_in = ref<boolean>(false);
    const if_less_followers = ref(false);
    const tipsterPayload = ref<ITipsterPayload>();

    const updateAppUser = (payload: IUserAuth) => {
        appUser.value = payload;
    };

    const updateUserPayload = (payload: IPayload) => {
        userPayload.value = payload;
    };

    const updateIsLoggedIn = (payload: boolean) => {
        is_logged_in.value = payload;
    };

    const updateIfLessFollowers = (payload: boolean) => {
        if_less_followers.value = payload;
    };
    const updateTipsterPayload = (payload: ITipsterPayload) => {
        tipsterPayload.value = payload;
    };

    return {
        appUser,
        userPayload,
        is_logged_in,
        if_less_followers,
        tipsterPayload,
        updateAppUser,
        updateUserPayload,
        updateIsLoggedIn,
        updateIfLessFollowers,
        updateTipsterPayload,
    };
});
