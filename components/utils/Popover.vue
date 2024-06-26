<template>
    <Teleport to="#teleports">
        <template
            v-if="$props.open"
        >
            <div class="fixed inset-0 z-[1300px]">
                <div 
                    :class="`opacity-0 ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}`"
                >
                    <div
                        class="fixed flex -z-[1] items-center justify-center bg-transparent inset-0 cursor-pointer"
                        @click="onClose"
                    />
                    <div
                        class="absolute z-[1] overflow-x-hidden overflow-y-auto max-w-[calc(100%-32px)] max-h-[calc(100%-32px)] outline-0 min-w-4 min-h-4 rounded-md bg-white shadow-lg"
                        :style="[
                            {left: anchorPos.horizontal + 'px'},
                            {top: anchorPos.vertical + 'px'},
                            {minWidth: anchorWidth + 'px'}
                        ]"
                    >
                        <slot/>
                    </div>
                </div>
            </div>
        </template>
    </Teleport>
</template>

<script setup lang="ts">

interface PosOrigin {
    horizontal: 'center' | 'left' | 'right' | number;
    vertical: 'bottom' | 'center' | 'top' | number;
}
//type
interface PopoverProps {
    open?: boolean;
    anchorEl?: HTMLElement | null;
    anchorOrigin?: PosOrigin;
    transformOrigin?: PosOrigin;
}
interface PopoverEmits {
    (event: 'close-popover'): void;
}
//props
const props = withDefaults(defineProps<PopoverProps>(), {
    anchorOrigin: () => {
        return {
            horizontal: 'left',
            vertical: 'top'
        }
    },
    transformOrigin: () => {
        return {
            horizontal: 'left',
            vertical: 'top'
        }
    },
    anchorEl: undefined,
});
//emit
const emit = defineEmits<PopoverEmits>()
//state
const isVisible = ref(Boolean(props.open)); //popover 활성화 여부
const anchorWidth = ref(0);
const anchorPos = ref({ vertical: 0, horizontal: 0 });

//close event
const onClose = () => {
    isVisible.value = false;
    setTimeout(() => {
        emit('close-popover');
    }, 170);
}

//화면 size 시 위치값 자동으로 업데이트
const updatePosition = () => {
    if(props.anchorEl)
    {
        const el = props.anchorEl;
        const origin = props.anchorOrigin;

        const ael = el.getBoundingClientRect();

        let vertical = ael.top;
        let horizontal = ael.left;

        switch (origin.vertical) {
            case 'bottom':
                vertical = vertical + ael.height;
                break;
            case 'center':
                vertical = vertical + (ael.height/2);
                break;
            default:
                vertical = ael.top;
                break;
        }

        switch (origin.horizontal) {
            case 'right':
                horizontal = horizontal + ael.width;
                break;
            case 'center':
                horizontal = horizontal + (ael.width/2);
                break;
            default:
                horizontal = ael.left;
                break;
        }

        anchorWidth.value = ael.width;
        anchorPos.value = {
            vertical,
            horizontal,
        }
    }
}

//document scroll control
const updateScrollStyle = (isOpen: boolean) => {
    const el = document.body;

    if(isOpen) {
        isVisible.value = true;
        updatePosition();

        if(window.getComputedStyle(el).overflow !== 'hidden')
        {
            el.style.overflow ='hidden';
        }
    }
    else
    {
        el.style.removeProperty('overflow');
    }
}

//first mount
onMounted(() => {
    updateScrollStyle(props.open);
})

//use effect
watch(() => props.open, (newOpen) => {
    updateScrollStyle(newOpen);
});

watch(() => props.anchorEl, () => {
    if(props.anchorEl) {
        updatePosition();
        window.addEventListener('resize', updatePosition);
    }
});

onUnmounted(() => {
    document.body.style.removeProperty('overflow');
    window.removeEventListener('resize', updatePosition);
});

</script>