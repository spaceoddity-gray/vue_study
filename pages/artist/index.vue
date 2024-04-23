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
        sub-title="아티스트를 생성/수정하는 페이지입니다."
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

        </div>
    </Contents>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
</script>