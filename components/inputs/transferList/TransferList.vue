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
                    <TextInput
                        label="검색"
                        name="beforeListSearch"
                        placeholder="값을 선택"
                        size="small"
                        class="w-full"
                    />
                </template>
                <div class="default-transfer-list-box w-[200px] h-[230px]">
                    <ul class="py-2">
                        <template v-if="beforeList">
                            <li
                                v-for="(beforeData, beforeIndex) in beforeList"
                                :key="beforeIndex"
                                class="relative [&:not(:last-child)]:border-b border-slate-100 default-transfer-list-item transition-colors"
                                :style="{ backgroundColor: selectList.some((sl) => sl.index === beforeIndex) ? '#ff324b44' : '' }"

                            >
                                <Button
                                    type="button"
                                    class="min-w-0 min-h-3 px-4 py-1 justify-start font-normal text-left"
                                    @click="() => selectEvent(beforeData, beforeIndex)"
                                >
                                    <template v-if="beforeViewList">
                                        <div
                                            v-for="(beforeView, beforeViewListIndex) in beforeViewList"
                                            :key="beforeViewListIndex"
                                        >
                                            <p class="text-xs text-slate-300">{{ beforeView.label }}</p>
                                            <p class="text-sm">{{ beforeData[beforeView.match] }}</p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            <p class="text-xs text-slate-300">no named</p>
                                            <p>-</p>
                                        </div>
                                    </template>
                                </Button>
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
                    <TextInput
                        label="선택 검색"
                        name="afterListSearch"
                        placeholder="선택값을 검색"
                        size="small"
                        class="w-full"
                    />
                </template>
                <div class="default-transfer-list-box w-[200px] h-[230px]">
                    <template v-if="confirmList.length > 0">
                        <ul class="py-2">
                            <li
                                v-for="(confirmItem, confirmIndex) in confirmList"
                                :key="confirmIndex"
                                class="relative [&:not(:last-child)]:border-b border-slate-100 default-transfer-list-item transition-colors"
                                :style="{ backgroundColor: refuteSelectList.some((sl) => sl.index === confirmItem.index) ? '#ff324b44' : '' }"
                            >
                                <Button
                                    type="button"
                                    class="min-w-0 min-h-3 px-4 py-1 justify-start font-normal text-left"
                                    @click="() => unselectEvent(confirmItem)"
                                >
                                    <template v-if="afterViewList">
                                        <div
                                            v-for="(afterView, afterViewListIndex) in afterViewList"
                                            :key="afterViewListIndex"
                                        >
                                            <p class="text-xs text-slate-300">{{ afterView.label }}</p>
                                            <p class="text-sm">{{ confirmItem.data[afterView.match] }}</p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            <p class="text-xs text-slate-300">no named</p>
                                            <p>-</p>
                                        </div>
                                    </template>
                                </Button>
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
import TextInput from '../TextInput.vue';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';

//선택한 데이터의 객체 타입
export interface TransferSelectObject<T> {
    data: T;
    index: number;
}
//데이터와 매칭해서 보여줄 옵션 객체
export interface ViewListObject<T> {
    label: string;
    match: keyof T;
};
//기본 props
export interface TransferListProps<T>{
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
    (event: 'select-change', value: TransferSelectObject<T>[]): void;
}

const props = defineProps<TransferListProps<T>>();

const emit = defineEmits<TransferListEmits<T>>();

//state
const selectList = ref<TransferSelectObject<T>[]>([]) as Ref<TransferSelectObject<T>[]>; //추가 선택하려는 값 리스트
const refuteSelectList = ref<TransferSelectObject<T>[]>([]) as Ref<TransferSelectObject<T>[]>; //선택 해제 하려는 값 리스트
const confirmList = ref<TransferSelectObject<T>[]>([]) as Ref<TransferSelectObject<T>[]>; //최종 선택된 리스트

//add select
const selectEvent = (data: T, index: number) => {
    //conv data
    const json = {
        data,
        index,
    }
    if(props.multiple)
    {
        selectList.value.push(json)
    } else {
        selectList.value = [json];
    }
}

//add unselect
const unselectEvent = (data: TransferSelectObject<T>) => {
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
    const excludeIndices = refuteSelectList.value.map(item => item.index);
    const result = confirmList.value.filter(item => !excludeIndices.includes(item.index));

    confirmList.value = result;
    //reset
    selectList.value = [];
    refuteSelectList.value = [];
}

watch(confirmList, (newValue) => {
    emit('select-change', newValue)
})

</script>