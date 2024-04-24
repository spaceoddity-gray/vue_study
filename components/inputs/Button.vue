<template>
    <button
        ref="btnDom"
        :type="type"
        :disabled="disabled"
        :class="[
            'relative select-none default-button',
            variant === 'contained' ? 'default-button-contained' : variant === 'outlined' && 'default-button-outlined' 

        ]"
        @click="clickTriggerEvent"
    >
        <slot></slot>
        <span class="absolute inset-0 z-0 rounded-[inherit] overflow-hidden pointer-events-none">
            <span
                v-for="(ripple, index) in rippleStack"
                :key="index"
                class="absolute w-full aspect-square rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-button-ripple"
                :style="{ top: ripple.y, left: ripple.x, backgroundColor: rippleColor }"
            ></span>
        </span>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface RippleProps {
    x: string;
    y: string;
}

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
}
//props
const {
    type,
    variant,
    disabled,
} = defineProps<ButtonProps>();
const emit = defineEmits(['click']);
//state
const btnDom = ref<HTMLElement | null>(null);
const rippleStack = ref<RippleProps[]>([]);
const rippleColor = ref('#fff');

let debounceTimer: null | NodeJS.Timeout = null; // 디바운스 타이머를 저장할 변수

//button click hanlder
const clickTriggerEvent = (e: MouseEvent) => {
    if (!btnDom.value) return;

    const g = btnDom.value.getBoundingClientRect();
    const x = e.clientX - g.left;
    const y = e.clientY - g.top;

    rippleStack.value.push({ x: x + 'px', y: y + 'px' });

    emit('click');

    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    // 0.7초 동안 추가 클릭이 없으면 rippleStack 초기화
    debounceTimer = setTimeout(() => {
        rippleStack.value = [];
    }, 700);
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

</script>