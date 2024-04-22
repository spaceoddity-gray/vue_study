<template>
    <Contents
        :routes="[{
        pathName: '메인',
        asPath: '/'
        },
        {
            pathName: '인물 관리',
            asPath: '/person'
        },
        {
            pathName: '인물 등록',
        }
    ]"
        title="인물 등록"
        sub-title="인물을 등록해주세요."
    >
        <div>
            <div class="grid gap-3">
                <TextInput
                    label="성"
                    name="familyName"
                />
                <TextInput
                    label="이름"
                    name="givenName"
                />
                <Radio
                    name="gender"
                    row
                    label="성별"
                    default-value="female"
                    :options="[
                        {
                            label: '여자',
                            value: 'female'
                        },
                        {
                            label: '남자',
                            value: 'male'
                        },
                    ]"
                />
                <InputCalendar
                    label="생년월일"
                    name="birthDate"
                />
            </div>
        </div>
    </Contents>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import Radio from '@/components/inputs/Radio.vue';
import InputCalendar from '@/components/inputs/InputCalendar.vue';
import Button from '@/components/inputs/Button.vue';

//route
const router = useRouter();

</script>