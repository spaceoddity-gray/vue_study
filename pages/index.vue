<template>
    <div>
        컴포넌트 테스트
        <Input/>

        <Button
            type="button"
            class="p-4 h-[48px]"
            variant="contained"
            @click="a"
        >
            로그인
        </Button>
    </div>
</template>

<script setup>
    import Input from '@/components/inputs/Input';
    import Button from '@/components/inputs/Button'

    const a = () => {
        console.log('hi')
    }
</script>