<script setup lang="ts">
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'radix-vue'
defineProps<{
    wAndH?: string
    imgUrl?: string
}>();

const hoverState = ref(false);

</script>
<template>
    <div class="flex items-center justify-center">
        <div class="hidden md:flex items-center justify-center">
            <HoverCardRoot v-model:open="hoverState">
                <HoverCardTrigger as-child>
                    <NuxtLink to="/t-VGlwc3RlclR5cGU6NA==">
                        <NuxtImg :src="imgUrl || '/images/profile-picture-5.jpg'"
                            :class="['rounded-full ring-2 ring-offset-1 ring-fuchsia-400', wAndH || 'w-14 h-14']" />
                    </NuxtLink>
                </HoverCardTrigger>
                <HoverCardPortal>
                    <HoverCardContent
                        class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                        :side-offset="5">
                        <div class="flex flex-col gap-[7px]">
                            <NuxtImg class="block h-[60px] w-[60px] rounded-full"
                                :src="imgUrl || '/images/profile-picture-5.jpg'" alt="Tipster" />
                            <div class="flex flex-col gap-[15px]">
                                <div>
                                    <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                                        Radix
                                    </div>
                                    <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                                        @radix_ui
                                    </div>
                                </div>
                                <div class="text-mauve12 m-0 text-[15px] leading-[1.5]">

                                </div>
                                <div class="flex gap-[15px]">
                                    <div class="flex gap-[5px]">
                                        <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                                            3
                                        </div>
                                        <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                                            Ranking
                                        </div>
                                    </div>
                                    <div class="flex gap-[5px]">
                                        <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                                            2,900
                                        </div>
                                        <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                                            Followers
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <HoverCardArrow class="fill-white" size="8" /> -->
                    </HoverCardContent>
                </HoverCardPortal>
            </HoverCardRoot>
        </div>
        <div class="flex md:hidden">
            <NuxtImg :src="imgUrl || '/images/profile-picture-5.jpg'"
                :class="['rounded-full ring-2 py-[1px] ring-fuchsia-400', wAndH || 'w-14 h-14']" />
        </div>

    </div>
</template>
