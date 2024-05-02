<template>
    <div class="relative inline-flex flex-col">
        <label v-if="label" class="relative text-slate-500">{{ label }}</label>
        <div
            class="flex"
            :style="[
                row ? 'flex-flow: row wrap' : 'flex-flow: column wrap'
            ]"
        >
            <template v-for="(option, index) in options" :key="index">
                <label class="inline-flex items-center cursor-pointer align-middle">
                <span class="relative inline-flex items-center justify-center bg-transparent box-border select-none align-middle p-[9px] rounded-[50%]">
                    <input
                        type="radio"
                        class="absolute cursor-[inherit] opacity-0 w-full h-full top-0 left-0 m-0 p-0 z-[1]"
                        :name="name"
                        :checked="option.value === selectedValue"
                        :value="option.value"
                        @change="updateSelectedValue(option.value)"
                    >
                    <span
                        :class="[
                            'relative flex',
                            option.value === selectedValue ? 'text-primary' : ''
                        ]"
                    >
                        <svg
                            class="inline-block w-6 h-6 select-none fill-current"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="RadioButtonUncheckedIcon"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        </svg>
                        <svg
                            v-if="option.value === selectedValue"
                            class="absolute inline-block w-6 h-6 select-none fill-current left-0 transition-transform"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="RadioButtonCheckedIcon"
                        >
                            <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"/>
                        </svg>
                    </span>
                </span>
                <span>{{ option.label }}</span>
            </label>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

interface RadioEmits {
    (event: 'change', selectValue: string | number): void;
}

interface RadioRenderObject {
    label: string;
    value: string | number;
}

interface RadioProps {
    name: string;
    options: RadioRenderObject[];
    label?: string;
    defaultValue?: string | number;
    row?: boolean;
}

const props = defineProps<RadioProps>();
//state
const selectedValue = ref(props.defaultValue || (props.options.length > 0 ? props.options[0].value : null));

const emit = defineEmits<RadioEmits>();

const updateSelectedValue = (newValue: string | number) => {
    selectedValue.value = newValue;
    emit('change', newValue);
}
</script>