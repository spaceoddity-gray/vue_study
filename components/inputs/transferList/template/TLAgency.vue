<template>
    <TransferList
        :label="label"
        :before-list="data"
        :before-view-list="viewJson"
        :after-view-list="viewJson"
    />
</template>

<script setup lang="ts">
import TransferList from '../TransferList.vue';
import type { ViewListObject, TransferListProps } from '../TransferList.vue';
import type { PersonDbObject } from '@/pages/agency/form/index.vue';


interface TLAgency extends TransferListProps<PersonDbObject> {

}
//props
defineProps<TLAgency>();
//object
const viewJson: ViewListObject<PersonDbObject>[]  = [
    {
        label: '소속사',
        match: 'name'
    }
]
//state
const data = ref<PersonDbObject[] | null>(null);

const getAgencyData = async () => {
    try {
        const res: PersonDbObject[] = await $fetch('/api/agency', {
            method: 'GET'
        });

        data.value = res;
    } catch (error) {
        console.error(error);
    }
};

onMounted(getAgencyData);
</script>