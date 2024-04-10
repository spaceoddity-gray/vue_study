<template>
    <div>
        컴포넌트 테스트
        <Input/>

        <Button type="button" class="p-4" @click="a">
            ?????
        </Button>
    </div>
</template>

<script setup>
    import Input from '@/components/inputs/Input';
    import Button from '@/components/inputs/Button'

    const a = () => {
        alert('hi')
        console.log('hi')
    }
</script>