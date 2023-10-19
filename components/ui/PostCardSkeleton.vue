<template>
  <div class="w-full  bg-white/40 rounded-xl px-4 py-4">
    <div class="w-full flex flex-col gap-y-3 ">
      <div class="w-full flex justify-between">
        <div class="flex items-center">
          <USkeleton class="w-10 md:w-14 h-10 md:h-14" :ui="{ rounded: 'rounded-full' }" />
        </div>
        <div class="flex items-center">
          <USkeleton class="rounded-2xl px-4 sm:px-8 py-1.5 sm:py-2 w-28 h-6 md:h-10" />
        </div>
      </div>
      <div class="w-full flex flex-col">
        <USkeleton class="w-full h-40" :ui="{ rounded: 'rounded-xl' }" />
      </div>
      <div class="w-full grid grid-cols-2">
        <div class="flex items-center">
          <USkeleton class="w-[30%] h-10 rounded-xl" />
        </div>
        <div class="flex items-center justify-end ">
          <USkeleton class="w-[30%] h-10 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
</template>
