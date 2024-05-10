<template>
    <div>
        <template v-if="label">
            <div class="mb-2 text-sm text-slate-600">
                {{ label }}
            </div>
        </template>
        <div class="default-transfer-list-wrap">
            <div>
                <template v-if="search">
                    <div
                        class="pt-4 mb-3 overflow-hidden"
                        :style="{ width: width + 'px'}"
                    >
                        <TransferListSearch
                            :view-list="beforeViewList"
                        />
                    </div>
                </template>
                <div
                    class="default-transfer-list-box"
                    :style="{ width: width + 'px', height: height + 'px' }"
                >
                    <ul class="py-2">
                        <template v-if="beforeList">
                            <li
                                v-for="(beforeData, beforeIndex) in beforeList"
                                :key="beforeIndex"
                                class="relative [&:not(:last-child)]:border-b border-slate-100 default-transfer-list-item transition-colors"
                                :style="{ backgroundColor: selectList.some((sl) => sl[uniqueIndexKey as keyof T] === beforeData[uniqueIndexKey as keyof T]) ? '#ff324b44' : '' }"
                            >
                                <TrnasferItem
                                    :data="beforeData"
                                    :view-list="beforeViewList"
                                    @click="selectEvent"
                                />
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="grid gap-3 mx-3">
                <Button
                    type="button"
                    variant="outlined"
                    class="py-2 px-4 min-w-0"
                    @click="confirmEvent"
                >
                    <div class="w-[20px]">
                        <ChevronRight/>
                    </div>
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    class="py-2 px-4 min-w-0"
                    @click="refuteEvent"
                >
                    <div class="w-[20px]">
                        <ChevronLeft/>
                    </div>
                </Button>
            </div>
            <div>
                <template v-if="search">
                    <div
                        class="pt-4 mb-3 overflow-hidden"
                        :style="{ width: width + 'px'}"
                    >
                        <TransferListSearch/>
                    </div>
                </template>
                <div
                    class="default-transfer-list-box"
                    :style="{ width: width + 'px', height: height + 'px' }"
                >
                    <template v-if="confirmList.length > 0">
                        <ul class="py-2">
                            <li
                                v-for="(confirmItem, confirmIndex) in confirmList"
                                :key="confirmIndex"
                                class="relative [&:not(:last-child)]:border-b border-slate-100 default-transfer-list-item transition-colors"
                                :style="{ backgroundColor: refuteSelectList.some((sl) => sl[uniqueIndexKey as keyof T] === confirmItem[uniqueIndexKey as keyof T]) ? '#ff324b44' : '' }"
                            >
                                <TrnasferItem
                                    :data="confirmItem"
                                    :view-list="afterViewList"
                                    @click="unselectEvent"
                                />
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div class="flex items-center justify-center h-full">
                            <p class="text-slate-400 text-sm">
                                데이터가 없습니다.
                            </p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T = Record<string, unknown>">
import Button from '../Button.vue';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';
import TrnasferItem from './TrnasferItem.vue';
import TransferListSearch from './TransferListSearch.vue';

//데이터와 매칭해서 보여줄 옵션 객체
export interface ViewListObject<T> {
    label: string;
    match: keyof T;
};
//기본 props
export interface TransferListProps<T> {
    uniqueIndexKey: keyof T;
    label?: string;
    search?: boolean;
    multiple?: boolean;
    width?: number;
    height?: number;
    beforeList?: T[] | null;
    beforeViewList?: ViewListObject<T>[] | null;
    afterList?: T[] | null;
    afterViewList?: ViewListObject<T>[] | null;
};
//emits props
export interface TransferListEmits<T> {
    (event: 'select-change', value: T[]): void;
    (event: 'before-search'): void;
}

const props = withDefaults(defineProps<TransferListProps<T>>(), {
    label: 'TransferList',
    width: 380,
    height: 340,
    beforeList: null,
    beforeViewList: null,
    afterList: null,
    afterViewList: null,
}) ;

const emit = defineEmits<TransferListEmits<T>>();
    

//state
const selectList = ref<T[]>([]) as Ref<T[]>; //추가 선택하려는 값 리스트
const refuteSelectList = ref<T[]>([]) as Ref<T[]>; //선택 해제 하려는 값 리스트
const confirmList = ref<T[]>(props.afterList || []) as Ref<T[]>; //최종 선택된 리스트

//add select
const selectEvent = (data: T) => {
    if(props.multiple)
    {
        selectList.value.push(data)
    } else {
        selectList.value = [data];
    }
}

//add unselect
const unselectEvent = (data: T) => {
    if(props.multiple)
    {
        refuteSelectList.value.push(data)
    } else {
        refuteSelectList.value = [data];
    }
}

//confirm
const confirmEvent = () => {
    confirmList.value = selectList.value;
    //reset
    selectList.value = [];
}

//refute
const refuteEvent = () => {
    const excludeIndices = refuteSelectList.value.map(item => item[props.uniqueIndexKey]);
    const result = confirmList.value.filter(item => !excludeIndices.includes(item[props.uniqueIndexKey]));

    confirmList.value = result;
    //reset
    selectList.value = [];
    refuteSelectList.value = [];
}

watch(confirmList, (newValue) => {
    emit('select-change', newValue)
})

</script>