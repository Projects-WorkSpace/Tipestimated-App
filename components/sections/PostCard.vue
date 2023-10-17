<script setup lang="ts">
import { IPostEntity } from '~/types/accounts';

const props = defineProps<{
    node?: IPostEntity;
}>()
</script>
<template>
    <ContainersDialog>
        <div class="w-full flex flex-col gap-y-3 px-4 py-4">
            <SectionsUserHeaderDetails />
            <UiCardDetails>
                <div class="flex flex-col gap-y-2 px-4 py-2 divide-y divide-c-seperator">
                    <SectionsSportPredDetails />
                    <SectionsSportPredDetails />
                </div>
            </UiCardDetails>
            <div class="w-full flex items-center justify-between sm:px-4 pt-1">
                <div class="flex items-center gap-x-4 md:gap-x-5">
                    <button class="flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:cards-heart-outline" class="w-5 h-5 text-neutral-700" />
                        <span class="text-xs text-neutral-700">10.5k</span>
                    </button>
                    <button class="flex flex-col gap-y-1 justify-cente items-center">
                        <Icon name="mdi:share-variant-outline" class="w-5 h-5  text-neutral-700" />
                        <span class="text-xs text-neutral-700">Share</span>
                    </button>
                    <button class="hidden sm:flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:plus-circle-outline" class="w-5 h-5 text-neutral-700" />
                        <span class="text-xs text-neutral-700">Add story</span>
                    </button>
                </div>
                <div class="flex items-center">
                    <SectionsBookMakerBtn :image="'https://cdn.soccersapi.com/images/soccer/bookmakers/2.png'"
                        :bgColor="'bg-green-500'" />
                </div>
            </div>
        </div>
    </ContainersDialog>
</template>
