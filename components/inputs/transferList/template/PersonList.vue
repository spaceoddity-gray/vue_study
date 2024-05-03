<template>
    <TransferList
        :label="label"
    />
</template>

<script setup lang="ts">
import TransferList from '../TransferList.vue';
import type { TransferListProps } from '../TransferList.vue';

interface PersonListProps extends TransferListProps {

}

defineProps<PersonListProps>();

</script>