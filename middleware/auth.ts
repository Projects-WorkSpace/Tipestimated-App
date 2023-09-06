import { useAuthStore } from "~/store/authStore";
import { IPayload } from "~/types/types";

export default defineNuxtRouteMiddleware((to, from) => {
    const user_payload = useCookie("user_payload");
    const is_tipster_approved = useCookie('is_tipster_approved')
    const authStore = useAuthStore()
    const { onLogout } = useApollo();
    const today = new Date();
    const tokenBearer = useCookie('auth-token')

    if (tokenBearer.value === undefined) {
        return navigateTo("/accounts/login");
    }

    // Check Bearer token if it's expired
    if (typeof user_payload.value === "object") {
        let obj_user_payload = user_payload.value as unknown as IPayload;
        if (today > new Date(obj_user_payload.exp * 1000)) {
            onLogout();
            user_payload.value = null;
            return navigateTo("/accounts/login");
        }
        authStore.updateIsLoggedIn();
    } else {
        return navigateTo("/accounts/login");
    }
    if (typeof is_tipster_approved.value === 'boolean') {
        if (!is_tipster_approved.value) {
            return navigateTo("/accounts/waiting-verification")
        }
    }
})
