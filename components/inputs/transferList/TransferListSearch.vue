<template>
    <div class="flex items-center gap-1">
        <Select
            label="카테고리"
            size="small"
            margin="none"
            class="bg-white"
            :options="viewList?.map((d) => {
                const json = {
                    label: d.label,
                    value: d.match
                } as OtionsObject

                return json;
            }) || []"
            @select="updateSelect"
        />
        <TextInput
            label="검색"
            name="beforeListSearch"
            placeholder="값을 선택"
            size="small"
            class="flex-1"
            margin="none"
            @change="updateQuery"
            @keyup="enterEvent"
        />
        <Button
            variant="contained"
            @click="submitEvent"
        >
            <div class="w-4 h-5">
                <SearchIcon/>
            </div>
        </Button>
        
    </div>
</template>

<script setup lang="ts" generic="T">
import Select from '../Select.vue';
import TextInput from '../TextInput.vue';
import Button from '../Button.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
//type
import type { ViewListObject } from './TransferList.vue';
import type { OtionsObject } from '../Select.vue';

export interface SearchObject {
    select: string;
    query: string;
}

export interface TLSearchProps<T> {
    viewList?: ViewListObject<T>[] | null; //카테고리
}

export interface TLSearchEmits {
    (evnet: 'submit', searchObject: SearchObject): void;
}

//props
defineProps<TLSearchProps<T>>();
//emits
const emit = defineEmits<TLSearchEmits>();

const searchOptionObject = ref<SearchObject>({
    select: '',
    query: '',
});

//chage select
const updateSelect = (v: string) => {
    searchOptionObject.value = {...searchOptionObject.value, select: v};
}

//chage query 
const updateQuery = (v: string) => {
    searchOptionObject.value = {...searchOptionObject.value, query: v}
}

const submitEvent = () => {
    emit('submit', searchOptionObject.value);
}

const enterEvent = (e: KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key;
    if(key === 'Enter') {
        submitEvent();
    }
}


watch(searchOptionObject, (newVal) => {
    console.log('디버깅', newVal)
})

</script>