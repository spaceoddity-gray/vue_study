<template>
    <div class="flex min-h-dvh">
        <AppBar class="fixed ml-[240px]">
        </AppBar>
        <Drawer class="w-[240px]">
            <div class="h-16 py-3 px-4">
                <NuxtLink to="/">
                    <div class="h-full flex justify-center items-center">
                        <NuxtImg
                            src="/images/logo_blip.svg"
                            alt="blip-logo"
                            class="h-full w-full object-contain"
                            sizes="200px"
                        />
                    </div>
                </NuxtLink>
            </div>
            <div class="flex-1 overflow-auto border-r border-slate-200">
                <Menu>
                    <template
                        v-for="({label, group}, index) in asideJson"
                        :key="index"
                    >
                        <h4
                            v-if="label && label !== ''"
                            class="px-4 py-1 text-[10px] text-slate-400"
                        >
                            {{label}}
                        </h4>
                        <template
                            v-for="(item, itemIndex) in group"
                            :key="itemIndex"
                        >
                            <MenuItem
                                :label="item.label"
                                :deps="item?.deps"
                                :path="item?.path"
                            />
                        </template>
                        <hr
                            v-if="index + 1 < asideJson.length"
                            class="my-2"
                        />
                    </template>
                </Menu>
            </div>
        </Drawer>
        <div class="relative flex-1 mt-16 pt-9 pb-12 bg-slate-50/[0.4] overflow-hidden">
            <Container>
                <slot></slot>
            </Container>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppBar from '../components/surfaces/AppBar.vue';
import Drawer from '../components/navigation/Drawer.vue';
import Container from '../components/layout/Container.vue';
import Menu from '../components/navigation/Menu/Menu.vue';
import MenuItem from '../components/navigation/Menu/MenuItem.vue';
//type
import type { MenuItemObject } from '../components/navigation/Menu/MenuItem.vue';

defineNuxtComponent({
    middleware: 'auth'
});

interface AsideData {
    label: string;
    group: MenuItemObject[];
}

const asideJson: AsideData[]  = [
    {
        label: 'TEST',
        group: [
            {
                label: 'DEPS 1',
                deps: [
                    {
                        label: 'DEPS 2',
                        deps: [
                            {
                                label: 'DEPS 3',
                                deps: [
                                    {
                                        label: 'DEPS 4',
                                        path: '/',
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ],
    },
    {
        label: 'PERSON',
        group: [
            {
                label: '인물 관리',
                path: '/person',
            },
            {
                label: '아티스트 관리',
                path: '/artist',
            },
        ],
    },
]
</script>