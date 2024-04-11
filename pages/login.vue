<template>
    <Head>
        <Title>로그인</Title>
    </Head>
    <div class="py-12">
        <div class="max-w-[360px] m-auto p-4 bg-white rounded-md shadow">
            <h3 class="text-center font-bold text-primary">Login</h3>
            <form
                class="mt-4"
                v-on:submit="submitForm"
            >
                <div class="grid gap-1">
                    <TextInput
                        label="email"
                        class="w-full"
                        placeholder="이메일을 입력해주세요."
                    />
                    <TextInput
                        label="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        class="w-full"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    class="w-full h-[48px] mt-6 rounded font-bold text-white bg-primary-gradient"
                >
                    로그인
                </Button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../components/inputs/Button.vue';
import TextInput from '../components/inputs/TextInput.vue';

definePageMeta({
    layout: 'auth'
});

const submitForm = (e: Event) => {
    e.preventDefault();
}
</script>