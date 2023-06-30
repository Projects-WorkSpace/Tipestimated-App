<template>
    <div class="flex justify-evenly w-full mt-8">
        <button class="search w-9 h-9 bg-white rounded-md px-2">
            <Icon name="mdi:magnify" class="h-full w-full"></Icon>
        </button>
        <button class="notification w-9 h-9 relative bg-white rounded-md px-2">
            <Icon name="mdi:bell" class="h-full w-full"></Icon>
            <div class="absolute top-0 right-0 bg-red-600/100 rounded-full items-center px-1">
                <h3 class="text-white text-xs">9+</h3>
            </div>
        </button>
        <button class="users-p w-9 h-9 bg-white rounded-md px-2">
            <Icon name="mdi:account-group" class="w-full h-full"></Icon>
        </button>
    </div>
</template>
