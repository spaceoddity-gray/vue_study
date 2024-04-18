<template>
    <Select
        label="테스트"
        :options="selectOptions"
    />
</template>

<script setup lang="ts">
import Select from '@/components/inputs/Select.vue';

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