<template>
    <Switch name="testSwitch" label="사용 여부"/>
</template>

<script setup lang="ts">
import Select from '@/components/inputs/Select.vue';
import Switch from '@/components/inputs/Switch.vue';

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