<template>
  <div>
    <div>
      <svg class="Heart" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="Heart"
          d="M17.5 27L15.9775 25.6332C10.57 20.7978 7 17.6087 7 13.6948C7 10.5057 9.541 8 12.775 8C14.602 8 16.3555 8.83869 17.5 10.164C18.6445 8.83869 20.398 8 22.225 8C25.459 8 28 10.5057 28 13.6948C28 17.6087 24.43 20.7978 19.0225 25.6436L17.5 27Z"
          :class="{ unfilledHeart: !liked, heartAnimation: animations.startAnimation, filledHeart: liked, heartUnfillAnimation: animations.startUnfillAnimation }" />
        <path
          d="M34.5 17.5C34.5 26.8888 26.8888 34.5 17.5 34.5C8.11116 34.5 0.5 26.8888 0.5 17.5C0.5 8.11116 8.11116 0.5 17.5 0.5C26.8888 0.5 34.5 8.11116 34.5 17.5Z"
          v-show="animations.startRippleAnimation"
          :class="{ ripple: true, rippleAnimation: animations.startRippleAnimation }" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  liked: boolean
  animations: { startAnimation: boolean; startUnfillAnimation: boolean; startRippleAnimation: boolean }
}>()
</script>

<style scoped>
.unfilledHeart {
  stroke: rgb(82 82 82);
  stroke-width: 3;
  fill: rgb(220 38 38);
  fill-opacity: 0;
  stroke-opacity: 1;
  cursor: pointer;
}

.filledHeart {
  stroke: rgb(220 38 38);
  stroke-width: 3;
  fill: rgb(220 38 38);
  fill-opacity: 1;
  stroke-opacity: 1;
  cursor: pointer;
}

.ripple {
  stroke: rgb(220 38 38);
  stroke-width: 5;
}

.heartAnimation {
  transform-origin: center;
  animation: heartAnimation 600ms;
}

.heartUnfillAnimation {
  animation: heartUnfillAnimation 600ms;
}

.rippleAnimation {
  transform-origin: center;
  animation: rippleAnimation 300ms;
}

@keyframes heartAnimation {
  0% {
    stroke: rgb(220 38 38);
    fill: rgb(220 38 38);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke-width: 3;
  }

  50% {
    transform: scale(0.1176063646);
    stroke: #9960C7;
    fill: #9960C7;
    fill-opacity: 1;
    stroke-opacity: 0;
    stroke-width: 0;
  }

  100% {
    stroke: rgb(220 38 38);
    stroke-width: 3;
    fill: rgb(220 38 38);
    fill-opacity: 1;
    stroke-opacity: 1;
  }
}

@keyframes heartUnfillAnimation {
  0% {
    fill-opacity: 1;
  }

  25%,
  100% {
    fill-opacity: 0;
  }
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0.3428571429);
    stroke: rgb(220 38 38);
    stroke-width: 15;
    stroke-opacity: 1;
  }

  100% {
    transform: scale(1);
    stroke: rgb(220 38 38);
    stroke-width: .1;
    stroke-opacity: 0.2;
  }
}
</style>
