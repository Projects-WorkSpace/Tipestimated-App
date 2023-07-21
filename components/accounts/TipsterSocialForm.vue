<script setup lang="ts">
import { IListProps } from '~/types/types';

const selectedExp = ref<IListProps>({
    name: 'Years of experience',
    icon: '',
    disabled: true,
});
const experience: IListProps[] = [
    { name: '3 years' },
    { name: '4 years' },
    { name: 'More than 5 years' },
];

const updateExperience = (data: IListProps): void => {
    selectedExp.value = data;
};

interface FileWithPreview extends File {
    preview?: string;
}

const imageFile = ref<FileWithPreview | null>(null);
const imageURL = ref<string | null>(null);
const imageName = ref<string | null>(null);

const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type.startsWith('image/')) {
        imageFile.value = file;
        imageURL.value = URL.createObjectURL(file);
        imageName.value = file.name;
    } else {
        imageFile.value = null;
        imageURL.value = null;
        imageName.value = null;
    }
};

const hasImage = ref(false);
watch(imageFile, () => {
    hasImage.value = !!imageFile.value;
});

const defaultImage = '/icons/docs.png';
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col gap-y-5 pb-6">
            <div class="relative bg-inherit w-full flex items-center gap-x-1">
                <div class="flex-none">
                    <label
                        for="telegram"
                        class="inline-flex w-full justify-center items-center rounded-l-lg bg-c-light px-3 h-10 text-sm font-medium hover:bg-c-light/90 focus:outline-none ring-1 ring-c-seperator/60 focus-visible:ring-neutral-400/60"
                    >
                        <Icon name="mdi:telegram" class="text-xl text-t-gray" />
                    </label>
                </div>
                <div class="relative grow">
                    <input
                        type="text"
                        id="telegram"
                        name="telegram"
                        class="text-sm bg-c-light h-10 w-full rounded-r-lg text-gray-700 placeholder-t-gray/60 ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                        placeholder="Telegram link"
                    />
                </div>
            </div>
            <div class="relative bg-inherit w-full flex items-center gap-x-1">
                <div class="flex-none">
                    <AccountsSocialMenu />
                </div>
                <div class="relative w-full grow">
                    <input
                        type="text"
                        id="social"
                        name="social"
                        class="text-sm bg-c-light h-10 w-full rounded-r-lg text-gray-700 placeholder-t-gray/60 ring-1 px-2 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none"
                        placeholder="Preferred social media link"
                    />
                </div>
            </div>
            <div class="w-full">
                <ContainersListboxComponent
                    :selected="selectedExp"
                    :list="experience"
                    @updated-selected="updateExperience"
                />
            </div>
            <div class="flex flex-col">
                <label class="block mb-1 text-t-gray/90 text-xs" for="file_input"
                    >Upload profile</label
                >
                <div
                    class="relative bg-inherit w-full flex items-center gap-x-1"
                >
                    <div class="flex-none">
                        <button
                            class="inline-flex justify-center items-center rounded-lg bg-c-light px-1 h-10 text-sm font-medium hover:bg-c-light/90 focus:outline-none ring-1 ring-c-seperator/60 focus-visible:ring-neutral-400/60"
                        >
                            <NuxtImg
                                v-if="hasImage"
                                :src="imageURL || defaultImage"
                                alt="Uploaded Image"
                                class="w-8 h-8 rounded-lg"
                            />
                            <Icon
                                name="mdi:account"
                                v-else
                                class="w-8 text-2xl text-t-gray/90"
                            />
                        </button>
                    </div>
                    <div class="relative grow">
                        <button
                            class="text-sm bg-c-light h-10 w-full rounded-lg text-t-gray/90 ring-1 ring-c-seperator/60 focus:ring-neutral-400/60 focus:outline-none flex flex-col"
                        >
                            <label
                                class="flex flex-nowrap w-full h-full items-center gap-x-2 px-2 cursor-pointer"
                            >
                                <input
                                    type="file"
                                    id="file_input"
                                    class="hidden"
                                    @change="handleFileChange"
                                />
                                <Icon
                                    name="mdi:cloud-upload"
                                    class="text-2xl flex-none"
                                />
                                <span v-if="imageName" class="text-sm">{{
                                    imageName
                                }}</span>
                                <p v-else class="text-sm">
                                    Upload profile photo
                                </p>
                            </label>
                        </button>
                    </div>
                </div>
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
