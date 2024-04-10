<template>
    <button
        ref="btnDom"
        :type="type"
        @click="clickTriggerEvent"
        :class="[
            'relative z-10 inline-flex justify-center items-center w-auto min-w-16 align-middle leading-tight font-medium box-border no-underline',
            variantClass,
        ]"
    >
    <slot></slot>
        <span class="absolute inset-0 rounded-[inherit] overflow-hidden">
            <span
                    
                    class="absolute w-full aspect-square rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-button-ripple bg-red-600"
                ></span>
        </span>
    </button>
</template>

<script setup lang="ts">
import { watchEffect, ref, onMounted, computed } from 'vue';

interface RippleProps {
    x: string;
    y: string;
}

interface ButtonProps {
    type?: string;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
}
//props
const props = defineProps<ButtonProps>();
const emit = defineEmits(['click']);
//state
const btnDom = ref<HTMLElement | null>(null);
const rippleStack = ref<RippleProps[]>([]);
const rippleColor = ref('#fff');

//button click hanlder
const clickTriggerEvent = (e: MouseEvent) => {
    console.log('check')
    if (!btnDom.value) return;

    const g = btnDom.value.getBoundingClientRect();
    const x = e.clientX - g.left;
    const y = e.clientY - g.top;

    rippleStack.value.push({ x: x + 'px', y: y + 'px' });

    emit('click');
};

onMounted(() => {
    if (!btnDom.value) return;

    const btncolor = window.getComputedStyle(btnDom.value).backgroundColor;

    const rgb = btncolor.match(/\d+/g);
    if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        rippleColor.value = brightness > 128 ? '#535353' : '#fff';
    }
});

watchEffect(() => {
    if (rippleStack.value.length > 0) {
        // const timer = setTimeout(() => {
        // rippleStack.value = [];
        // }, 700);

        // return () => {
        // clearTimeout(timer);
        // };
    }
});

const variantClass = computed(() => ({
    'bg-slate-500': props.variant === 'contained',
    'bg-transparent': props.variant !== 'contained',
    'border border-slate-500': props.variant === 'outlined',
}));

</script>