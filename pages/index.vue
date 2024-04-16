<template>
    <Contents
        :routes="indexRoute"
    >
        <div class="h-[500px]">
            메인 페이지 입니다
        </div>
    </Contents>
</template>

<script setup lang="ts">
    import Contents from '@/components/layout/Contents.vue';

    const indexRoute  = [
    {
        pathName: '메인'
    },
]
</script>