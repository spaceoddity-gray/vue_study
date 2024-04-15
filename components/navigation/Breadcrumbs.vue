<template>
    <nav>
        <ol class="flex flex-wrap items-center">
            <template
                v-for="({ pathName, asPath }, index) in routes"
            >
                <li>
                    <NuxtLink
                        v-if="index + 1 < routes.length"
                        :to="asPath"
                    >
                        <span class="text-slate-400">
                            {{ pathName }}
                        </span>
                    </NuxtLink>
                    <span v-else>
                        {{ pathName }}
                    </span>
                </li>
                <li
                    v-if="index + 1 < routes.length"
                    class="flex mx-2 select-none text-slate-400"
                >
                    ›
                </li>
            </template>
        </ol>
    </nav>
</template>

<script setup lang="ts">

interface BreadcrumbsRouteObject {
    pathName: string;
    asPath: string;
}
interface BreadcrumbsProps {
    routes: BreadcrumbsRouteObject[];
}
//props
const {
    routes,
} = defineProps<BreadcrumbsProps>();

</script>