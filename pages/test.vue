<template>
    <Select
        label="테스트"
        :options="selectOptions"
    />
    <div class="h-[2000px]"></div>
    <button
        @click="triggerPopvoer"
    >
        Open Modal
    </button>
    <Popover
        :open="Boolean(btnEl)"
        :anchor-el="btnEl"
        :anchor-origin="{vertical: 'bottom', horizontal: 'left'}"
        @close-popover="closePopover"
    >
        <div class="p-6">
            안녕
        </div>
    </Popover>
</template>

<script setup lang="ts">
import Popover from '@/components/utils/Popover.vue';
import Select from '@/components/inputs/Select.vue';
//state
const btnEl = ref<HTMLElement | null>(null);

const triggerPopvoer = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    btnEl.value = el;
}

const closePopover = () => {
    btnEl.value = null;
}

const selectOptions = [
    {
        label: '옵션 1',
        value: 'option1',
    },
    {
        label: '옵션 2',
        value: 'option2',
    },
    {
        label: '옵션 3',
        value: 'option3',
    },
]

</script>