<script setup lang="ts">
import { appName } from "./constants";
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from "~/store/pageFeatures";
import { IPayload, ITipsterPayload } from "./types/types";

useHead({
  title: appName,
});

const { getToken } = useApollo();
const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const user_payload = useCookie<IPayload>("user_payload");
const tipster_payload = useCookie<ITipsterPayload>("tipster_payload");

const checkUserDetails = async () => {
  const token = await getToken();
  if (token && user_payload.value) {
    if (
      user_payload.value.userID === undefined ||
      user_payload.value.userID === null
    ) {
      navigateTo("/accounts/login");
      return;
    }
    let payload = user_payload.value as unknown as IPayload;
    authStore.updateUserPayload(payload);
    authStore.updateIsLoggedIn(true);
  }
  if (tipster_payload.value) {
    if (!tipster_payload.value.penName) {
      navigateTo("/accounts/login");
      return;
    }
    authStore.updateTipsterPayload(tipster_payload.value);
    featureStore.updateIsTipster(true);
  }
};

onMounted(async () => {
  checkUserDetails();
});
</script>
<template>
  <main class="w-full flex flex-col relative">
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications :ui="{ position: 'right-1/2 bottom-0 translate-x-1/2' }" class="z-[99999999]" />
  </main>
</template>
