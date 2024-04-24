<template>
    <Contents
        :routes="[
            {
                pathName: '메인',
                asPath: '/'
            },
            {
                pathName: '아티스트 관리'
            }
        ]"
        title="아티스트 관리"
        sub-title="아티스트를 등록/수정하는 페이지입니다."
        :buttons="[
            {
                type: 'button',
                variant: 'contained',
                label: '등록',
                click: () => {$router.push('/artist/form')}
            }
        ]"
    >
        <Table
            :cols="tableCols"
            :more-options="[{
                label: '삭제',
                click: () => {}                
            }]"
        />
    </Contents>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
import Table from '@/components/datadisplay/table/Table.vue';

const tableCols = [
    {
        match: 'id',
        label: 'id',
    },
    {
        match: 'name',
        label: '활동 명',
    },
    {
        match: '',
        label: '데뷔일',
    },
    {
        match: '',
        label: '포지션',
    },
];
</script>