<template>
    <div>
        <template v-if="label">
            <div class="mb-2 text-slate-500">
                {{ label }}
            </div>
        </template>
        <div class="default-transfer-list-wrap">
            <div>
                <TextInput
                    label="검색"
                    name="beforeListSearch"
                    placeholder="값을 선택"
                    size="small"
                    class="w-full"
                />
                <div class="default-transfer-list-box w-[200px] h-[230px]">
                    <ul class="py-2">
                        <li class="[&:not(:last-child)]:border-b border-slate-100 default-transfer-list-item">
                            <div>
                                <p class="text-xs text-slate-400">아이템</p>
                                <p>아이템 1번</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400">아이템</p>
                                <p>아이템 1번</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="grid gap-3 mx-3">
                <Button
                    type="button"
                    variant="outlined"
                    class="py-2 px-4 min-w-0"
                >
                    <div class="w-[20px]">
                        <ChevronRight/>
                    </div>
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    class="py-2 px-4 min-w-0"
                >
                    <div class="w-[20px]">
                        <ChevronLeft/>
                    </div>
                </Button>
            </div>
            <div>
                <TextInput
                    label="선택 검색"
                    name="afterListSearch"
                    placeholder="선택값을 검색"
                    size="small"
                    class="w-full"
                />
                <div class="default-transfer-list-box w-[200px] h-[230px]">
                    <ul class="py-2">
                        <li class="default-transfer-list-item">
                            dd
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../Button.vue';
import TextInput from '../TextInput.vue';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';

export interface TransferListProps {
    label?: string;
    search?: boolean;
    multiple?: boolean;
    width?: number;
    height?: number;
    listData?: any;
    selectListData?: any;
};

interface TransferListEmits {
    (event: 'select-change'): void;
}

defineProps<TransferListProps>();

defineEmits<TransferListEmits>();

//state


</script>