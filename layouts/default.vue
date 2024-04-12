<template>
    <section>
        <h1>메인페이지 레이아웃</h1>
        <slot />
    </section> 
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>