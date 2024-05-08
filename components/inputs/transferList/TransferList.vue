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
                                    @click="() => saveSelectEvent(beforeData, beforeIndex)"
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
                    @click="unConfirmEvent"
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
                                class="default-transfer-list-item"
                            >
                                <Button
                                    type="button"
                                    class="min-w-0 min-h-3 px-4 py-1 justify-start font-normal text-left"
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

export interface ViewListObject<T> {
    label: string;
    match: keyof T;
};

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

interface TransferListEmits {
    (event: 'select-change'): void;
}

interface TransferSelectObject<T> {
    data: T;
    index: number;
}

const props = defineProps<TransferListProps<T>>();

defineEmits<TransferListEmits>();

//state
const selectList = ref<TransferSelectObject<T>[]>([]) as Ref<TransferSelectObject<T>[]>;
const confirmList = ref<TransferSelectObject<T>[]>([]) as Ref<TransferSelectObject<T>[]>;

console.log(selectList)

//add select
const saveSelectEvent = (data: T, index: number) => {
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

//move
const confirmEvent = () => {
    confirmList.value = selectList.value;
    //reset
    selectList.value = [];
}

const unConfirmEvent = () => {

}

</script>