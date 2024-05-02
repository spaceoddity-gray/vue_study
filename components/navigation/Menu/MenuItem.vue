<template>
    <li
        :class="[
            `relative box-border whitespace-nowrap ${'hover:bg-slate-100/[0.4]'}`,
        ]"
    >
        <NuxtLink
            v-if="typeof path === 'string'"
            :to="path"
        >
            <div :class="[`flex items-center py-[6px] pr-6`]" :style="`padding-left: ${((depsIndex - 1)/2) + 1.5}rem`">
                <div class="flex-1">
                    <span class="text-sm">
                        {{ label }}
                    </span>
                </div>
                <div class="flex items-center justify-center w-5 h-5">
                    ›
                </div>
            </div>
        </NuxtLink>
        <template
            v-else-if="deps"
        >
            <Accordion
                @callback-state="updateOpen"
            >
                <template #summary>
                    <div class="flex items-center py-[5px] pr-6" :style="`padding-left: ${((depsIndex - 1)/2) + 1.5}rem`">
                        <div class="flex-1">
                            <span class="text-sm">
                                {{ label }}
                            </span>
                        </div>
                        <div
                            :class="[
                                'flex items-center justify-center w-5 h-5 transition-transform',
                                isOpen ? 'rotate-[-90deg]' : 'rotate-[90deg]'
                            ]"
                        >
                            ›
                        </div>
                    </div>
                </template>
                <template #details>
                    <ul
                        :class="[
                            `bg-slate-400/[0.1]`,
                        ]"
                    >
                        <MenuItem
                            v-for="(item, index) in deps"
                            :key="depsIndex + '-' + index"
                            :label="item.label"
                            :deps="item?.deps"
                            :path="item?.path"
                            :deps-index="(Number(depsIndex) + 1)"
                        />
                    </ul>
                </template>
            </Accordion>
        </template>
        <template
            v-else
        >
            <div class="flex items-center py-[5px] pl-6 pr-6">
                <div class="flex-1">
                    <span class="text-sm">
                        {{ label }}
                    </span>
                </div>
            </div>
        </template>
    </li>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue';
import Accordion from '@/components/surfaces/Accordion.vue';

export interface MenuItemObject {
    label: string;
    path?: string;
    deps?: MenuItemObject[];
}

export interface MenuItemProps extends MenuItemObject {
    depsIndex?: number;
}

const {
    label,
    path,
    depsIndex,
    deps,
} = withDefaults(defineProps<MenuItemProps>(), {
    depsIndex: 1,
});
//state
const isOpen = ref(false);

const updateOpen = (openState: boolean) => {
    isOpen.value = openState
}

</script>