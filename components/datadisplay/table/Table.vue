<template>
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
            </tr>
        </thead>
        <tbody class="table-row-group box-border">
            <template
                v-for="(row, rowIndex) in rows"
                :key="rowIndex"
            >
                <tr
                    class="efault-table-tr bg-white hover:bg-slate-200/[0.3]"
                    @click="() => emit('rowClick', row, rowIndex)"
                >
                    <template
                        v-for="(part, partIndex) in Object.entries(row)"
                        :key="partIndex"
                    >
                        <td
                            class="table-cell align-[inherit] p-4 text-sm border-b border-b-slate-100"

                        >
                            {{ part[1] }}
                        </td>
                    </template>
                </tr>
            </template>
        </tbody>
    </table>
    <TableFooter/>
</template>

<script setup lang="ts">
import TableFooter from './TableFooter.vue';

//데이터 테이블 헤더 타입
export interface ColsData {
    match: string;
    label: string;
    type?: 'text' | 'image';
};

//데이터 테이블 타입
export interface DataTableProps {
    cols: ColsData[];
    rows: Record<string, unknown>[];
};
//테이블 emit 타입
export interface TableEmit {
    (event: 'rowClick', row: Record<string, unknown>, idx: number): void;
}

//props
const {
    cols,
    rows,
} = defineProps<DataTableProps>();
//emit
const emit = defineEmits<TableEmit>();

</script>