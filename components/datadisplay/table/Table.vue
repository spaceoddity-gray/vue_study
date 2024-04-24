<template>
    <TableSearch

    />
    <table class="table w-full border-collapse border-spacing-0 min-w-[600px]">
        <thead class="table-header-group box-border">
            <tr class="efault-table-tr">
                <template
                    v-for="(col, colIndex) in cols"
                    :key="colIndex"
                >
                    <th class="table-cell align-[inherit] text-left p-4 text-sm font-semibold text-slate-500 bg-slate-100">
                        <span>
                            {{ col.label }}
                        </span>
                    </th>
                </template>
                <template v-if="moreOptions && moreOptions.length > 0">
                    <th class="table-cell align-[inherit] text-left p-4 text-sm font-semibold text-slate-500 bg-slate-100">
                        <span>
                            
                        </span>
                    </th>
                </template>
            </tr>
        </thead>
        <tbody class="table-row-group box-border">
            <template v-if="!isLoading && props.rows && props.rows.length > 0">
                <tr
                    v-for="(row, rowIndex) in props.rows" :key="rowIndex"
                    class="efault-table-tr bg-white hover:bg-slate-200/[0.3]"
                    @click="() => emit('rowClick', row, rowIndex)"
                >
                    <template
                        v-for="(part, partIndex) in cols"
                        :key="partIndex"
                    >
                        <td
                            class="table-cell align-[inherit] p-4 text-sm border-b border-b-slate-100"
                        >
                            {{ row[part.match] || '-' }}
                        </td>
                    </template>
                    <template v-if="moreOptions && moreOptions.length > 0">
                        <td class="table-cell align-[inherit] p-4 text-sm border-b border-b-slate-100">
                            <TableMoreMenu
                                :row-index="rowIndex"
                                :row="row"
                                :options="moreOptions"
                            />
                        </td>
                    </template>
                </tr>
            </template>
            <template v-else-if="!isLoading">
                <tr>
                    <td colspan="100%">
                        <div class="flex flex-col justify-center items-center h-[200px]">
                            <SearchIcon class="w-10 h-10 mb-3 text-slate-300" />
                            <p class="text-sm text-slate-400">데이터가 존재하지 않습니다.</p>
                        </div>
                    </td>
                </tr>
            </template>

            <template v-if="isLoading">
                <tr>
                    <td colspan="100%">
                        <div class="flex flex-col justify-center items-center h-[200px]">
                            <Progress
                                :size="50"
                                :stroke="4"
                                class="text-slate-300/[0.7]"
                            />
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <TableFooter/>
</template>

<script setup lang="ts">
import TableSearch from './TableSearch.vue';
import TableFooter from './TableFooter.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import TableMoreMenu from './TableMoreMenu.vue';
import Progress from '@/components/feedback/Progress.vue';
//typr
import type { TableMenuOptionObject } from './TableMoreMenu.vue';

//데이터 테이블 헤더 타입
export interface ColsData {
    match: string;
    label: string;
    type?: 'text' | 'image';
};

//데이터 테이블 타입
export interface DataTableProps {
    cols: ColsData[]; //head data
    rows?: Record<string, unknown>[] | null; //body data
    moreOptions?: TableMenuOptionObject[]; //body cell 에서 우측 끝 메뉴 옵션 활성화 여부
    loading?: boolean;
};
//테이블 emit 타입
export interface TableEmit {
    (event: 'rowClick', row: Record<string, unknown>, idx: number): void;
}

//props
const props = defineProps<DataTableProps>();
//emit
const emit = defineEmits<TableEmit>();
//state
const isLoading = ref(Boolean(props.loading));

//loading state update
onMounted(() => {
    isLoading.value = props.loading;
})

watch(() => props.loading, (newLoading) => {
    isLoading.value = newLoading;
});

</script>