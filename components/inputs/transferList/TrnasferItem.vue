<template>
    <Button
        type="button"
        class="min-w-0 min-h-3 px-4 py-1 justify-start font-normal text-left"
        @click="() => clickEvent(data as T)"
    >
        <template v-if="viewList">
            <div
                v-for="(view, viewListIndex) in viewList"
                :key="viewListIndex"
            >
                <p class="text-xs text-slate-300">{{ view.label }}</p>
                <p class="text-sm">{{ data[view.match] }}</p>
            </div>
        </template>
        <template v-else>
            <div>
                <p class="text-xs text-slate-300">no named</p>
                <p>-</p>
            </div>
        </template>
    </Button>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import Button from '../Button.vue';
import type { ViewListObject } from './TransferList.vue';

interface TrnasferItemProps<T> {
    data: T;
    viewList?: ViewListObject<T>[] | null;
}

interface TrnasferItemEmits<T> {
    (event: 'click', value: T): void;
}

defineProps<TrnasferItemProps<T>>();

const emit = defineEmits<TrnasferItemEmits<T>>();

const clickEvent = (data: T) => {
    emit('click', data);
}


</script>