<template>
    <div class="flex justify-between items-center">
        <div>
            <h6 class="font-semibold">
                타이틀 입니다
                <p class="text-sm font-normal text-slate-500">서브타이틀 입니다</p>
            </h6>
            <Breadcrumbs
                class="mt-4"
                :routes="routes"
            />
        </div>
        <div class="flex gap-2">
            <Button
                variant="contained"
            >
                생성
            </Button>
        </div>
    </div>
    <div class="relative w-full mt-10 px-4 py-6 box-border shadow-md bg-white">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import Breadcrumbs, { type BreadcrumbsProps } from '../navigation/Breadcrumbs.vue';
import Button from '../inputs/Button.vue';

interface ContentsProps extends BreadcrumbsProps {

}

const {
    routes
} = defineProps<ContentsProps>();

</script>