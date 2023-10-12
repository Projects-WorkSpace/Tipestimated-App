<template>
  <div class="w-full flex flex-col items-center gap-y-2 md:gap-y-4">
    <header class="w-full md:w-[84%] flex items-center gap-x-5 md:gap-x-10">
      <UiAvatar w-and-h="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32" />
      <div class="flex flex-col items-center gap-y-4 grow">
        <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-y-4 md:gap-y-2.5">
          <div class="flex md:flex-col items-baseline md:items-start gap-x-2">
            <span class="text-lg font-medium">User1</span>
          </div>
          <div class="flex items-center gap-x-2.5 md:gap-x-4">
            <div class="">
              <button
                class="bg-c-seperator/60 text-neutral-900 font-medium text-sm rounded-lg px-4 md:px-6 py-1.5 md:py-2 hover:bg-c-seperator transition duration-200 flex items-center">
                <span>Following</span>
                <Icon name="ph:caret-down" class="ml-1" />
              </button>
            </div>
            <div class="">
              <button
                class="bg-c-seperator/60 text-neutral-900 font-medium text-sm rounded-lg px-4 md:px-6 py-1.5 md:py-2 hover:bg-c-seperator transition duration-200">Message</button>
            </div>
          </div>
        </div>
        <div class="w-full hidden md:flex">
          <h4 class="text-xl font-medium">Amos K</h4>
        </div>
        <div class="w-full hidden md:flex flex-col space-y-2">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">#3</span>
              <span class="text-sm md:text-base">Ranking</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">82%</span>
              <span class="text-sm md:text-base">ROI</span>
            </div>
            <div class="flex items-center gap-x-1">
              <span class="text-sm md:text-base font-semibold">10K</span>
              <span class="text-sm md:ext-base">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full flex md:hidden flex-col-reverse space-y-2 gap-y-2 px-2">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">#3</span>
          <span class="text-sm md:text-base">Ranking</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">82%</span>
          <span class="text-sm md:text-base">ROI</span>
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm md:text-base font-semibold">10K</span>
          <span class="text-sm md:ext-base">Followers</span>
        </div>
      </div>
      <div class="w-full flex flex-col space-x-2">
        <div class="flex">
          <h4 class="text-lg font-medium">Amos K</h4>
        </div>
      </div>
    </div>

  </div>
</template>
