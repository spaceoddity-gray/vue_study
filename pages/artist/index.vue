<template>
    <Contents
        :routes="indexRoute"
        title="아티스트 관리"
        sub-title="아티스트를 생성/수정하는 페이지입니다."
        :buttons="[
            {
                type: 'button',
                variant: 'contained',
                label: '생성'
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