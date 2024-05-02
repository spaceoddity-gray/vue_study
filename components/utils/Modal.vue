<template>
    <Teleport to="#teleports">
        <template v-if="isVisible">
            <div
                :class="[
                    'fixed w-full h-full z-[1300] inset-0 opacity-0',
                    `${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`
                ]"
            >
                <div
                    class="fixed flex items-center justify-center inset-0 bg-black/[0.5] -z-[1]"
                    @click="onClose"
                >
                </div>
                <slot></slot>
            </div>
        </template>
    </Teleport>
</template>

<script setup lang="ts">

interface ModalEmits {
    (event: 'close-modal'): void;
}

interface ModalProps {
    open?: boolean;
}

//emit
const emit = defineEmits<ModalEmits>()
//props
const props = defineProps<ModalProps>();
//state
const isOpen = ref<boolean>(Boolean(props.open));
const isVisible = ref<boolean>(Boolean(props.open));
const ableClick = ref(true);

//close event
const onClose = () => {
    if(ableClick)
    {
        emit('close-modal');
    }
}

//document scroll control
const updateScrollStyle = (isOpenState: boolean) => {
    const el = document.body;

    if(isOpenState) {
        if(window.getComputedStyle(el).overflow !== 'hidden')
        {
            el.style.overflow ='hidden';
        }
    }
    else
    {
        el.style.removeProperty('overflow');
    }
};

//first mount
onMounted(() => {
    updateScrollStyle(props.open);
});

//use effect
watch(() => props.open, (newOpen) => {
    isOpen.value = newOpen;
});
watch(isOpen, (newOpen) => {
    if(!newOpen) {
        ableClick.value = false;
        setTimeout(() => {
            isVisible.value = newOpen;
            ableClick.value = true;
        }, 150);
    } else {
        isVisible.value = newOpen;
    }
});

onUnmounted(() => {
    document.body.style.removeProperty('overflow');
});

</script>