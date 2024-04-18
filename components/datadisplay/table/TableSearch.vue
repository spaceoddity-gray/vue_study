<template>
    <div class="flex gap-2 mb-4">
        <Select
            label="카테고리"
            margin="none"
            :options="[{label: 'test', value: 'test'}]"
        />
        <TextInput
            label="검색"
            margin="none"
            class="w-full"
        />
        <Button
            variant="outlined"
            class="w-[100px] border-slate-500"
        >
            <div class="w-4 h-4">
                <NuxtImg
                    src="/images/icon/search-black.svg"
                    alt="search"
                />
            </div>
        </Button>
    </div>
</template>

<script setup lang="ts">
import TextInput from '@/components/inputs/TextInput.vue';
import Select from '@/components/inputs/Select.vue';
import Button from '@/components/inputs/Button.vue';
</script>