<template>
    <div class="relative w-full">
        <TextInput
            :name="name"
            :label="label"
            :value="imgurl"
            class="w-full"
            @change="updateImageEvent"
        />
        <div :style="{width: imgWidth + 'px'}">
            <div
                class="w-full"
                :style="{aspectRatio: ratio}"
            >
                <template v-if="imgError">
                    <div
                        class="flex flex-col w-full h-full items-center justify-center bg-slate-200 text-slate-400"
                    >
                    <div class="max-w-14">
                        <HideImage/>
                    </div>
                    <p class="mt-1 text-sm">No Image</p>
                    </div>
                </template>
                <template v-else>
                    <img
                        :src="imgurl"
                        class="w-full h-full"
                        :alt="alt"
                        :style="{objectFit: objectFit}"
                    >
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue';
import HideImage from '../icons/HideImage.vue';

interface TextInputImageEmits {
    (event: 'error' | 'change', src: string): void;
}

interface TextInputImageProps {
    label: string;
    name: string;
    imgWidth?: number;
    defaultSrc?: string;
    alt?: string;
    ratio?: string;
    objectFit?: 'cover' | 'contain'
}

//props
const props = withDefaults(defineProps<TextInputImageProps>(), {
    defaultSrc: undefined,
    src: undefined,
    alt: undefined,
    imgWidth: 300,
    ratio: '16/9',
    objectFit: 'cover',
});

//emit
const emit = defineEmits<TextInputImageEmits>();

//state
const imgurl = ref<string | undefined>(props.defaultSrc); //이미지 주소
const imgError = ref<boolean>(!props.defaultSrc); //이미지 에러 상태

//이미지 정보 업데이트
const updateImageEvent = (v: string) => {
    imgurl.value = v;
}

const validateImage = (src: string = '') => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
        imgError.value = false;
        emit('change', src);
    }
    img.onerror = () => {
        imgError.value = true;
        emit('error', src);
    }
}

onMounted(() => {
    validateImage(imgurl.value)
})

watch(imgurl, (newVal) => {
    console.log(newVal)
    validateImage(newVal)
});


</script>