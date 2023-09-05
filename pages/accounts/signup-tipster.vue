<script setup lang="ts">
import { IListProps, IErrorTipsterStatus, IProfileImage, IAllSport } from '~/types/types';
import { AllSports, SignupTipster } from "~/graphql/schema";

// Protected page
definePageMeta({
    middleware: "other-auth",
});

const second_form = ref(false);
const router = useRouter();
const config = useRuntimeConfig()
const is_tipster_approved = useCookie('is_tipster_approved')
const toast = useToast();
const { data: all_sports, pending: all_sports_loading, error: all_sports_err } = await useAsyncQuery<IAllSport>(AllSports)

const pen_name = ref<string>('');
const nationality = ref('');
const favorite_sport = ref<IListProps>({
    name: 'Favorite sport',
    icon: '',
    disabled: true,
});
const other_sport = ref<IListProps>({
    name: 'Other sport',
    icon: '',
    disabled: true,
});
const telegram = ref<string>('');
const social_link = ref<string>('');
const social_name = ref<IListProps>({
    icon: 'mdi:facebook-box',
    name: 'Facebook',
});
const experience = ref<IListProps>({
    name: 'Years of experience',
    disabled: true,
});

const updateSelectedSport = (payload: IListProps): void => {
    error_status.value.favorite_sport = false;
    favorite_sport.value = payload;
};
const updateSelectedOtherSport = (payload: IListProps): void => {
    other_sport.value = payload;
};
const updateExperience = (payload: IListProps): void => {
    error_status.value.experience = false;
    experience.value = payload;
};
const updateSocialName = (payload: IListProps) => {
    error_status.value.social_link = false;
    social_name.value = payload;
};


const image_file = ref<IProfileImage>({
    imageFile: null,
    imageURL: null,
    imageName: null,
})

const hasImage = ref(false);
const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type.startsWith('image/')) {
        image_file.value.imageFile = file;
        image_file.value.imageURL = URL.createObjectURL(file);
        image_file.value.imageName = file.name;
        hasImage.value = true
    } else {
        image_file.value.imageFile = null;
        image_file.value.imageURL = null;
        image_file.value.imageName = null;
        hasImage.value = false
    }
};

const error_status = ref<IErrorTipsterStatus>({
    pen_name: false,
    nationality: false,
    favorite_sport: false,
    telegram: false,
    experience: false,
    profile: false,
    social_link: false
})

const resetErrorStatus = (): void => {
    for (const key in error_status.value) {
        error_status.value[key as keyof IErrorTipsterStatus] = false;
    }
}

const onClickContinue = (): void => {
    resetErrorStatus()
    if (pen_name.value.trim().length === 0) {
        error_status.value.pen_name = true;
        return
    }
    if (nationality.value.length === 0) {
        error_status.value.nationality = true;
        return
    }

    if (favorite_sport.value.name === 'Favorite sport') {
        error_status.value.favorite_sport = true;
        return
    }
    second_form.value = true;
};

function isValidTelegramLink(link: string) {
    const telegramLinkRegex = /^https?:\/\/t\.me\/\w+$/;
    return telegramLinkRegex.test(link);
}

const { mutate: submitTipsterDetails, loading: loadingFetch, error, onDone, onError } = useMutation(SignupTipster)

const onSubmitTipsterDetails = (): void => {
    resetErrorStatus()
    if (telegram.value.trim().length > 0 && isValidTelegramLink(telegram.value)) {
        error_status.value.telegram = false;
    } else {
        error_status.value.telegram = true;
        return
    }
    if (social_link.value.trim().length < 3) {
        error_status.value.social_link = true;
        return
    }

    if (experience.value.name === 'Years of experience') {
        error_status.value.experience = true;
        return
    }
    if (!image_file.value.imageFile) {
        error_status.value.profile = true;
        return
    }

    submitTipsterDetails({ penName: pen_name.value, country: nationality.value, favoriteSport: favorite_sport.value.name, otherSport: other_sport.value.name, telegramLink: telegram.value, socialLink: social_link.value })
};

const transition = {
    "enterActiveClass": "transform ease-out duration-300 transition",
    "enterFromClass": "-translate-y-2 opacity-0",
    "enterToClass": "translate-y-0 opacity-100",
    "leaveActiveClass": "transition ease-in duration-100",
    "leaveFromClass": "opacity-100",
    "leaveToClass": "opacity-0"
}

onDone((data) => {
    if (data.data.signupTipster.errors === null) {
        postProfileImage(data.data.signupTipster.encodedId)
    } else {
        data.data.signupTipster.errors.forEach((error: any) => {
            toast.add({
                title: error,
                ui: {
                    title: 'text-t-gray font-medium capitalize',
                    description: "text-t-gray text-sm",
                    progress: {
                        "base": "absolute bottom-0 end-0 start-0 h-0",
                    },
                    icon: {
                        "color": "text-[tomato]"
                    },
                    transition: transition,
                },
                icon: 'i-heroicons-information-circle',
                timeout: 0
            });
            if(error === "pen_name: Tipster with this Pen name already exists.") {
                second_form.value = false;
            }
        });
    }
})

onError((error) => {
    console.log("Error here onError:", error)
    if (error.message === "Failed to fetch") {
        toast.add({
            title: error.message,
            ui: {
                title: "text-t-gray text-base",
                progress: {
                    "base": "absolute bottom-0 end-0 start-0 h-0",
                },
                icon: {
                    "color": "text-[tomato]"
                },
                transition: transition,
            },
            icon: 'i-heroicons-information-circle',
            timeout: 0
        });
    }
    if (error.message === "Error decoding signature") {
        router.push('/accounts/login')
    }
})

// Post also the Image
const postProfileImage = async (id: string) => {
    const formData = new FormData();
    formData.append('image', image_file.value.imageFile as any);
    formData.append('tipster_id', id)

    const apiUrl = config.public.apiEndpoint + '/tipster/upload-tipster-image/';
    const { data, error } = await useFetch(apiUrl, {
        method: 'POST',
        body: formData,
    });

    if (data) {
        is_tipster_approved.value = 'false';
        router.push("/accounts/waiting-verification")
    } else if (error) {
        console.error('Error fetching data:', error);
        toast.add({
            title: "Error trying uploading image retry submitting",
            ui: {
                title: "text-t-gray text-base",
                progress: {
                    "base": "absolute bottom-0 end-0 start-0 h-0",
                },
                icon: {
                    "color": "text-[tomato]"
                },
                transition: transition,
            },
            icon: 'i-heroicons-information-circle',
        });
    }
}
</script>
<template>
    <section class="w-full flex flex-col items-center pb-6">
        <div class="w-full px-8 md:px-0 md:max-w-[400px] flex flex-col gap-y-4 mt-24">
            <ContainersDialog>
                <div class="w-full py-1 relative">
                    <div class="py-6 mt-2 flex justify-center flex-col items-center px-10 gap-y-4">
                        <p class="text-t-gray text-base font-normal text-center">
                            To get started as a tipster provide the following
                            details.
                        </p>
                    </div>
                    <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
                        <div class="w-full flex flex-col">
                            <Transition mode="out-in">
                                <AccountsTipsterSportsForm v-if="!second_form"
                                    @submit-sport-data="onClickContinue"
                                    v-model:pen_name="pen_name"
                                    v-model:nationality="nationality"
                                    :favorite_sport="favorite_sport"
                                    :other_sport="other_sport"
                                    @update-selected-other-sport="updateSelectedOtherSport"
                                    @update-selected-sport="updateSelectedSport"
                                    :error_status="error_status"
                                    :all_sports="all_sports"
                                    :pending_sports="all_sports_loading"
                                />
                                <AccountsTipsterSocialForm v-else :loading="loadingFetch" v-model:telegram="telegram"
                                    :experience="experience" :social_name="social_name" v-model:social_link="social_link"
                                    @update-experience="updateExperience" @submit-data="onSubmitTipsterDetails"
                                    @update-social-name="updateSocialName" @go-back="() => (second_form = false)"
                                    :error_status="error_status" :image_file="image_file" :has-image="hasImage"
                                    @handle-file-change="handleFileChange" />
                            </Transition>
                        </div>
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
