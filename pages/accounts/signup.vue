<script setup lang="ts">
const loading = ref(false)
const toggleLoading = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 500)
}

const days = Array.from({ length: 31 }, (_, index) => index + 1)
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const years = Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index)
const selectedDay = ref('')
const selectedMonth = ref('')
const selectedYear = ref('')
</script>
<template>
    <section class="w-full flex flex-col items-center pb-6">
        <div class="mt-8 w-full max-w-[350px] flex flex-col gap-y-3">
            <div class="w-full border border-c-seperator py-2.5">
                <div class="py-4 flex justify-center">
                    <h2 class="text-3xl font-medium tracking-wide leading-none">Tipstimate</h2>
                </div>
                <div class="w-full flex flex-col mt-6 px-10 gap-y-5">
                    <div class="relative bg-inherit w-full">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                            placeholder="Username"
                        /><label
                            for="username"
                            class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                            >Username</label
                        >
                    </div>
                    <div class="relative bg-inherit w-full">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                            placeholder="Email"
                        /><label
                            for="email"
                            class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                            >Email</label
                        >
                    </div>
                    <div class="w-full flex flex-col gap-y-1 mb-1">
                        <p class="text-xs text-t-gray">Date of birth: &plus;18 only</p>
                        <div class="dob-input w-full flex flex-row justify-between items-center">
                            <select v-model="selectedDay" class="dob-select">
                                <option value="" disabled selected>Day</option>
                                <option v-for="day in days" :value="day">{{ day }}</option>
                            </select>
                            <select v-model="selectedMonth" class="dob-select">
                                <option value="" disabled selected>Month</option>
                                <option v-for="(month, index) in months" :value="index + 1">{{ month }}</option>
                            </select>
                            <select v-model="selectedYear" class="dob-select">
                                <option value="" disabled selected>Year</option>
                                <option v-for="year in years" :value="year">{{ year }}</option>
                            </select>
                        </div>
                        <!-- <p class="text-xs text-t-gray">You need to be above 18</p> -->
                    </div>
                    <div class="relative bg-inherit w-full">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="peer text-sm bg-transparent h-9 w-full rounded-sm text-gray-700 placeholder-transparent ring-1 px-2 ring-c-seperator focus:ring-neutral-400 focus:outline-none"
                            placeholder="Password"
                        /><label
                            for="password"
                            class="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-c-light mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-t-gray peer-focus:text-xs transition-all"
                            >Password</label
                        >
                    </div>
                    <div class="w-full flex items-center justify-center">
                        <p class="text-xs text-t-gray text-center leading-relaxed">
                            By signing up, you agree to our
                            <span class="text-[13px] text-blue-800">Terms</span> and
                            <span class="text-[13px] text-blue-800">Privacy Policy</span>.
                        </p>
                    </div>
                    <div class="w-full flex flex-col">
                        <button
                            @click="() => toggleLoading()"
                            class="w-full py-2 text-sm font-semibold bg-blue-500 text-white tracking-wide rounded hover:bg-blue-600 focus:bg-blue-600 transition flex items-center justify-center"
                        >
                            <div v-if="!loading" class="">
                                <span class="leading-none">Sign up</span>
                            </div>
                            <UtilsSmallStarLoading v-else />
                        </button>
                    </div>
                    <div class="w-full flex gap-x-4 mt-0.5">
                        <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                        <span class="leading-none text-xs text-t-gray/90 font-medium">OR</span>
                        <div class="h-[1px] bg-c-seperator w-full mt-1"></div>
                    </div>
                    <div class="w-full flex flex-col mt-0.5 mb-1.5">
                        <button
                            class="w-full py-2 text-sm font-semibold bg-blue-500 text-white tracking-wide rounded hover:bg-blue-600 focus:bg-blue-600 transition flex items-center justify-center"
                        >
                            <div class="">
                                <span class="leading-none">Sign up as Tipster</span>
                            </div>
                            <!-- <UtilsSmallStarLoading v-else /> -->
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full border border-c-seperator py-5">
                <div class="flex justify-center items-center gap-x-1">
                    <p class="text-sm">Have an account?</p>
                    <NuxtLink :to="{ name: 'login' }" class="text-blue-500 font-medium text-sm cursor-pointer"
                        >Log in</NuxtLink
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.dob-select {
    @apply text-xs bg-inherit border border-c-seperator rounded-sm text-gray-600 py-1.5 px-2 focus:ring-neutral-400 focus:border-neutral-400 outline-none transition duration-200;
}
</style>
