<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
<template>
	<div class="w-full">
		<NuxtLayout name="users">
			<div class="w-full flex flex-col gap-y-2 py-4">
				<SectionsPostCard />
			</div>
		</NuxtLayout>
	</div>
</template>
