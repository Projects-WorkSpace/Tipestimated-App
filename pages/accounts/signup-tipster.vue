<script setup lang="ts">
import {
  IListProps,
  IErrorTipsterStatus,
  IProfileImage,
  ISportOptions,
} from "~/types/types";
import { SignupTipster } from "~/graphql/schema";
import { usePageFeatureStore } from "~/store/pageFeatures";

// Protected page
definePageMeta({
  middleware: "other-auth",
});

const toast = useToast();
const router = useRouter();
const config = useRuntimeConfig();
const second_form = ref(false);
const featureStore = usePageFeatureStore();
const tipster_payload = useCookie("tipster_payload", { sameSite: true });
const is_tipster_approved = useCookie("is_tipster_approved", {
  sameSite: true,
});

const sportOptions = ref<ISportOptions[]>([
  { id: 1, name: "SOCCER", icon: "⚽" },
  { id: 2, name: "BASKETBALL", icon: "🏀" },
  { id: 3, name: "AMERICAN_FOOTBALL", icon: "🏈" },
  { id: 4, name: "BASEBALL", icon: "⚾" },
  { id: 5, name: "RUGBY_UNION", icon: "🏉" },
]);

const pen_name = ref<string>("");
const nationality = ref("");
const favourite = ref<ISportOptions>();
const otherSports = ref<ISportOptions[]>([]);
const telegram = ref<string>("");
const social_link = ref<string>("");
const social_name = ref<IListProps>({
  icon: "mdi:facebook-box",
  name: "Facebook",
});
const experience = ref<IListProps>({
  name: "Years of experience",
  disabled: true,
});

const updateFavouriteSport = (payload: ISportOptions) => {
  error_status.value.favorite_sport = false;
  favourite.value = payload;
};
const updateOtherSport = (payload: ISportOptions[]): void => {
  otherSports.value = payload;
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
});

const hasImage = ref(false);
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    image_file.value.imageFile = file;
    image_file.value.imageURL = URL.createObjectURL(file);
    image_file.value.imageName = file.name;
    hasImage.value = true;
  } else {
    image_file.value.imageFile = null;
    image_file.value.imageURL = null;
    image_file.value.imageName = null;
    hasImage.value = false;
  }
};

const error_status = ref<IErrorTipsterStatus>({
  pen_name: false,
  nationality: false,
  favorite_sport: false,
  telegram: false,
  experience: false,
  profile: false,
  social_link: false,
});

const resetErrorStatus = (): void => {
  for (const key in error_status.value) {
    error_status.value[key as keyof IErrorTipsterStatus] = false;
  }
};

const onClickContinue = (): void => {
  resetErrorStatus();
  if (pen_name.value.trim().length === 0) {
    error_status.value.pen_name = true;
    return;
  }
  if (nationality.value.length === 0) {
    error_status.value.nationality = true;
    return;
  }

  if (!favourite.value) {
    error_status.value.favorite_sport = true;
    return;
  }
  second_form.value = true;
};

function isValidTelegramLink(link: string) {
  const telegramLinkRegex = /^https?:\/\/t\.me\/\w+$/;
  return telegramLinkRegex.test(link);
}

const {
  mutate: submitTipsterDetails,
  loading: loadingFetch,
  onDone,
  onError,
} = useMutation(SignupTipster);

const onSubmitTipsterDetails = (): void => {
  resetErrorStatus();
  if (telegram.value.trim().length > 0 && isValidTelegramLink(telegram.value)) {
    error_status.value.telegram = false;
  } else {
    error_status.value.telegram = true;
    return;
  }
  if (social_link.value.trim().length < 3) {
    error_status.value.social_link = true;
    return;
  }

  if (experience.value.name === "Years of experience") {
    error_status.value.experience = true;
    return;
  }
  if (!image_file.value.imageFile) {
    error_status.value.profile = true;
    return;
  }

  submitTipsterDetails({
    penName: pen_name.value,
    country: nationality.value,
    favoriteSport: favourite.value?.name,
    otherSport: otherSports.value.map((sport) => sport.name).join(","),
    telegramLink: telegram.value,
    socialLink: social_link.value,
  });
};

const toastError = (title: string) => {
  toast.add({
    title: title,
    ui: {
      title: "text-t-gray font-medium capitalize",
      description: "text-t-gray text-sm",
      progress: {
        base: "absolute bottom-0 end-0 start-0 h-0",
      },
      icon: {
        color: "text-[tomato]",
      },
    },
    icon: "i-heroicons-information-circle",
    timeout: 0,
  });
};

onDone((data) => {
  if (data.data.signupTipster.errors === null) {
    tipster_payload.value = JSON.stringify({
      tipsterID: data.data.signupTipster.tipster.id,
    });
    postProfileImage(data.data.signupTipster.encodedId);
    featureStore.updateIsTipster(true);
  } else {
    data.data.signupTipster.errors.forEach((error: any) => {
      toastError(error);
      if (error === "pen_name: Tipster with this Pen name already exists.") {
        second_form.value = false;
      }
    });
  }
});

onError((error) => {
  if (error.message === "Failed to fetch") {
    toastError(error.message);
  }
  if (error.message === "Error decoding signature") {
    router.push("/accounts/login");
  }
});

// Post also the Image
const postProfileImage = async (id: string) => {
  const formData = new FormData();
  formData.append("image", image_file.value.imageFile as any);
  formData.append("tipster_id", id);

  const apiUrl = config.public.apiEndpoint + "/tipster/upload-tipster-image/";
  const { data, error } = await useFetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  if (data) {
    is_tipster_approved.value = "false";
    router.push("/accounts/waiting-verification");
  } else if (error) {
    console.error("Error fetching data:", error);
    toastError("Error trying uploading image retry submitting");
  }
};
</script>
<template>
  <section class="w-full flex flex-col items-center pb-6">
    <div class="w-full px-8 md:px-0 md:max-w-[400px] flex flex-col gap-y-4 mt-24">
      <ContainersDialog>
        <div class="w-full py-1 relative">
          <div class="py-6 mt-2 flex justify-center flex-col items-center px-10 gap-y-4">
            <p class="text-t-gray text-base sm:text-lg font-normal text-center">
              To get started as a
              <span class="font-semibold text-gray-600">Tipster</span> provide
              the following details.
            </p>
          </div>
          <div class="w-full flex flex-col mt-4 px-10 gap-y-6">
            <div class="w-full flex flex-col">
              <Transition mode="out-in">
                <AccountsTipsterSportsForm v-if="!second_form" @submit-sport-data="onClickContinue"
                  v-model:pen_name="pen_name" v-model:nationality="nationality" :error_status="error_status"
                  :sport-options="sportOptions" :favourite="favourite" @update-favourite-sport="updateFavouriteSport"
                  :other-sports="otherSports" @update-other-sports="updateOtherSport" />
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
