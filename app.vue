<script setup lang="ts">
import { appName } from './constants';
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from '~/store/pageFeatures';
import { IPayload, ITipsterPayload } from './types/types';

useHead({
  title: appName,
});

const { getToken } = useApollo();
const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const user_payload = useCookie("user_payload");
const tipster_payload = useCookie("tipster_payload");

const checkUserDetails = async () => {
  const token = await getToken()
  if (token && user_payload.value) {
    let payload = user_payload.value as unknown as IPayload;
    authStore.updateUserPayload(payload);
    authStore.updateIsLoggedIn();
  }
  if (tipster_payload.value) {
    authStore.updateTipsterPayload(tipster_payload.value as unknown as ITipsterPayload)
    featureStore.updateIsTipster(true);
  }
}

onMounted(async () => {
  checkUserDetails()
})

</script>
<template>
  <main ref="el">
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </main>
</template>
