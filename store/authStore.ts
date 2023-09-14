import { defineStore } from "pinia";
import { IPayload, IUserAuth, IUserDetails } from "~/types/types";

export const useAuthStore = defineStore("user", () => {
    const appUser = ref<IUserAuth>();
    const userPayload = ref<IPayload>();
    const is_logged_in = ref<boolean>(false)
    const user_details = ref<IUserDetails>();
    const if_less_followers = ref(false);
    const updateAppUser = (payload: IUserAuth) => {
        appUser.value = payload;
    };
    const updateUserPayload = (payload: IPayload) => {
        userPayload.value = payload;
    };
    const updateIsLoggedIn = () => {
        is_logged_in.value = !is_logged_in.value;
    }
    const updateUserDetails = (payload: IUserDetails) => {
        user_details.value = payload;
    };
    const updateIfLessFollowers = () => {
        if_less_followers.value = !if_less_followers.value;
    }

    return {
        appUser, userPayload, is_logged_in, user_details, if_less_followers,
        updateAppUser, updateUserPayload, updateIsLoggedIn, updateUserDetails, updateIfLessFollowers
    };
});
