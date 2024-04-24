<template>
    <div
        :class="[
            'default-select',
            margin === 'normal' ? 'mt-4 mb-2' : margin === 'dense' && 'mt-2 mb-1',
            $attrs.class
        ]"
        ref="selectEl"
    >
        <label
            :class="[
                'absolute z-[1] inset-0 h-fit overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none select-none scale-100 transition-text-input-label origin-top-left translate-x-[16px] pr-8',
                isFocus ? 'text-blue-500' : 'text-slate-500',
                isUsed ? 'max-w-[calc(133%-32px)] translate-y-[-9px] scale-75' : `max-w-[calc(100%-24px)] ${size === 'small' ? 'translate-y-2.5' : size === 'medium' ? 'translate-y-3' : 'translate-y-2.5'} scale-100`
            ]"
        >
            {{ label }}
        </label>
        <div class="relative inline-flex items-center rounded box-border">
            <div
                :class="[
                    'min-h-6 w-full pl-4 pr-8 box-content truncate',
                    size === 'small' ? 'py-2' : size === 'medium' ? 'py-3' : 'py-4'
                ]"
                @click="focusEvent"
            >
                {{ selectedLabel }}
            </div>
            <input
                v-bind="$attrs"
                type="text"
                class="absolute opacity-0 pointer-events-none bottom-0 left-0 w-full box-border"
                @focus="isFocus = true"
                @blur="isFocus = false"
                v-model="selectedValue"
            />
            <div
                class="absolute w-2 h-2 right-[12px] transition-transform"
                :style="{transform: isFocus ? 'rotate(0deg)' : 'rotate(180deg)'}"
            >
                <NuxtImg
                    src="/images/default_arrow.svg"
                    alt="select separator"
                />
            </div>
            <fieldset
                :class="[
                    'absolute inset-0 -top-[5px] px-2 border border-solid rounded-[inherit] pointer-events-none overflow-hidden',
                    isFocus && 'border-2 border-blue-500',
                    !isUsed && 'border-slate-300',
                ]"
            >
                <legend
                    :class="[
                        'block w-auto h-[11px] invisible text-xs whitespace-nowrap overflow-hidden transition-text-input-legend',
                        isUsed ? 'max-w-full' : 'max-w-[0.01px]'
                    ]"
                >
                    <span class="inline-block px-1 opacity-0 visible">{{ label }}</span>
                </legend>
            </fieldset>
        </div>
    </div>
    <Popover
        :open="isFocus"
        :anchor-el="selectEl"
        :anchor-origin="{horizontal: 'left', vertical: 'bottom'}"
        @close-popover="focusEvent"
    >
        <div class="py-2">
            <template
                v-for="(option, opIndex) in options"
                :key="opIndex"
            >
                <div
                    :class="[
                    'flex items-center justify-center px-4 cursor-pointer text-sm hover:bg-slate-200/[0.4]',
                    size === 'small' ? 'py-0.5' : size === 'medium' ? 'py-1.5' : 'py-2.5'
                ]"
                    @click="() => selectedEvent(option.value, option)"
                >
                    {{ option.label }}
                </div>
            </template>
        </div>
    </Popover>
</template>

<script setup lang="ts">
import Popover from '../utils/Popover.vue';
//type
export interface OtionsObject {
    label: string;
    value: string;
}
export interface SelectProps {
    label: string;
    defaultValue?: string;
    size?: 'small' | 'medium' | 'large';
    margin?: 'none' | 'dense' | 'normal';
    options: OtionsObject[];
}
interface SelectEmits {
    (event: 'select', selectValue: string, originOption: OtionsObject): void;
}
// props
const props = withDefaults(defineProps<SelectProps>(), {
    size: 'medium',
    margin: 'dense',
    defaultValue: ''
,});
//emit
const emit = defineEmits<SelectEmits>();
//state
const selectEl = ref(null);
const isFocus = ref(false);
const isUsed = ref(props.defaultValue.length > 0);
const selectedValue = ref(props.defaultValue);
const selectedLabel = ref(props.options.find((op) => op.value === props.defaultValue) || '');

const focusEvent = () => {
    isFocus.value = !isFocus.value
}

//셀렉트 선택 callback event
const selectedEvent = (s: string, op: OtionsObject) => {
    selectedValue.value = op.value;
    selectedLabel.value = op.label;
    emit('select', s, op);
    isFocus.value = false;
}

watch([selectedValue, isFocus], (prev) => {
    isUsed.value = Boolean(prev[1] || prev[0].length > 0);
});

</script>