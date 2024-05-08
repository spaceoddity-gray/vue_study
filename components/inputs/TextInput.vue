<template>
    <div
        :class="[
            'default-text-input',
            margin === 'normal' ? 'mt-4 mb-2' : margin === 'dense' && 'mt-2 mb-1'
        ]"
    >
        <label
            :class="[
                'absolute z-[1] inset-0 h-fit overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none select-none scale-100 transition-text-input-label origin-top-left translate-x-[13px]',
                isFocus ? 'text-blue-500' : 'text-slate-600',
                isUsed ? 'max-w-[calc(133%-32px)] translate-y-[-9px] scale-75' : `max-w-[calc(100%-24px)] ${size === 'small' ? 'translate-y-2' : size === 'medium' ? 'translate-y-3' : 'translate-y-2'} scale-100`
            ]"
        >
            {{ label }}
        </label>
        <div class="relative inline-flex items-center rounded-[inherit] box-border overflow-hidden">
            <template v-if="$slots.startAdornment">
                <div class="flex max-h-[48px]overflow-hidden items-center whitespace-nowrap text-slate-400">
                    <slot name="startAdornment"/>
                </div>
            </template>
            <input
                v-bind="$attrs"
                v-model="inputValue"
                :type="inputType"
                :name="name"
                :placeholder="placeholder"
                :class="[
                    'flex-1 block w-full px-3 bg-transparent focus:outline-0 transition-opacity appearance-none',
                    isUsed ? 'opacity-1' : 'opacity-0',
                    size === 'small' ? 'py-2' : size === 'medium' ? 'py-3' : 'py-4'
                ]"
                @focus="isFocus = true"
                @blur="isFocus = false"
                @keyup="handleKeyup"
                @keydown="handleKeydown"
            >
            <template v-if="$slots.endAdornment">
                <div class="flex max-h-[48px] p-3 overflow-hidden items-center whitespace-nowrap ml-2 text-slate-400">
                    <slot name="endAdornment"/>
                </div>
            </template>
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
</template>

<script setup lang="ts">

type BaseInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

interface TextInputEmits {
    (event: 'change', value: string): void;
    (event: 'focus', isFocused: boolean): void;
    (event: 'keydown' | 'keyup', value: KeyboardEvent): void;
}

interface TextInputProps {
    label: string;
    name: string;
    type?: BaseInputType;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    margin?: 'none' | 'dense' | 'normal';
    defaultValue?: string;
    value?: string;
}
// props
const props = withDefaults(defineProps<TextInputProps>(), {
    type: 'text',
    placeholder: '',
    size: 'medium',
    margin: 'dense',
    defaultValue: '',
    value: '',
});
//emit
const emit = defineEmits<TextInputEmits>();
//state
const isFocus = ref(false); // 포커스 여부
const isUsed = ref(props.defaultValue || props.value ? true : false); //라벨 활성화 여부
const inputType = ref<BaseInputType>(props.type); //input type state
const inputValue = ref<string>(props.defaultValue); //해당 컴포넌트에서 저장하는 input value

const handleKeyup = (e: KeyboardEvent) => {
    emit('keyup', e);
}

const handleKeydown = (e: KeyboardEvent) => {
    emit('keydown', e);
}

onMounted(() => {
    if (props.defaultValue || props.value) {
        inputValue.value = props.value || props.defaultValue;
        isUsed.value = true;
    }
});

watch(() => props.value, (newValue) => {
    inputValue.value = newValue;
});

watch(() => props.type, (newType) => {
    inputType.value = newType;
});

watch(inputValue, (newValue, oldValue) => {
    isUsed.value = Boolean(newValue.length > 0);
    if (newValue !== oldValue) {
        emit('change', newValue);
    }
});

watch(isFocus, (newFocus, oldFocus) => {
    if(newFocus !== oldFocus) {
        emit('focus', newFocus);
    }
})

//isUsed control
watch([inputValue, isFocus], ([newValue, newFocus]) => {
    if(newFocus || (!newFocus && newValue.length > 0)) // 포커스 했을 경우 무조건 isUsed 활성화
    {
        isUsed.value = true;
    }
    else
    {
        isUsed.value = false;
    }
});

</script>