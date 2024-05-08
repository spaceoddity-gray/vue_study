<template>
    <Contents
        :routes="[
                {
                    pathName: '메인',
                    asPath: '/'
                },
                {
                    pathName: '소속사 관리'
                }
        ]"
        title="소속사 관리"
        sub-title="소속사를 관리하는 페이지입니다."
        :buttons="[
            {
                type: 'button',
                variant: 'contained',
                label: '등록',
                click: () => {$router.push('/agency/form')}
            }
        ]"
    >
        <Table
            :cols="tableCols"
            :rows="rowData"
            :loading="loading"
            :more-options="[{
                label: '삭제',
                click: deleteAgencyRow                
            }]"
        />
    </Contents>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
import Table from '@/components/datadisplay/table/Table.vue';
//type
import type { TableMenuOptionCallback } from '@/components/datadisplay/table/TableMoreMenu.vue';
import type { PersonDbObject } from './form/index.vue';


//state
const rowData = ref<PersonDbObject[] | null>(null);
const loading = ref(true);

const tableCols = [
    {
        match: 'id',
        label: 'id',
    },
    {
        match: 'name',
        label: '소속사 명',
    },
    {
        match: 'description',
        label: '서브 표시',
    },
];

const getAgencyData = async () => {
    try {
        const res: PersonDbObject[] = await $fetch('/api/agency', {
            method: 'GET'
        });

        rowData.value = res;
    } catch (error) {
        console.error(error);
    }
    finally {
        loading.value = false;
    }
};

//delete row
const deleteAgencyRow: TableMenuOptionCallback = async (idx, row, closePopvoer) => {
    try {
        console.log(idx, row)
        alert('삭제 api 필요');
        closePopvoer();
    } catch (error) {
        console.error('삭제에 실패하였습니다.');
    }
}

//get data
getAgencyData();

</script>