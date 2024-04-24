<template>
    <div class="relative">
        <div class="w-full px-4 text-sm">
            <div class="flex gap-4 min-h-14 overflow-hidden">
                <div class="flex-1"></div>
                <div class="flex items-center gap-4">
                    <Select
                        label="페이지 표시 수"
                        margin="none"
                        size="small"
                        class="min-w-[140px]"
                        :options="[{label: '10', value: '10'}]"
                    />
                    <div class="flex items-center">
                        <p class="mr-4 text-sm">
                            <span class="text-slate-400">1-10</span>
                            <span class="mx-1">of</span>
                            <span>500</span>
                        </p>
                        <Button
                            class="p-0 h-6 min-w-6"
                        >
                            <div class="h-3 w-3">
                                <NuxtImg
                                    src="/images/icon/arrow-double-left-thin.svg"
                                    alt="first"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </Button>
                        <Button
                            class="p-0 h-6 min-w-6"
                        >
                            <div class="h-3 w-3">
                                <NuxtImg
                                    src="/images/icon/arrow-left-thin-black.svg"
                                    alt="prev"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </Button>
                        <Button
                            class="p-0 h-6 min-w-6"
                        >
                            <div class="h-3 w-3">
                                <NuxtImg
                                    src="/images/icon/arrow-right-thin-black.svg"
                                    alt="next"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </Button>
                        <Button
                            class="p-0 h-6 min-w-6"
                        >
                            <div class="h-3 w-3">
                                <NuxtImg
                                    src="/images/icon/arrow-double-right-thin.svg"
                                    alt="last"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/inputs/Button.vue';
import Select from '@/components/inputs/Select.vue';
//type
interface TableFooterProps {
    totalPage?: number;
    currentPage?: number;
}
//props
const {

} = defineProps<TableFooterProps>();
//state

</script>