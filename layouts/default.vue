<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <Head>
        <Title>Blip 어드민</Title>
    </Head>
    <div class="flex min-h-dvh">
        <AppBar class="fixed ml-[240px] w-[calc(100%-240px)]">
            <div class="relative w-full h-full flex items-center justify-end">
                <Button
                    type="button"
                    class="py-4 px-0"
                    @click="logout"
                >
                    로그아웃
                </Button>
            </div>
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
                        >
                    </template>
                </Menu>
            </div>
        </Drawer>
        <div class="relative flex-1 mt-16 pt-9 pb-12 bg-slate-50/[0.4] overflow-hidden">
            <Container>
                <slot/>
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
import Button from '@/components/inputs/Button.vue';
//type
import type { MenuItemObject } from '../components/navigation/Menu/MenuItem.vue';

defineNuxtComponent({
    middleware: 'auth'
});

interface AsideData {
    label: string;
    group: MenuItemObject[];
}
//router
const router = useRouter();

//로그아웃
const logout = () => {
    const token = useCookie('blip_admin_test_session');
    token.value = null;
    router.push('/login');
}

const asideJson: AsideData[]  = [
    {
        label: 'QC',
        group: [
            {
                label: '인물 관리',
                deps: [
                    {
                        label: '인물 검색 및 등록',
                        path: '/person'
                    },
                    {
                        label: '아티스트 관리',
                        path: '/artist'
                    }
                ]
            },
            {
                label: '소속사 관리',
                path: '/agency',
            },
        ],
    },
]
</script>