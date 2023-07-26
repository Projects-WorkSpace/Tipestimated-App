<script setup lang="ts">
definePageMeta({
	middleware: "auth",
	// Add in more middleware here
});
</script>
<template>
	<div class="w-full">
		<NuxtLayout name="users">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
