<template>
    <div class="flex justify-between items-center">
        <div>
            <h6 class="font-semibold">
                {{ title || '타이틀' }}
                <p
                    v-if="subTitle"
                    class="mt-0.5 text-sm font-light text-slate-400">
                    {{ subTitle }}
                </p>
            </h6>
            <Breadcrumbs
                class="mt-4"
                :routes="routes"
            />
        </div>
        <div v-if="buttons && buttons.length > 0" class="flex gap-2">
            <template v-for="(btn) in buttons">
                <Button
                    :type="btn.type"
                    :variant="btn.variant"
                    :disabled="btn.disabled"
                    @click="(e) => clickEvent(e, btn.click)"
                >
                    {{ btn.label }}
                </Button>
            </template>
        </div>
    </div>
    <div class="relative w-full mt-10 px-4 py-6 box-border shadow-md bg-white">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import Breadcrumbs, { type BreadcrumbsProps } from '../navigation/Breadcrumbs.vue';
import Button from '../inputs/Button.vue';
//type
import type { ButtonProps } from '../inputs/Button.vue';

interface ContentsButtonsObject extends ButtonProps {
    label?: string;
    click?: () => void;
}

interface ContentsProps extends BreadcrumbsProps {
    title?: string;
    subTitle?: string;
    buttons?: ContentsButtonsObject[];
}

const {
    routes,
    title,
    buttons,
} = defineProps<ContentsProps>();

const clickEvent = (e: any, callbackEvent?: (e: any) => void) => {
    if(typeof callbackEvent === 'function') {
        callbackEvent(e)
    }
}

</script>