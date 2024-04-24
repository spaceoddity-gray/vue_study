<template>
    <label class="inline-flex flex-col justify-center align-middle cursor-pointer">
        <template v-if="label">
            <div class="text-slate-500">
                {{ label }}
            </div>
        </template>
        <div>
            <span class="relative inline-flex w-[42px] h-[26px] m-2 overflow-hidden box-border z-0 shrink-0">
                <span
                    :class="[
                        'inline-flex items-center justify-center box-border bg-transparent outline-none select-none absolute rounded-[50%] top-0 left-0 z-[1] text-white m-[2px] p-0 transition-transform duration-300',
                        isChecked ? 'translate-x-4' : 'translate-x-0'
                    ]"
                >
                    <input
                        type="checkbox"
                        :name="name"
                        class="absolute cursor-[inherit] opacity-0 h-full top-0 left-0 z-[1]"
                        :checked="isChecked"
                        @change="updateChecked"
                    />
                    <span class="bg-current rounded-[50%] w-[22px] h-[22px] box-border shadow-md">
    
                    </span>
                </span>
                <span
                    :class="[
                        'w-full h-full -z-[1] rounded-[13px] transition duration-300',
                        isChecked ? 'bg-primary' : 'bg-slate-200'
                    ]"
                >
                </span>
            </span>
        </div>
    </label>
</template>

<script setup lang="ts">
interface SwitchEmits {
    (event: 'change', isChecked: boolean,): void;
}

interface SwitchProps {
    name: string;
    label?: string;
    defaultChecked?: boolean;
}
//props
const props = defineProps<SwitchProps>();
//props
const emit = defineEmits<SwitchEmits>();

//state
const isChecked = ref<boolean>(Boolean(props.defaultChecked));

const updateChecked = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target) {
        isChecked.value = target.checked;
    }
}

watch(isChecked, (isNew, isOld) => {
    if(isNew !== isOld) {
        emit('change', isChecked.value);
    }
})
</script>