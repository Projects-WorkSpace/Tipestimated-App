<script setup lang="ts">
import { appName } from './constants';
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from '~/store/pageFeatures';
import { IPayload, ITipsterPayload } from './types/types';

useHead({
    title: appName,
});

const { getToken } = useApollo();
const router = useRouter();
const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const user_payload = useCookie("user_payload");
const tipster_payload = useCookie("tipster_payload");

const checkUserDetails = async () => {
    if (user_payload.value) {
        let payload = user_payload.value as unknown as IPayload;
        authStore.updateUserPayload(payload);
    } else {
        router.push("/accounts/login");
        return;
    }

    if (tipster_payload.value) {
        authStore.updateTipsterPayload(tipster_payload.value as unknown as ITipsterPayload)
        featureStore.updateIsTipster(true);

    }
}

onMounted(async () => {
    const token = await getToken();
    if (token) {
        checkUserDetails()
    } else {
        router.push("/accounts/login");
    }
})

</script>
<template>
    <main ref="el">
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
    </main>
</template>
