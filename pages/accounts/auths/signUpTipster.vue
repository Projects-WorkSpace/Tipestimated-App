<script setup lang="ts">
import { IListProps } from '~/types/types';
const loading = ref(false);
const second_form = ref(false);
const router = useRouter();

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
    favorite_sport.value = payload;
};
const updateSelectedOtherSport = (payload: IListProps): void => {
    other_sport.value = payload;
};
const updateExperience = (payload: IListProps): void => {
    experience.value = payload;
};
const updateSocialName = (payload: IListProps) => {
    social_name.value = payload;
};

const onClickContinue = (): void => {
    second_form.value = true;
};

const onSubmitTipsterDetails = (): void => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        // router.push({ name: 'waiting-verification' });
    }, 500);
};
</script>
<template>
    <section class="w-full flex flex-col items-center pb-6">
        <div class="mt-[10vh] w-full max-w-[350px] flex flex-col gap-y-3">
            <ContainersDialog>
                <div class="w-full py-1 relative">
                    <div
                        class="py-4 flex justify-center flex-col items-center px-8 gap-y-4"
                    >
                        <p class="text-t-gray text-base font-normal text-center">
                            To get started as a tipster provide the following
                            details.
                        </p>
                    </div>
                    <div class="w-full flex flex-col mt-4 px-6 gap-y-5 pb-3">
                        <div class="w-full flex flex-col">
                            <Transition mode="out-in">
                                <AccountsTipsterSportsForm
                                    v-if="!second_form"
                                    @submit-sport-data="onClickContinue"
                                    v-model:pen_name="pen_name"
                                    v-model:nationality="nationality"
                                    :favorite_sport="favorite_sport"
                                    :other_sport="other_sport"
                                    @update-selected-other-sport="
                                        updateSelectedOtherSport
                                    "
                                    @update-selected-sport="updateSelectedSport"
                                />
                                <AccountsTipsterSocialForm
                                    v-else
                                    :loading="loading"
                                    v-model:telegram="telegram"
                                    :experience="experience"
                                    :social_name="social_name"
                                    v-model:social_link="social_link"
                                    @update-experience="updateExperience"
                                    @submit-data="onSubmitTipsterDetails"
                                    @update-social-name="updateSocialName"
                                    @go-back="() => (second_form = false)"
                                />
                            </Transition>
                        </div>
                    </div>
                </div>
            </ContainersDialog>
        </div>
    </section>
</template>
