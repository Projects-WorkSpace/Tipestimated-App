<script setup lang="ts">
const items = [{
  key: 'active',
  label: 'Active',
  description: 'Make changes to your account here. Click save when you\'re done.'
}, {
  key: 'expired',
  label: 'Expired',
  description: 'Change your password here. After saving, you\'ll be logged out.'
}]

const accountForm = reactive({ name: 'Benjamin', username: 'benjamincanac'  })
const passwordForm = reactive({ currentPassword: '', newPassword: '' })

function onSubmit (form: any) {
  console.log('Submitted form:', form)
}

const uiStyles = {
    "list": {
        base: "relative",
        background: "bg-white",
        rounded: "rounded-lg",
        shadow: "",
        padding: "p-1",
        height: "h-12",
        width: "w-full",
        marker: {
            wrapper: "absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none",
            base: "w-full h-full",
            background: "bg-green-500",
            rounded: "rounded-md",
            shadow: "shadow-sm"
        },
        tab: {
            active: "text-white",
            inactive: "text-neutral-800",
            height: "h-full",
            padding: "px-3",
            size: "text-base",
            font: "font-medium",
            rounded: "rounded-md",
            shadow: ""
        }
    }
}
</script>

<template>
  <UTabs :items="items" class="w-full" :ui="uiStyles">
    <template #item="{ item }">
        <div v-if="item.key === 'active'" class="space-y-3 mt-4">
            <SectionsPostCard />
            <SectionsPostCard />
        </div>
        <div v-else-if="item.key === 'expired'" class="space-y-3 mt-4">
            <SectionsPostCard />
        </div>
    </template>
  </UTabs>
</template>