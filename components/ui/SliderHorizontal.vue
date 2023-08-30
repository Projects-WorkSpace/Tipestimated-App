<template>
    <!-- Component: Slider with indicators & controls inside -->
    <div class="relative w-full glide-03">
        <!-- Slides -->
        <div class="overflow-hidden" data-glide-el="track">
            <ul class="relative w-full overflow-hidden px-0.5 py-0.5 whitespace-no-wrap flex flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform]">
                <!-- Loop through your items -->
                <li v-for="(avatar, index) in avatars" :key="index">
                    <UiStoriesAvatars :img-url="avatar.imgUrl" />
                </li>
            </ul>
        </div>
        <!-- Controls -->
        <div class="absolute w-full left-0 flex items-center justify-between h-0 px-2 top-[40%] translate-y-1/2 "
            data-glide-el="controls">
            <button
                class="invisible items-center justify-center w-7 h-7 transition duration-300 border rounded-full lg:w-8 lg:h-8 text-slate-700 border-slate-100 hover:text-slate-900 hover:border-slate-50 focus-visible:outline-none bg-white"
                data-glide-dir="<" aria-label="prev slide">
                <Icon name="mdi:chevron-left" class="text-2xl" />
            </button>
            <button
                :class="avatars.length < 5 && 'invisible'"
                class="inline-flex items-center justify-center w-5 h-5 md:w-7 md:h-7 transition duration-300 border rounded-full lg:w-8 lg:h-8 text-slate-700 border-slate-100 hover:text-slate-900 hover:border-slate-100 focus-visible:outline-none bg-white"
                data-glide-dir=">" aria-label="next slide">
                <Icon name="mdi:chevron-right" class="text-2xl" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Glide from '@glidejs/glide'

const avatars = ref([
  { imgUrl: 'https://avatars.githubusercontent.com/u/739984?v=4' },
  { imgUrl: 'https://avatars.githubusercontent.com/u/904724?v=4' },
  { imgUrl: 'https://avatars.githubusercontent.com/u/7547335?v=4' },
  
]);

onMounted(() => {
    var glide03 = new Glide('.glide-03', {
        type: 'slider',
        startAt: 0,
        perView: 7,
        focusAt: 0,
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