<template>
    <div>
        <div
            class="cursor-pointer"
            @click="toggle"
            >
            <slot name="summary"/>
        </div>
        <div
            ref="detailsContainer"
            class="transition-[height] overflow-hidden"
            :style="{height: isTransitionEnd ? 'auto' : isOpen ? `${detailsHeight}px` : '0px'}"
        >
        <div ref="detailsContent">
            <slot name="details"/>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//type
type divRef = HTMLElement | null;
//emit
const emit = defineEmits(['callback-state']);
//state
const isTransitionEnd = ref(false); //트렌지션 종료 체크
const isOpen = ref(false); //열고 닫기 여부
const detailsContainer = ref<divRef>(null);
const detailsContent = ref<divRef>(null);
let detailsHeight = 0;

const toggle = async () => {
    isOpen.value = !isOpen.value;
    isTransitionEnd.value = false;
    if (isOpen.value && detailsContent.value) {
        // 열 때마다 detailsContent의 높이를 업데이트
        await nextTick();
        detailsHeight = detailsContent.value.scrollHeight;

        setTimeout(() => {
            isTransitionEnd.value = true;
        }, 180);
    }
};

// 컴포넌트가 마운트될 때 처음 높이를 계산
onMounted(async () => {
    if (detailsContent.value) {
        await nextTick();
        detailsHeight = detailsContent.value.scrollHeight;
    }
    emit('callback-state', isOpen.value);
});

watch(isOpen, () => {
    emit('callback-state', isOpen.value);
})

</script>