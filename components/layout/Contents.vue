<template>
    <h6 class="font-semibold text-slate-700">
        타이틀 입니다
        <p class="text-sm font-normal text-slate-500">서브타이틀 입니다</p>
    </h6>
    <Breadcrumbs
        class="mt-4"
        :routes="abc"
    />
    <div class="relative w-full mt-6 px-4 py-6 box-border shadow-md bg-white">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '../navigation/Breadcrumbs.vue';

const abc = [
    {
        pathName: '메인',
        asPath: '/',
    },
    {
        pathName: '타이틀 페이지',
        asPath: '/sub',
    },
]
</script>