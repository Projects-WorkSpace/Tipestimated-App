import { defineStore } from "pinia";
import { IPayload, ITipsterPayload, IUserAuth } from "~/types/types";

export const useAuthStore = defineStore("user", () => {
    const appUser = ref<IUserAuth>();
    const userPayload = ref<IPayload>();
    const is_logged_in = ref<boolean>(false)
    const if_less_followers = ref(false);
    const tipsterPayload = ref<ITipsterPayload>()

    const updateAppUser = (payload: IUserAuth) => {
        appUser.value = payload;
    };

    const updateUserPayload = (payload: IPayload) => {
        userPayload.value = payload;
    };

    const updateIsLoggedIn = () => {
        is_logged_in.value = !is_logged_in.value;
    }

    const updateIfLessFollowers = () => {
        if_less_followers.value = !if_less_followers.value;
    }
    const updateTipsterPayload = (payload: ITipsterPayload) => {
        tipsterPayload.value = payload;
    }

    return {
        appUser, userPayload, is_logged_in, if_less_followers, tipsterPayload,
        updateAppUser, updateUserPayload, updateIsLoggedIn, updateIfLessFollowers, updateTipsterPayload
    };
});
