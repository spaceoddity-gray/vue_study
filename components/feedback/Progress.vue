<template>
    <div
        v-if="size"
        class="inline-block"
        :style="`width: ${size}px; height: ${size}px; animation: rotate 1.4s linear infinite;`"
    >
        <svg 
            :width="size" 
            :height="size" 
            :viewBox="`0 0 ${size} ${size}`"
            class="block stroke-current"
            >
            <circle
                :cx="radius"
                :cy="radius"
                :r="round"
                :stroke-width="stroke"
                stroke="currentColor"
                fill="none"
                :stroke-dasharray="offset"
                :stroke-dashoffset="offset"
                :style="animationStyle"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">

interface ProgressProps {
    size?: number;
    stroke?: number;
}

const props = withDefaults(defineProps<ProgressProps>(), {
    size: 40,
    stroke: 4,
});

const radius = computed(() => props.size / 2);
const round = computed(() => radius.value - (props.stroke / 2));
const offset = computed(() => Math.round(2 * Math.PI * round.value));

const animationStyle = computed(() => `
    --offset: ${offset.value};
    --unoffset: ${offset.value * -1};
    stroke-dashoffset: ${offset.value};
    animation: progress ${props.size * 0.035}s ease-in-out infinite;
`);

</script>

<style>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes progress {
    0% {
        stroke-dashoffset: var(--offset);
    }
    50% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: var(--unoffset);
    }
}
</style>