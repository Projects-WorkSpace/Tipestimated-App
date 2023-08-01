<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
<template>
	<div class="w-full">
		<NuxtLayout name="users">
			<div class="w-full flex flex-col gap-y-4 py-4">
				<SectionsPostCard />
				<SectionsPostCard />
				<SectionsPostCard />
			</div>
		</NuxtLayout>
	</div>
</template>
