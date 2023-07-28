<script setup lang="ts">
import { IErrorTipsterStatus, IListProps, IProfileImage } from '~/types/types';

const emits = defineEmits<{
    (e: 'goBack'): void;
    (e: 'submitData'): void;
    (e: 'update:telegram', payload: string): void;
    (e: 'update:social_link', payload: string): void;
    (e: 'updateExperience', payload: IListProps): void;
    (e: 'updateSocialName', payload: IListProps): void;
    (e: 'handleFileChange', payload: Event): void
}>();
const props = defineProps<{
    loading: boolean;
    telegram: string;
    experience: IListProps;
    social_name: IListProps;
    social_link: string;
    error_status: IErrorTipsterStatus
    hasImage: boolean;
    image_file: IProfileImage
}>();

const socials: IListProps[] = [
    { icon: 'mdi:twitter', name: 'Twitter' },
    { icon: 'mdi:instagram', name: 'Instagram' },
    { icon: 'mdi:facebook-box', name: 'Facebook' },
];

const experiences: IListProps[] = [
    { name: '3 years' },
    { name: '4 years' },
    { name: 'More than 5 years' },
];

const updateExperience = (payload: IListProps): void => {
    emits('updateExperience', payload);
};
const updateSocialName = (payload: IListProps): void => {
    emits('updateSocialName', payload);
};

const handleFileChange = (event: Event) => {
    emits("handleFileChange", event);
};

const defaultImage = '/icons/docs.png';
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col gap-y-5 pb-6">
            <div class="w-full flex flex-col">

                <div class="relative bg-inherit w-full flex items-center gap-x-1">
                    <div class="flex-none">
                        <label for="telegram"
                            class="inline-flex w-full justify-center items-center rounded-l-lg bg-c-light px-3 h-10 text-sm font-medium hover:bg-c-light/90 focus:outline-none ring-1 ring-c-seperator/60 focus-visible:ring-neutral-400/60">
                            <Icon name="mdi:telegram" class="text-xl text-t-gray" />
                        </label>
                    </div>
                    <div class="relative grow">
                        <input type="text" id="telegram" name="telegram"
                            class="text-sm bg-c-light h-10 w-full rounded-r-lg text-gray-700 placeholder-t-gray/60 ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                            placeholder="Telegram link" :value="telegram" @input="
                                emits(
                                    'update:telegram',
                                    ($event.target as HTMLInputElement).value
                                )
                                " />
                    </div>
                </div>
                <p v-if="error_status.telegram" class="w-full text-xs text-red-500 mt-1.5 ml-0.5">Enter valid telegram link
                </p>
            </div>
            <div class="w-full flex flex-col">
                <div class="relative bg-inherit w-full flex items-center gap-x-1">
                    <div class="flex-none">
                        <AccountsSocialMenu :social_name="social_name" :socials="socials"
                            @update-social-name="updateSocialName" />
                    </div>
                    <div class="relative w-full grow">
                        <input type="text" id="social" name="social"
                            class="text-sm bg-c-light h-10 w-full rounded-r-lg text-gray-700 placeholder-t-gray/60 ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                            placeholder="Preferred social media link" :value="social_link" @input="
                                emits(
                                    'update:social_link',
                                    ($event.target as HTMLInputElement).value
                                )
                                " />
                    </div>
                </div>
                <p v-if="error_status.social_link" class="w-full text-xs text-red-500 mt-1.5 ml-0.5">Enter valid
                    {{ social_name.name }} link</p>
            </div>
            <div class="w-full">
                <ContainersListboxComponent :selected="experience" :list="experiences" @updated-selected="updateExperience"
                    :error_status="error_status.experience" error_text="Select your years of experience" />
            </div>
            <div class="flex flex-col">
                <label class="block mb-1 text-t-gray/90 text-xs" for="file_input">Upload profile</label>
                <div class="relative bg-inherit w-full flex items-center gap-x-1">
                    <div class="flex-none">
                        <button
                            class="inline-flex justify-center items-center rounded-lg bg-c-light px-1 h-10 text-sm font-medium hover:bg-c-light/90 focus:outline-none ring-1 ring-c-seperator/60 focus-visible:ring-neutral-400/60">
                            <NuxtImg v-if="hasImage" :src="image_file.imageURL || defaultImage" alt="Uploaded Image"
                                class="w-8 h-8 rounded-lg" />
                            <Icon name="mdi:account" v-else class="w-8 text-2xl text-t-gray/90" />
                        </button>
                    </div>
                    <div class="relative grow">
                        <button
                            class="text-sm bg-c-light h-10 w-full rounded-lg text-t-gray/90 ring-1 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none flex flex-col">
                            <label class="flex flex-nowrap w-full h-full items-center gap-x-2 px-2 cursor-pointer">
                                <input type="file" id="file_input" class="hidden" @change="handleFileChange" />
                                <Icon name="mdi:cloud-upload" class="text-2xl flex-none" />
                                <span v-if="image_file.imageName" class="text-sm">{{
                                    image_file.imageName
                                }}</span>
                                <p v-else class="text-sm">
                                    Upload profile photo
                                </p>
                            </label>
                        </button>
                    </div>
                </div>
                <p v-if="error_status.profile" class="w-full text-xs text-red-500 mt-1.5 ml-0.5">Upload an image</p>
            </div>
            <div class="w-full flex flex-col mt-4 gap-y-5">
                <button @click="emits('submitData')"
                    class="w-full py-2.5 text-base font-semibold bg-base-green/90 text-neutral-700 tracking-wide rounded hover:bg-base-green focus:bg-base-green transition flex items-center justify-center">
                    <div v-if="!loading" class="">
                        <p>Submit</p>
                    </div>
                    <UtilsSmallStarLoading v-else class="my-[3px]" />
                </button>
                <button @click="emits('goBack')"
                    class="text-base-green font-semibold text-base hover:bg-base-green/20 py-2 rounded-lg duration-200">
                    Go back
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
input[type='file']::file-selector-button {
    visibility: hidden;
    color: transparent;
}

input[type='file']::-webkit-file-upload-button {
    visibility: hidden;
    color: transparent;
}
</style>
