<template>
    <TransferList
        v-bind="props"
        :before-list="data"
        :before-view-list="viewJson"
        :after-view-list="viewJson"
    />
</template>

<script setup lang="ts">
import TransferList from '../TransferList.vue';
import type { ViewListObject, TransferListProps } from '../TransferList.vue';
import type { AgencyDBObject } from '@/pages/agency/form/index.vue';


interface TLAgency extends TransferListProps<AgencyDBObject> {

}
//props
const props = defineProps<TLAgency>();
//object
const viewJson: ViewListObject<AgencyDBObject>[]  = [
    {
        label: '소속사',
        match: 'name'
    }
]
//state
const data = ref<AgencyDBObject[] | null>(null);

const getAgencyData = async () => {
    try {
        const res: AgencyDBObject[] = await $fetch('/api/agency', {
            method: 'GET'
        });

        data.value = res;
    } catch (error) {
        console.error(error);
    }
};

onMounted(getAgencyData);
</script>