<template>
    <h5 class="font-semibold text-slate-600">타이틀 입니다</h5>
    <div class="w-full">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import BreadcrumbsVue from '../navigation/Breadcrumbs.vue';
</script>