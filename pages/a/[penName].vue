<script setup lang="ts">
import { GetTipsterByPenName } from "~/graphql/accounts";
import { ISingleTipster, IGetTipsterByPenName } from "~/types/accounts";
import { sportEmojis } from "~/constants/sportsEmojis";

const route = useRoute();
const tipster = ref<ISingleTipster | null>(null);
const loadingTipster = ref(false);
const getTipster = async () => {
  loadingTipster.value = true;
  const { onResult, onError } = useQuery<IGetTipsterByPenName>(
    GetTipsterByPenName,
    {
      penName: route.params.penName,
    },
  );
  onResult((result) => {
    loadingTipster.value = false;
    const tipsters =
      result.data.allTipsters.edges?.map((edge) => edge.node) ?? [];
    if (tipsters?.length > 0) {
      tipster.value = tipsters[0];
    }
  });
  onError((error) => {
    loadingTipster.value = false;
    console.log("Tipster error: ", error);
  });
};

const otherSportList = computed(() => {
  return tipster.value?.otherSport.split(",");
});

const getIcon = (name: string) => {
  return (sportEmojis as Record<string, string>)[name];
};

const updateImgUrl = (url: string) => {
  if (tipster.value) {
    let tipster_data = { ...tipster.value, imageUrl: url };
    tipster.value = tipster_data;
  }
};

onMounted(() => {
  getTipster();
});
</script>
<template>
  <div class="w-full">
    <NuxtLayout name="users">
      <div class="w-full flex flex-col items-center gap-y-2 md:gap-y-4 py-3 md:py-8 mt-6 md:mt-0">
        <Transition>
          <div v-if="!loadingTipster" class="w-full">
            <div v-if="tipster" class="w-full">
              <ProfileTipsterHeader :tipster="tipster" @update-img-url="updateImgUrl" />
            </div>
          </div>
          <div v-else class="flex items-center space-x-4 w-full md:w-[86%]">
            <USkeleton class="w-24 md:w-28 h-24 md:h-28"
              :ui="{ rounded: 'rounded-full', background: 'bg-c-seperator/40' }" />
            <div class="space-y-4 grow">
              <USkeleton class="h-7 w-full" :ui="{ background: 'bg-c-seperator/40' }" />
              <USkeleton class="h-7 w-full" :ui="{ background: 'bg-c-seperator/40' }" />
            </div>
          </div>
        </Transition>
        <div class="w-full mt-4 md:mt-8">
          <div v-if="tipster" class="w-full flex items-center gap-x-2 md:gap-x-6">
            <button class="flex items-center px-2 gap-x-1">
              <Icon :name="getIcon(tipster.favoriteSport)" size="15" />
              <p class="text-sm ml-1">{{ tipster.favoriteSport }}</p>
            </button>
            <button v-for="(sport, index) in otherSportList" class="flex items-center px-2 gap-x-1" :key="index">
              <Icon :name="getIcon(sport)" size="15" />
              <p class="text-sm ml-1">{{ sport }}</p>
            </button>
          </div>
        </div>
        <div class="w-full"></div>
        <div class="w-full mt-3">
          <ContainersPostStatusTab />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
