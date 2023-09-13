<template>
    <div class="w-full flex flex-col py-4 md:py-6 gap-y-6 mt-14">
        <header class="w-full flex flex-col items-start gap-y-3">
            <h2 class="text-lg font-medium hidden md:block">Search</h2>
            <div class="flex items-center relative w-full">
                <input type="search"
                    class="w-full py-2 pr-4 pl-10 rounded-xl text-base tracking-wide placeholder:text-neutral-500/60 bg-white focus:outline-none border border-transparent focus:border-c-seperator hover:border-c-seperator transition duration-200"
                    placeholder="Type to search...">
                <Icon name="ph:magnifying-glass" class="text-base absolute left-3.5 text-neutral-500" />
            </div>
        </header>
        <div class="w-full flex flex-col gap-y-2 mt-2">
            <h4 class="tracking-wide text-lg font-medium">Discover</h4>
            <ul class="w-full grid grid-cols-2 gap-2">
                <SectionsDiscoverCard title="Best Tipsters of the Week" icon="🏆" cardStyle="from-rose-500 to-rose-800" />
                <SectionsDiscoverCard title="Best Tipsters of the month" icon="🤩" cardStyle="from-blue-500 to-blue-800" />
                <SectionsDiscoverCard title="Discover the contests" icon="🙌" cardStyle="from-violet-500 to-violet-800" />
                <SectionsDiscoverCard title="Best football plays" icon="⚽" cardStyle="from-lime-500 to-lime-800" />
                <SectionsDiscoverCard title="Best tennis plays" icon="🎾" cardStyle="from-amber-500 to-amber-800" />
                <SectionsDiscoverCard title="Best tennis Basketball" icon="🏀" cardStyle="from-teal-500 to-teal-800" />
            </ul>
        </div>
    </div>
</template>
