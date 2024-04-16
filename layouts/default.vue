<template>
    <div class="flex min-h-dvh">
        <AppBar class="fixed ml-[240px]">
        </AppBar>
        <Drawer class="w-[240px]">
            <div class="h-16 py-2 px-4">
                <NuxtLink to="/">
                    <div class="bg-slate-500 h-full"></div>
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
                            class="px-4 py-1 text-xs text-slate-400"
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
        <div class="relative flex-1 mt-16 pt-9 pb-12 bg-slate-50/[0.4]">
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
        label: '아티스트',
        group: [
            {
                label: '아티스트 1댑스',
                deps: [
                    {
                        label: '아티스트 2댑스',
                        deps: [
                            {
                                label: '아티스트 3댑스',
                                deps: [
                                    {
                                        label: '아티스트 4댑스',
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
        label: '회원',
        group: [
            {
                label: '아티스트',
                path: '/',
            },
        ],
    },
]
</script>