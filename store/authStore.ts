import { defineStore } from "pinia";
import { IPayload, IUserAuth, IUserDetails } from "~/types/types";

export const useAuthStore = defineStore("user", () => {
    const appUser = ref<IUserAuth>();
    const userPayload = ref<IPayload>();
    const is_logged_in = ref<boolean>(false)
    const user_details = ref<IUserDetails>();
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

    return {
        appUser, userPayload, is_logged_in, user_details,
        updateAppUser, updateUserPayload, updateIsLoggedIn, updateUserDetails
    };
});
