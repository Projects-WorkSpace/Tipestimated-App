import { useAuthStore } from "~/store/authStore";
import { IPayload } from "~/types/types";

export default defineNuxtRouteMiddleware((to, from) => {
  const user_payload = useCookie<IPayload | null>("user_payload");
  const is_tipster_approved = useCookie("is_tipster_approved");
  const authStore = useAuthStore();
  const today = new Date();
  const tokenBearer = useCookie("auth-token");

  if (tokenBearer.value) {
    // Check Bearer token if it's expired
    if (user_payload.value) {
      if (today > new Date(user_payload.value.exp * 1000)) {
        user_payload.value = null;
      } else {
        authStore.updateIsLoggedIn(true);
      }
    }
    if (typeof is_tipster_approved.value === "boolean") {
      if (!is_tipster_approved.value) {
        return navigateTo("/accounts/waiting-verification");
      }
    }
  }
});
