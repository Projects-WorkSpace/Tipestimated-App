<script setup lang="ts">

</script>
<template>
  <div class="flex items-center justify-between space-x-4 w-full bg-white py-3 px-4">
    <div class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full', background: 'bg-c-seperator/70' }" />
      <div class="space-y-2">
        <USkeleton :ui="{ background: 'bg-c-seperator/70' }" class="h-4 w-[250px]" />
        <USkeleton :ui="{ background: 'bg-c-seperator/70' }" class="h-4 w-[200px]" />
      </div>
    </div>
    <div class="flex items-center">
      <USkeleton :ui="{ background: 'bg-c-seperator/70' }" class="w-20 h-8 " />
    </div>
  </div>
</template>
