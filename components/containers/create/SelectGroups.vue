<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emits = defineEmits<{
  (e: "toggleOpenGroups"): void;
}>();

const toggleModal = () => {
  console.log("Toggling groups modal");
  emits("toggleOpenGroups");
};
</script>
<template>
  <UModal :model-value="isOpen" @update:model-value="toggleModal" :overlay="true" :ui="{
    width: 'w-[90vw] sm:w-[30vw]',
    height: 'h-full min-h-[45vh]',
    background: 'bg-white',
    rounded: 'rounded-xl',
    container: 'flex min-h-full items-center justify-center text-center',
  }">
    <div class="w-full flex flex-col px-4 py-4 gap-y-4">
      <div class="w-full flex flex-col items-center relative">
        <h3 class="text-lg text-center font-medium">Select groups</h3>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quia
        ratione suscipit adipisci? Asperiores dignissimos, illum laboriosam
        mollitia fugit tempora? Quia necessitatibus unde eveniet eius, beatae
        nobis quis neque mollitia.
      </p>
    </div>
  </UModal>
</template>
