<template>
    <Contents
        :routes="[{
        pathName: '메인',
        asPath: '/'
        },
        {
            pathName: '인물 검색 및 등록',
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
                    @change="(v) => personJson.familyName = v"
                />
                <TextInput
                    label="이름"
                    name="givenName"
                    @change="(v) => personJson.givenName = v"
                />
                <Radio
                    name="gender"
                    row
                    label="성별"
                    default-value="F"
                    :options="[
                        {
                            label: '여자',
                            value: 'F'
                        },
                        {
                            label: '남자',
                            value: 'M'
                        },
                    ]"
                    @change="(v) => {personJson.gender = v as 'F' | 'M'}"
                />
                <InputCalendar
                    label="생년월일"
                    name="birthDate"
                    format="YYYY.MM.DD"
                    @change="(v) => personJson.birthDate = v.formatDate"
                />
            </div>
        </div>
    </Contents>
    <div class="flex justify-end gap-2 mt-4">
        <Button
            type="button"
            variant="contained"
            class="bg-slate-300"
            @click="$router.back()"
        >
            취소
        </Button>
        <Button
            type="button"
            variant="contained"
            @click="postPersonEvent"
        >
            등록
        </Button>
    </div>
</template>

<script setup lang="ts">
import Contents from '@/components/layout/Contents.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import Radio from '@/components/inputs/Radio.vue';
import InputCalendar from '@/components/inputs/InputCalendar.vue';
import Button from '@/components/inputs/Button.vue';

interface PersonObject {
    familyName: string;
    givenName: string;
    gender: 'F' | 'M';
    birthDate: string;
}

//route
const router = useRouter();
//state
const personJson = ref<PersonObject>({
    familyName: '',
    givenName: '',
    gender: 'F',
    birthDate: ''
}); //인물 등록 json data

const postPersonEvent = async () => {
    try {
        await $fetch('/api/person', {
            method: 'POST',
            body: personJson.value,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //success
        alert('등록에 성공하였습니다.');
        router.back();
    } catch (error) {
        console.error(error);
        alert('등록에 실패하였습니다.');
    }
}

</script>