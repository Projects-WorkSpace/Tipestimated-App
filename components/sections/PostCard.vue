<script setup lang="ts"></script>
<template>
    <ContainersDialog>
        <div class="w-full flex flex-col gap-y-3 px-4 py-4">
            <SectionsUserHeaderDetails />
            <UiCardDetails>
                <div class="flex flex-col gap-y-2 px-4 py-2 divide-y divide-gray-400/50">
                    <SectionsSportPredDetails />
                    <SectionsSportPredDetails />
                </div>
            </UiCardDetails>
            <div class="w-full flex items-center justify-between px-4 pt-1">
                <div class="flex items-center gap-x-4">
                    <button class="flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:cards-heart-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">10.5k</span>
                    </button>
                    <button class="flex flex-col gap-y-1 justify-cente items-center">
                        <Icon name="mdi:share-variant-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">Share</span>
                    </button>
                    <button class="flex flex-col gap-y-1 justify-center items-center">
                        <Icon name="mdi:plus-circle-outline" class="text-2xl text-neutral-700" />
                        <span class="text-sm">Add story</span>
                    </button>
                </div>
                <div class="flex items-center">
                    <SectionsBookMakerBtn :image="'/images/bet365.svg'" :bgColor="'bg-green-500'" />
                </div>
            </div>
        </div>
    </ContainersDialog>
</template>