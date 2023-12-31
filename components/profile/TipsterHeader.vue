<script setup lang="ts">
import { ISingleTipster } from "~/types/accounts";
const props = defineProps<{
  tipster: ISingleTipster;
}>();

const emits = defineEmits<{
  (e: "updateImgUrl", url: string): void;
}>();

const toast = useToast();
const url = useRequestURL();
const config = useRuntimeConfig();
const { copy } = useClipboard();

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    postProfileImage(file);
  } else {
    console.log("Error uploading image");
  }
};

interface IUpdateImgResponse {
  image_url: string;
}
const postProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("tipster_id", props.tipster.id);

  const apiUrl = config.public.apiEndpoint + "/tipster/upload-tipster-image/";
  const { data, error } = await useFetch<IUpdateImgResponse>(apiUrl, {
    method: "POST",
    body: formData,
  });
  if (data.value) {
    emits("updateImgUrl", data.value.image_url);
  } else if (error.value) {
    console.error("Error fetching data:", error.value);
  }
};

const items = [
  [
    {
      label: url.href.replace(/^https?:\/\//, "").replace("/a/", "/"),
      slot: "account",
      icon: "i-heroicons-document-duplicate",
    },
  ],
  [
    {
      label: "Telegram",
      icon: "i-heroicons-link",
    },
    {
      label: props.tipster.socialLink,
      icon: "i-heroicons-link",
    },
  ],
];

const clickCopyTipstimateLink = () => {
  copy(items[0][0].label); // link
  toastCopied();
};

const getSocialMediaPlatform = (url: string) => {
  const socialMediaRegex =
    /^(https?:\/\/)?(www\.)?(twitter\.com|facebook\.com|instagram\.com)\/.+$/i;
  const match = url.match(socialMediaRegex);
  if (match) {
    return match[3].replace(".com", "");
  }
  return null;
};

const toastCopied = () => {
  toast.add({
    title: "Copied",
    ui: {
      title: "text-t-gray font-medium",
      progress: {
        base: "absolute bottom-0 end-0 start-0 h-0",
      },
      icon: {
        color: "text-green-500",
      },
    },
    icon: "i-heroicons-check-circle",
    timeout: 1500,
  });
};
</script>
<template>
  <div class="w-full flex flex-col items-center gap-y-2 md:gap-y-4">
    <header class="w-full md:w-[86%] flex items-center gap-x-8 md:gap-x-10">
      <div
        class="relative flex items-center justify-center group flex-col md:flex-row gap-y-2"
      >
        <UiOtherAvatar
          :img-url="tipster.imageUrl"
          w-and-h="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32"
          class="md:group-hover:opacity-70 transition-opacity duration-200"
        />
        <div
          class="absolute flex items-center justify-center z-10 top-0 bottom-0 left-0 right-0 rounded-full bg-transparent md:group-hover:bg-black/5 transition-colors duration-200"
        >
          <label
            class="items-center justify-center w-11 h-11 rounded-full bg-black/60 hidden md:group-hover:flex cursor-pointer"
          >
            <Icon name="ph:camera-plus-bold" class="w-6 h-6 text-white" />
            <input
              type="file"
              id="file_input"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
        <div class="flex items-center md:hidden z-20">
          <label
            class="hover:underline font-medium text-blue-500 hover:text-blue-600"
          >
            Change photo
            <input
              type="file"
              id="file_input"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>
      <div class="flex flex-col items-center gap-y-4 grow">
        <div
          class="w-full flex flex-col md:flex-row md:items-center justify-between gap-y-4 md:gap-y-2.5"
        >
          <div class="flex md:flex-col items-baseline md:items-start gap-x-2">
            <span class="text-sm md:text-lg md:font-medium lowercase"
              ><span class="font-normal text-base">@</span
              >{{ tipster.penName }}</span
            >
            <span class="text-xl font-medium md:hidden">{{
              tipster.user.userName
            }}</span>
          </div>
          <div class="flex items-center gap-x-4">
            <div class="flex items-center">
              <button class="">
                <Icon name="ph:gear" class="w-7 h-7" />
              </button>
            </div>
            <div class="flex items-center ml-0.5 relative">
              <UDropdown
                :items="items"
                :ui="{ item: { disabled: 'cursor-text select-text' } }"
                :popper="{ placement: 'bottom-end' }"
              >
                <button
                  class="border border-c-seperator/50 p-1.5 rounded-lg hover:border-c-seperator/70 hover:bg-c-seperator/30"
                >
                  <Icon name="ph:share-network" class="w-5 h-5" />
                </button>
                <template #account="{ item }">
                  <div
                    @click="clickCopyTipstimateLink"
                    class="w-full flex items-center justify-between gap-x-1"
                  >
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon
                      :name="item.icon"
                      class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                    />
                  </div>
                </template>

                <template #item="{ item }">
                  <div class="w-full">
                    <NuxtLink
                      v-if="item.label === 'Telegram'"
                      :to="tipster.telegramLink"
                      target="_blank"
                      class="w-full flex items-center justify-between gap-x-1.5"
                    >
                      <div class="flex items-center gap-x-2">
                        <NuxtImg src="/icons/telegram.png" class="w-5 h-5" />
                        <span class="truncate">Share on Telegram</span>
                      </div>
                      <UIcon
                        :name="item.icon"
                        class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto"
                      />
                    </NuxtLink>
                    <NuxtLink
                      v-else-if="
                        getSocialMediaPlatform(item.label) === 'twitter'
                      "
                      :to="item.label"
                      target="_blank"
                      class="w-full flex items-center justify-between gap-x-1.5"
                    >
                      <div class="flex items-center gap-x-2">
                        <NuxtImg src="/icons/twitter.png" class="w-4 h-4" />
                        <span class="truncate">Share on Twitter</span>
                      </div>
                      <UIcon
                        :name="item.icon"
                        class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto"
                      />
                    </NuxtLink>
                    <NuxtLink
                      v-else-if="
                        getSocialMediaPlatform(item.label) === 'instagram'
                      "
                      :to="item.label"
                      target="_blank"
                      class="w-full flex items-center justify-between gap-x-1.5"
                    >
                      <div class="flex items-center gap-x-2">
                        <NuxtImg src="/icons/instagram.png" class="w-5 h-5" />
                        <span class="truncate">Share on Instagram</span>
                      </div>
                      <UIcon
                        :name="item.icon"
                        class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto"
                      />
                    </NuxtLink>
                    <NuxtLink
                      v-else-if="
                        getSocialMediaPlatform(item.label) === 'facebook'
                      "
                      :to="item.label"
                      target="_blank"
                      class="w-full flex items-center justify-between gap-x-1.5"
                    >
                      <div class="flex items-center gap-x-2">
                        <NuxtImg src="/icons/facebook.png" class="w-5 h-5" />
                        <span class="truncate">Share on Facebook</span>
                      </div>
                      <UIcon
                        :name="item.icon"
                        class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto"
                      />
                    </NuxtLink>
                  </div>
                </template>
              </UDropdown>
            </div>
          </div>
        </div>
        <div class="w-full hidden md:flex">
          <h4 class="text-xl font-medium">{{ tipster.user.userName }}</h4>
        </div>
        <div class="w-full hidden md:flex flex-col space-y-2">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">#1</span>
              <span class="text-sm md:text-base">Ranking</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">99%</span>
              <span class="text-sm md:text-base">ROI</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">{{
                tipster.followerCount
              }}</span>
              <span class="text-sm md:ext-base">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div
      class="w-full flex md:hidden flex-col-reverse space-y-2 gap-y-2 px-2 mt-2"
    >
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">#3</span>
          <span class="text-sm md:text-base">Ranking</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">82%</span>
          <span class="text-sm md:text-base">ROI</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">10K</span>
          <span class="text-sm md:ext-base">Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>
