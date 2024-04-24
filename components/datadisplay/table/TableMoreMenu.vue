<template>
    <div
        class="w-5 h-5 m-auto cursor-pointer"
        @click="updateEl"
    >
        <MoreVert/>
    </div>
    <Popover
        :open="Boolean(menuEl)"
        :anchor-el="menuEl"
        :anchor-origin="{horizontal: 'left', vertical: 'bottom'}"
        @close-popover="closeEvent"
    >
        <div class="py-2">
            <template
                v-for="(option, opIndex) in options"
                :key="opIndex"
            >
                <div
                    :class="[
                    'flex items-center justify-center px-4 cursor-pointer text-sm hover:bg-slate-200/[0.4] py-0.5',
                ]"
                    @click="() => controlEvent(option?.click)"
                >
                    {{ option.label }}
                </div>
            </template>
        </div>
    </Popover>
</template>

<script setup lang="ts">
import Popover from '@/components/utils/Popover.vue';
import MoreVert from '@/components/icons/MoreVert.vue';

export type TableMenuOptionCallback = (idx: number, row: Record<string, unknown>, closePopvoer: () => void) => void;

export interface TableMenuOptionObject {
    label: string;
    click?: TableMenuOptionCallback;
}
//props type
interface TableMoreMenuProps {
    rowIndex: number;
    row: Record<string, unknown>;
    options: TableMenuOptionObject[];
}
//props
const props = defineProps<TableMoreMenuProps>();
//state
const menuEl = ref<HTMLElement | null>(null); //popover 기준점 element

//popover 열기
const updateEl = (e: MouseEvent) => {
    menuEl.value = e.currentTarget as HTMLElement;
};

//ppopover 닫기
const closeEvent = () => {
    menuEl.value = null;
};

const controlEvent = (callback?: TableMenuOptionCallback) => {
    if(typeof callback === 'function') {
        callback(props.rowIndex, props.row, closeEvent);
    }
}

</script>