<script setup lang="ts">
import { appName } from './constants';
import { GetMoreUserData, Viewer } from '~/graphql/schema';
import { IMoreData, IUserDetails } from './types/types';
import { useAuthStore } from "~/store/authStore";
import { usePageFeatureStore } from '~/store/pageFeatures';

useHead({
    title: appName,
});

interface IUserData {
    viewer: IUserDetails
}

const { getToken } = useApollo();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const featureStore = usePageFeatureStore();
const { mutate: fetchUser, onDone: onDoneViewUser, onError: onErrorViewUser } = useMutation<IUserData>(Viewer);

onDoneViewUser((data) => {
    console.log("Get User details: ", data.data?.viewer);
    const details = data.data?.viewer;
    if (details) {
        authStore.updateUserDetails(details);
        getMoreUserData();
    }
})
onErrorViewUser((error) => {
    console.log("Get User details error: ", error.message);
    const message = error.message;
    if (message === "Error decoding signature") {
        router.push("/accounts/login");
    } else if (message === "Signature has expired") {
        router.push("/accounts/login");
    }
})
const getMoreUserData = async () => {
    const user_id = authStore.user_details?.id;

    const { data, error } = await useAsyncQuery<IMoreData>(GetMoreUserData, { first: 4, userId: user_id })
    if (data.value) {
        let tipster_details = data.value.allTipsters.edges?.length;
        console.log("Tipster details length: ", tipster_details);
        if (tipster_details === 0) {
            const tipsterFollowing = data.value.tipsterFollowers;
            if (tipsterFollowing) {
                let following = tipsterFollowing.edges;
                if (following) {
                    if (following.length <= 3) {
                        authStore.updateIfLessFollowers();
                        if (!route.name?.toString().includes("accounts")) {
                            router.push("/explore/tipsters");
                        }
                    }
                }
            }
        } else {
            featureStore.updateIsTipster(true);
        }

    } else if (error.value) {
        console.log("More error: ", error.value)
    }
}

onMounted(async () => {
    const token = await getToken();
    if (token) {
        fetchUser({ token: token });
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
