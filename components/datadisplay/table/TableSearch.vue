<template>
    <div class="flex gap-2 mb-4">
        <template
            v-if="selectOptions && selectOptions.options && selectOptions.options.length > 0"
        >
            <Select
                v-bind="selectOptions"
                margin="none"
                @select="(v) => searchValue.select = v"
            />
        </template>
        <TextInput
            type="search"
            :name="name"
            :label="label"
            :placeholder="placeholder"
            :defaultValue="defaultValue"
            margin="none"
            class="w-full"
            @change="(v) => searchValue.keyword = v"
            @keyup="enterEvent"
        />
        <Button
            variant="contained"
            class="min-w-[80px] p-0"
            :disabled="loading"
            @click="sendSearchValue"
        >
            <div class="w-5 h-5">
                <template v-if="!loading">
                    <SearchIcon/>
                </template>
                <template v-else>
                    <Progress :stroke="2" :size="20"/>
                </template>
            </div>
        </Button>
    </div>
</template>

<script setup lang="ts">
import TextInput from '@/components/inputs/TextInput.vue';
import Select from '@/components/inputs/Select.vue';
import Button from '@/components/inputs/Button.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import Progress from '@/components/feedback/Progress.vue';
//type
import type { SelectProps } from '@/components/inputs/Select.vue';

interface SendObjectEmit {
    keyword: string;
    select: string;
}

//emit type
interface TableSearchEmits {
    (event: 'change', value: SendObjectEmit): void;
    (event: 'submit', value: SendObjectEmit): void;
}
//props type
export interface TableSearchProps {
    label?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    selectOptions?: SelectProps;
    //이후에 추가 검색 옵션 개발 예정 ex)filter options
}
//props
const props = withDefaults(defineProps<TableSearchProps>(), {
    name: 'search',
    label: '검색',
});
//emits
const emit = defineEmits<TableSearchEmits>();
//state
const loading = ref(false); //검색 로딩
const searchValue = ref<SendObjectEmit>({
    keyword: props.defaultValue || '',
    select: props.selectOptions?.defaultValue || ''
});

//입력값을 보내는 이벤트
const sendSearchValue = () => {
    const { value } = searchValue;

    //emit
    emit('submit', value);
};

//enter event
const enterEvent = (e: KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key;
    if(key === 'Enter') {
        sendSearchValue();
    }
};

watch(searchValue, (newV, oldV) => {
    emit('change', newV);
});

</script>