<template>
    <Head>
        <Title>로그인</Title>
    </Head>
    <div class="py-12">
        <div class="max-w-[360px] m-auto p-4 bg-white rounded-md shadow">
            <h3 class="text-center font-bold text-primary">Login</h3>
            <form
                class="mt-4"
                v-on:submit.prevent="submitForm"
            >
                <div class="grid gap-1">
                    <TextInput
                        label="userName"
                        name="username"
                        class="w-full"
                        placeholder="유저명을 입력해주세요."
                    />
                    <TextInput
                        label="password"
                        name="password"
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
import Button from '@/components/inputs/Button';
import TextInput from '@/components/inputs/TextInput';

definePageMeta({
    layout: 'auth'
});

const router = useRouter();

const submitForm = async (e: Event) => {
    try {
        const data = e.target as HTMLFormElement | undefined;
        const formdData = new FormData(data);
        const formDataObject = Object.fromEntries(formdData.entries());
    
        const res = await $fetch('/api/user/session', {
            method: 'POST',
            body: formDataObject,
            headers: {
                'Content-Type': 'application/json'
            }
        }) as { sessionId: string };

        const token = useCookie('login');
        token.value = res.sessionId
        router.push('/');
        console.log(formDataObject); // 객체를 콘솔에 출력
    } catch (error) {
        console.error(error)
    }
}
</script>