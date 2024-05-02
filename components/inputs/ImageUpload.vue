<template>
    <div class="relative overflow-hidden">
        <label
            v-if="label && label !== ''"
            :for="name"
            class="block mb-2 text-slate-500"
        >
                {{ label }}
        </label>
        <div
            class="relative flex border border-dashed border-slate-300 rounded-md box-border overflow-hidden"
            :style="`width: ${width}px; height: ${height}px`"
        >
            <div class="relative flex items-center justify-center w-full h-full cursor-pointer bg-slate-100">
                <div>
                    <div class="w-8 h-8 m-auto text-slate-400">
                        <FileUploadIcon/>
                    </div>
                    <p
                        v-if="placeholder !== ''"
                        class="text-slate-400 mt-0.5 text-xs"
                    >
                        {{ placeholder }}
                    </p>
                </div>
                <input
                    type="file"
                    :name="name"
                    :multiple="multiple"
                    class="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                    @change="updateFile"
                >
            </div>
        </div>
    </div>
    <div class="mt-3">
        <p class="text-xs text-slate-400">Image List</p>
        <ul class="flex flex-wrap mt-2">
            <template v-if="currentFiles">
                <li
                    v-for="(file, fileIndex) in currentFiles"
                    :key="fileIndex"
                    class="relative p-2 box-content overflow-hidden"
                    :style="`width: ${width}px; height: ${height}px`"
                >
                    <div class="bg-slate-100 h-full overflow-hidden">
                        <Button
                            type="button"
                            variant="contained"
                            class="absolute z-[1] flex items-center justify-center top-0 right-0 min-w-4 h-4 p-0"
                            @click="() => removeImageList(fileIndex)"
                        >
                            <CloseIcon class="w-3 h-3"/>
                        </Button>
                        <NuxtImg
                            :src="previewImage(file)"
                            :alt="`listImage-${fileIndex}`"
                            class="w-full h-full"
                            :style="`objectFit: ${objectFit}`"
                        />
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import FileUploadIcon from '../icons/FileUploadIcon.vue';
import Button from './Button.vue';
import CloseIcon from '../icons/CloseIcon.vue';

interface ImageUploadProps {
    width?: number;
    height?: number;
    name: string;
    label?: string;
    placeholder?: string;
    dragdrop?: boolean; //드레그 앤 드롭 업로드 여부
    objectFit?: 'contain' | 'cover'; //이미지 object fit 여부
    multiple?: boolean; //다중 업로드 여부
}

const props = withDefaults(defineProps<ImageUploadProps>(), {
    width: 300,
    height: 130,
    objectFit: 'contain',
});
//state
const currentFiles = ref<FileList | null>(null);

const previewImage = (file: File) => {
    return URL.createObjectURL(file);
}

//이미지 삭제
const removeImageList = (index: number) => {
    const dt = new DataTransfer();

    if(currentFiles.value) {
        Array.from(currentFiles?.value).filter((_,i) => {
            return i !== index
        }).forEach(file => {
            dt.items.add(file);
        })

        currentFiles.value = dt.files;
    }
}

//
const updateFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    currentFiles.value = target.files;
}
</script>