<template>
    <Contents
        :routes="[{
        pathName: '메인',
        asPath: '/'
        },
        {
            pathName: '소속사 관리',
            asPath: '/agency'
        },
        {
            pathName: '소속사 등록',
        }
    ]"
        title="소속사 등록"
        sub-title="소속사를 등록해주세요."
    >
        <div>
            <div class="grid gap-3">
                <TextInput
                    label="소속사 명"
                    name="name"
                    @change="(v) => agencyJson.name = v"
                />
                <TextInput
                    label="서브 표시"
                    name="description"
                    @change="(v) => agencyJson.description = v"
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
import Button from '@/components/inputs/Button.vue';

interface AgencyObject {
    name: string;
    description: string;
}

export interface  AgencyDBObject extends AgencyObject {
    id?: number;
    regTime: Date;
}

//route
const router = useRouter();
//state
const agencyJson = ref<AgencyObject>({
    name: '',
    description: '',
}); //인물 등록 json data

const postPersonEvent = async () => {
    try {
        await $fetch('/api/agency', {
            method: 'POST',
            body: agencyJson.value,
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