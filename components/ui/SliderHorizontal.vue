<template>
    <!-- Component: Slider with indicators & controls inside -->
    <div class="relative w-full glide-03">
        <!-- Slides -->
        <div class="overflow-hidden" data-glide-el="track">
            <ul
                class="relative w-full overflow-hidden px-0.5 py-0.5 whitespace-no-wrap flex flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform]">
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
                <li>
                    <UiStoriesAvatars />
                </li>
            </ul>
        </div>
        <!-- Controls -->
        <div class="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2 " data-glide-el="controls">
            <button
                class="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full lg:w-12 lg:h-12 text-slate-700 border-slate-700 hover:text-slate-900 hover:border-slate-900 focus-visible:outline-none bg-white/20"
                data-glide-dir="<" aria-label="prev slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <title>prev slide</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
            </button>
            <button
                class="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full lg:w-12 lg:h-12 text-slate-700 border-slate-700 hover:text-slate-900 hover:border-slate-900 focus-visible:outline-none bg-white/20"
                data-glide-dir=">" aria-label="next slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <title>next slide</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Glide from '@glidejs/glide'

onMounted(() => {
    var glide03 = new Glide('.glide-03', {
        type: 'carousel',
        perView: 7,
        focusAt: 'center',
        breakpoints: {
            800: {
                perView: 6
            },
            480: {
                perView: 5
            }
        }

    });

    glide03.mount();
})
</script>
<!-- End Slider with indicators & controls inside -->

<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';
</style>