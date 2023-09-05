<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { GetTipsterByUser } from '~/graphql/schema';

definePageMeta({
    layout: false,
    middleware: "other-auth",
});

const toast = useToast();
const router = useRouter();
const is_tipster_approved = useCookie('is_tipster_approved')
const { data: tipster_info, pending: tipster_info_loading, error: tipster_info_error } = await useAsyncQuery<IGetTipsterByUser>(GetTipsterByUser)


export interface IGetTipsterByUser {
    getTipsterByUser: GetTipsterByUser;
}
export interface GetTipsterByUser {
    id: string;
    penName: string;
    isApproved: boolean;
    createdAt: string;
}

const transition = {
    "enterActiveClass": "transform ease-out duration-300 transition",
    "enterFromClass": "-translate-y-2 opacity-0",
    "enterToClass": "translate-y-0 opacity-100",
    "leaveActiveClass": "transition ease-in duration-100",
    "leaveFromClass": "opacity-100",
    "leaveToClass": "opacity-0"
}

const formatTimestamp = (timestamp: string | null) => {
    if (timestamp) {
        const date = parseISO(timestamp)
        const formattedDate = format(date, 'MMMM d, yyyy \'at\' h:mm a');
        return formattedDate;
    } else {
        return "";
    }
}

const checkAndUpdateTipsterApproval = () => {
  if (tipster_info.value?.getTipsterByUser?.isApproved) {
    console.log("Check and found data: ", tipster_info.value)
    // is_tipster_approved.value = 'true'; // Assuming you want to set it as a string 'true'
    // You can also set an expiration date for the cookie if needed:
    // useCookie('is_tipster_approved', 'true', { expires: 365 });
  } else {
    console.log("Check and not found data: ", tipster_info.value)
  }
};

const checkAndUpdateTipsterError = () => {
  if (tipster_info_error.value) {
    console.log("Check and found error: ", tipster_info_error.value)
    // is_tipster_approved.value = 'true'; // Assuming you want to set it as a string 'true'
    // You can also set an expiration date for the cookie if needed:
    // useCookie('is_tipster_approved', 'true', { expires: 365 });
  } else {
    console.log("Check and not found error")
  }
};

// Call the function to check and update approval status
checkAndUpdateTipsterApproval();
checkAndUpdateTipsterError()

</script>

<template>
    <main class="w-full flex flex-col z-50 fixed top-0 bottom-0 left-0 right-0 bg-c-light px-4 md:px-0">
        <NuxtLayout name="empty-layout">
            <section class="w-full h-full flex items-center justify-center">
                <div class="max-w-[450px] flex flex-col">
                    <ContainersDialog>
                        <div v-if="!tipster_info_loading" class="w-full flex flex-col px-6 md:px-12 py-8">
                            <div class="w-full flex flex-col items-center justify-center pb-4 gap-y-6">
                                <div class="flex items-center justify-center">
                                    <Icon name="🥳" class="!text-7xl" />
                                </div>
                                <div class="flex flex-col items-center gap-y-2">
                                    <h3 class="text-3xl font-bold text-center">
                                        We are still reviewing <br />
                                        your details.
                                    </h3>
                                    <p class="text-xs text-t-gray">
                                        Waiting since 
                                        {{ formatTimestamp(tipster_info?.getTipsterByUser?.createdAt) }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full flex flex-col pt-1 pb-4 gap-y-2">
                                <div class="w-full flex gap-x-1 items-center">
                                    <NuxtImg src="/icons/docs.png" class="h-5 w-5" />
                                    <p class="text-base font-semibold">
                                        Read more about this.
                                    </p>
                                </div>
                                <div class="w-full">
                                    <p class="text-sm text-t-gray">
                                        We appreciate your patience during this
                                        process, and we look forward to welcoming
                                        you as a valuable member of our Tipster
                                        community. If you have any questions or
                                        require further assistance, please don't
                                        hesitate to reach out to our support
                                        team.
                                    </p>
                                </div>
                                <div class="w-full flex flex-col mt-2.5">
                                    <button
                                        class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-black tracking-wide rounded-lg hover:bg-base-green focus:bg-base-green transition flex items-center justify-center">
                                        Contact Us
                                    </button>
                                    {{ tipster_info }} {{ tipster_info_error }}
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex flex-col px-6 md:px-12 py-8">
                            <UtilsStarLoading />
                        </div>
                    </ContainersDialog>
                </div>
            </section>
        </NuxtLayout>
    </main>
</template>
