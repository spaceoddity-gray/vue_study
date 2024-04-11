<script setup lang="ts">
import Button from '../components/inputs/Button.vue';
import TextInput from '../components/inputs/TextInput.vue';

definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <Head>
        <Title>로그인</Title>
    </Head>
    <div class="py-12">
        <div class="max-w-[400px] m-auto p-4 bg-white rounded-md shadow">
            <form>
                <TextInput label="email" class="w-full"/>
                <TextInput label="password" type="password"/>
                <Button
                    type="button"
                    variant="contained"
                    class="w-full h-[48px] rounded font-bold text-white bg-primary-gradient"
                >
                    로그인
                </Button>
            </form>
        </div>
    </div>
</template>