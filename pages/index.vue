<script setup lang="ts">
// definePageMeta({
// 	middleware: "auth",
// });
</script>
<template>
	<div class="w-full">
		<NuxtLayout name="users">
			<div class="w-full flex flex-col gap-y-4 py-4 mt-2">
				<UiSliderHorizontal />
				<div class="w-full flex flex-col gap-y-4 mt-2">
					<SectionsPostCard />
					<SectionsPostCard />
					<SectionsPostCard />
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
