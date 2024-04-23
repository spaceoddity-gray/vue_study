<template>
    <ClientOnly>
        <div
            class="inline-flex"
        >
            <div
                ref="pickerEl"
            >
                <TextInput
                    :label="label"
                    :name="name"
                    :value="dayjs(date).format(format)"
                    @change="updateInputDate"
                    @focus="focusInput"
                />
                
            </div>
        </div>
        <Popover
        :open="isPickerOpen"
        :anchorEl="pickerEl"
        @close-popover="closeCalendar"
        :anchor-origin="{
            horizontal: 'center',
            vertical: 'bottom'
        }"
        >
            <v-date-picker v-model="date" />
        </Popover>
    </ClientOnly>
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue';
import Popover from '../utils/Popover.vue';

interface CalendarEmits {
    (event: 'change', valueObject: {date: Date, formatDate: string}): void;
}

interface CalendarProps {
    label?: string;
    name: string;
    defaultDate?: Date;
    format?: string;
}

const props = withDefaults(defineProps<CalendarProps>(), {
    format: 'YYYY-MM-DD',
    label: 'calendar',
});
const emit = defineEmits<CalendarEmits>();
//moment
const dayjs = useDayjs();
//state
const date = ref<Date>(new Date(props.defaultDate || new Date())); //날짜 state
const pickerEl = ref(null); //캘린터 el
const isPickerOpen = ref(false); //캘린더 활성화 여부

const focusInput = (focus: boolean) => {
    if(focus) {
        isPickerOpen.value = true;
    }
}

const closeCalendar = () => {
    isPickerOpen.value = false;
}

//일정 업데이트
const updateInputDate = (value: string) => {
    date.value = new Date(value)
}

const updateEmit = (dateValue: Date) => {
    const json = {
        date: dateValue,
        formatDate: dayjs(dateValue).format(props.format)
    };
    emit('change', json);
}

onMounted(() => {
    updateEmit(date.value);
});

watch(date, (newDate, oldDate) => {
    updateEmit(newDate);
});
</script>