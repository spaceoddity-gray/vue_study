<template>
    <div
        :class="[
            'relative inline-flex flex-col',
            margin === 'normal' ? 'mt-4 mb-2' : margin === 'dense' && 'mt-2 mb-1'
        ]"
    >
        <label
            :class="[
                'absolute z-[1] inset-0 h-fit overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none select-none scale-100 transition-text-input-label origin-top-left translate-x-[13px]',
                isFocus ? 'text-blue-500' : 'text-slate-500',
                isUsed ? 'max-w-[calc(133%-32px)] translate-y-[-9px] scale-75' : `max-w-[calc(100%-24px)] ${size === 'small' ? 'translate-y-2' : size === 'medium' ? 'translate-y-3' : 'translate-y-2'} scale-100`
            ]"
        >
            {{ label }}
        </label>
        <div class="relative inline-flex items-center rounded box-border">
            <input
                :class="[
                    'block w-full px-3 bg-transparent focus:outline-0 transition-opacity',
                    isUsed ? 'opacity-1' : 'opacity-0',
                    size === 'small' ? 'py-2' : size === 'medium' ? 'py-3' : 'py-4'
                ]"
                :type="type"
                :placeholder="placeholder"
                @focus="isFocus = true"
                @blur="isFocus = false"
                v-model="value"
            />
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
import { ref, watch, withDefaults, defineProps } from 'vue';

interface TextInputProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    margin?: 'none' | 'dense' | 'normal';
}
// props
withDefaults(defineProps<TextInputProps>(), {
    type: 'text',
    placeholder: '',
    size: 'medium',
    margin: 'dense',
});
//state
const isFocus = ref(false);
const isUsed = ref(false);
const value = ref('');

watch([value, isFocus], (prev) => {
    isUsed.value = Boolean(prev[1] || prev[0].length > 0);
});

</script>