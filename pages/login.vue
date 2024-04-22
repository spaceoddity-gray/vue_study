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
                        label="User Name"
                        name="username"
                        class="w-full"
                        placeholder="유저명을 입력해주세요."
                    />
                    <TextInput
                        :type="isPasswordText ? 'text' : 'password'"
                        label="Password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요."
                        class="w-full" 
                    >
                        <template #endAdornment>
                            <Button
                                type="button"
                                class="p-0 min-w-0 w-6"
                                @click="updatePasswordEvent"
                            >
                                    <template v-if="isPasswordText">
                                        <EyeBlind/>
                                    </template>
                                    <template v-else>
                                        <EyeVisible/>
                                    </template>
                            </Button>
                        </template>
                    </TextInput>
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
import Button from '@/components/inputs/Button.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import EyeVisible from '@/components/icons/EyeVisible.vue';
import EyeBlind from '@/components/icons/EyeBlind.vue';

definePageMeta({
    layout: 'auth'
});
//route
const router = useRouter();
//state
const isPasswordText = ref(false); //비밀번호 표시

//비멀번호 표시 업데이트
const updatePasswordEvent = () => {
    isPasswordText.value = !isPasswordText.value
}

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
    } catch (error) {
        alert('로그인에 실패하였습니다.')
        console.error(error)
    }
}
</script>