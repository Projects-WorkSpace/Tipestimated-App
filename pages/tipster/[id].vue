<template>
    <nuxt-layout name="home">
        <div class="flex flex-col items-center mt-8 w-full">
            <div class="card">
                <div class="flex flex-row space-x-4">
                    <div class="border-pink-500 rounded-full border-2 w-20 h-20">
                        <nuxt-img
                            src="/images/luke-porter-PtfrMfx-X7o-unsplash.jpg"
                            alt="Profile images"
                            class="rounded-full object-center object-cover h-full w-full"
                        >
                        </nuxt-img>
                    </div>
                    <div class="flex flex-col items-start pl-4">
                        <h1 class="font-bold text-xl">@User 1</h1>
                        <h3 class="text-sm">name: Kibet</h3>
                        <div class="flex space-x-2 py-6">
                            <h3 class="font-medium">Ranking</h3>
                            <h3 class="font-bold">#3</h3>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <button class="border rounded-3xl w-32 font-bold py-2 items-center bg-gray-600 text-white">
                            Segui gia
                        </button>
                        <div class="flex space-x-2 py-8">
                            <h3 class="font-medium">Followers</h3>
                            <h3 class="font-bold">10.8k</h3>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <button class="border rounded-3xl w-32 font-bold py-2 items-center bg-gray-600 text-white">
                            Messaggio
                        </button>
                        <div class="flex space-x-2 py-8">
                            <h3 class="font-medium">ROI</h3>
                            <h3 class="font-bold">10.8k</h3>
                        </div>
                    </div>
                </div>
                <div class="items-center flex justify-around">
                    <div class="flex items-center space-x-1">
                        <Icon name="mdi:soccer" class="bg-white"></Icon>
                        <h3 class="font-bold">Manchester United</h3>
                    </div>
                    <div class="flex items-center space-x-1">
                        <Icon name="mdi:basketball" class="bg-white"></Icon>
                        <h3 class="font-bold">basketball</h3>
                    </div>
                    <div class="flex items-center space-x-1">
                        <Icon name="mdi:motorbike" class="bg-white"></Icon>
                        <h3 class="font-bold">MotoGP</h3>
                    </div>
                    <div class="flex items-center space-x-1">
                        <Icon name="mdi:tennis" class="bg-white"></Icon>
                        <h3 class="font-bold">Tennis</h3>
                    </div>
                </div>
                <div class="flex space-x-3 py-8">
                    <div class="w-64 bg-green-500 rounded-xl">
                        <button class="w-full items-center py-1.5 font-medium">Attive</button>
                    </div>
                    <div class="w-64 bg-gray-300 rounded-xl">
                        <button class="w-full items-center py-1.5 text-white font-medium">Scadute</button>
                    </div>
                </div>
            </div>
            <div class="flex-flex-col space-y-6 py-3">
                <div class="border shadow-md flex flex-col p-4 rounded-md shadow-pink-500">
                    <div class="flex justify-between">
                        <div class="flex space-x-4 items-center">
                            <div class="border-pink-500 rounded-full border-2 w-[40px] h-[40px]">
                                <nuxt-img
                                    src="/images/luke-porter-PtfrMfx-X7o-unsplash.jpg"
                                    alt="Profile images"
                                    class="rounded-full w-full h-full object-center object-cover"
                                >
                                </nuxt-img>
                            </div>
                            <h3 class="font-bold">User 1</h3>
                            <div
                                class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 items-center px-2 rounded-md"
                            >
                                <h6 class="text-white text-sm">sponsorizzato</h6>
                            </div>
                        </div>
                        <div class="w-32">
                            <button
                                type="button"
                                class="text-xs text-white font-medium w-full items-center border rounded-3xl py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:transition-all delay-300"
                            >
                                Follow Username
                            </button>
                        </div>
                    </div>
                    <div class="bg-gray-300 p-3 mt-2 rounded-md divide-y divide-solid divide-neutral-400">
                        <div class="py-4 px-2">
                            <div class="items-start flex flex-col">
                                <h1 class="font-bold">Milan - Hellas Verona</h1>
                                <div class="flex space-x-2 items-center">
                                    <Icon name="mdi:soccer"></Icon>
                                    <h6 class="text-gray-500 text-sm font-thin">Football - Italy - Serie A</h6>
                                </div>
                                <div class="pl-2 flex">
                                    <span class="h-6 w-4 border-l border-b border-gray-400 relative">
                                        <div class="absolute left-4 px-2 top-3 flex justify-between space-x-48">
                                            <h1 class="font-medium whitespace-nowrap">U/O Tempo IT: 0.5 UNDER</h1>
                                            <h1 class="font-bold">2.85</h1>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="py-4 px-2">
                            <div class="items-start flex flex-col">
                                <h1 class="font-bold">Milan - Hellas Verona</h1>
                                <div class="flex space-x-2 items-center">
                                    <Icon name="mdi:soccer"></Icon>
                                    <h6 class="text-gray-500 text-sm font-thin">Football - Italy - Serie A</h6>
                                </div>
                                <div class="pl-2 flex">
                                    <span class="h-6 w-4 border-l border-b border-gray-400 relative">
                                        <div class="absolute left-4 px-2 top-3 flex justify-between space-x-48">
                                            <h1 class="font-medium whitespace-nowrap">U/O Tempo IT: 0.5 UNDER</h1>
                                            <h1 class="font-bold">2.85</h1>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between pt-3">
                        <div class="flex space-x-3">
                            <div class="text-center items-center flex flex-col space-y-2">
                                <Icon name="mdi:heart" class="text-red-600 h-6 w-6"></Icon>
                                <h2 class="font-medium">10.5k</h2>
                            </div>
                            <div class="text-center items-center flex flex-col space-y-2">
                                <Icon name="mdi:share-variant-outline" class="h-6 w-6"></Icon>
                                <h2 class="font-medium">Condividi</h2>
                            </div>
                            <div class="text-center items-center flex flex-col space-y-2 px-4">
                                <Icon name="mdi:alarm-plus" class="h-6 w-6"></Icon>
                                <h2 class="font-medium">Agguinga Storia</h2>
                            </div>
                        </div>
                        <div
                            class="bg-green-500 flex justify-around p-2 items-center rounded-lg h-14 divide-x divide-solid w-full mt-4"
                        >
                            <div class="flex">
                                <nuxt-img
                                    src="/images/th-2035313927 (1).png"
                                    alt="bookmaker"
                                    class="w-16 object-cover"
                                ></nuxt-img>
                            </div>
                            <div class="flex flex-col px-2">
                                <h4 class="text-white text-xs">Giocata</h4>
                                <h4 class="font-bold text-white text-xs">258</h4>
                                <h4 class="text-white text-xs">Volte</h4>
                            </div>
                            <div class="flex flex-col px-2">
                                <h4 class="text-white text-xs">Probabilita</h4>
                                <h4 class="text-white font-bold text-xs">1.17</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>
<script setup>
const { id } = useRoute().params
</script>
