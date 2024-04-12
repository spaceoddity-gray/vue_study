<template>
    <div class="flex">
        <AppBar class="fixed ml-[240px]">
        </AppBar>
        <Drawer class="w-[240px]">
            
        </Drawer>
        <div class="relative flex-1 mt-16 py-6">
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

definePageMeta({
    middleware: 'auth'
});
</script>