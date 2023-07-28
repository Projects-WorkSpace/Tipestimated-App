<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
<template>
	<div class="w-full">
		<NuxtLayout name="users">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
