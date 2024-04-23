<template>
    <Contents
        :routes="indexRoute"
        title="인물 검색 및 등록"
        sub-title="인물을 검색 및 등록하는 페이지입니다."
        :buttons="[
            {
                type: 'button',
                variant: 'contained',
                label: '등록',
                click: () => {$router.push('/person/form')}
            }
        ]"
    >
        <div>
            <Table
                :cols="tableCols"
                :rows="tableRows"
            />
        </div>
    </Contents>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
import Table from '@/components/datadisplay/table/Table.vue';

//컨텐츠 라우트 정보
const indexRoute = [
    {
        pathName: '메인',
        asPath: '/'
    },
    {
        pathName: '인물 검색 및 등록'
    }
]

const tableCols = [
    {
        match: 'id',
        label: 'id',
    },
    {
        match: 'detail',
        label: '상세 표시',
    },
    {
        match: 'sub',
        label: '서브 표시',
    },
];

//테이블 정보
const tableRows = [
{ id: 1, detail: 'Snow', sub: 'Jon' },
{ id: 1, detail: 'Snow', sub: 'Jon' },
{ id: 1, detail: 'Snow', sub: 'Jon' },
{ id: 1, detail: 'Snow', sub: 'Jon' },
];

</script>