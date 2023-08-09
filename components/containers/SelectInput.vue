<script setup lang="ts">
const people = [
  {
    id: 1,
    name: 'Wade Cooper'
  }, {
    id: 2,
    name: 'Arlene Mccoy'
  }, {
    id: 3,
    name: 'Devon Webb'
  }, {
    id: 4,
    name: 'Tom Cook'
  },{
    id: 5,
    name: 'Wade Cooper 2'
  }, {
    id: 6,
    name: 'Arlene Mccoy 2'
  }, {
    id: 7,
    name: 'Devon Webb 2'
  }, {
    id: 8,
    name: 'Tom Cook 2'
  }
]

const selected = ref(people[0].id)

const current = computed(() => people.find(person => person.id === selected.value))
const updateSelected = (data: any) => {
  selected.value = data.id
}
const ui = {
    base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 py-2 text-neutral-800 overflow-y-auto scroll-py-1",
    rounded: "rounded-lg",
    shadow: "shadow-xl",
    ring: "ring-1 ring-neutral-400/70",
    background: "bg-neutral-200",
    input: "block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-2 text-neutral-700 bg-light-hover border-0 border-b border-neutral-400 focus:border-neutral-300 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 focus:outline-none",
    option: {
      color: 'text-neutral-800',
      active: "bg-white",
      padding: "px-2 py-2",
      icon: {
        base: "flex-shrink-0 h-4 w-4",
        active: "text-gray-900",
        inactive: "text-gray-400"
    },
  }
    
}
const ui_select = {
  rounded: "rounded-lg",
  color: {
      gray: {
          outline: 'bg-neutral-200/70 text-neutral-800 text-center ring-1 ring-inset ring-transparent focus:ring-gray-300 py-2'
      }
  },
  size: {
      "2xs": "text-sm",
      "xs": "text-sm",
      "sm": "text-base",
      "md": "text-base",
      "lg": "text-base",
      "xl": "text-base"
  },
  icon: {
    base: "flex-shrink-0 text-neutral-500",
    color: "text-neutral-500",
  },
  padding: {
    "2xs": "px-2 py-2.5 ",
    "xs": "px-2 py-2.5 ",
    "sm": "px-2 py-2.5 ",
    "md": "px-2 py-2.5 ",
    "lg": "px-2 py-2.5 ",
    "xl": "px-2 py-2.5 "
  }

}
</script>

<template>
  <USelectMenu
    v-model="selected"
    @update:model-value="updateSelected"
    :options="people"
    placeholder="Select people"
    value-attribute="id"
    option-attribute="name"
    selected-icon="i-heroicons-check-20-solid"
    :searchable="true"
    searchable-placeholder="Search a league..."
    :ui="ui"
    :ui-select="ui_select"
    color="gray"
    trailing-icon="i-heroicons-chevron-down-20-solid"
  >
    <template #label>
      {{ current?.name }}
    </template>
  </USelectMenu>
</template>
