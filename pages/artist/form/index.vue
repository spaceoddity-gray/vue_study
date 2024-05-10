<template>
    <Contents
        :routes="[{
        pathName: '메인',
        asPath: '/'
        },
        {
            pathName: '아티스트 관리',
            asPath: '/artist'
        },
        {
            pathName: '아티스트 등록',
        }
    ]"
        title="아티스트 등록"
        sub-title="아티스트를 등록해주세요."
    >
        <div>
            <div class="grid gap-3">
                <Radio
                    name="type"
                    row
                    label="아티스트 타입"
                    default-value="S"
                    :options="[
                        {
                            label: '솔로',
                            value: 'S'
                        },
                        {
                            label: '그룹',
                            value: 'G'
                        },
                    ]"
                />
                <TextInput
                    label="이름"
                    name="name"
                />
                
                <InputCalendar
                    label="데뷔일"
                    name=""
                    format="YYYY.MM.DD"
                />
                <Switch
                    label="아티스트목록 표시여부"
                    name="indexVisible"
                />
                <Switch
                    label="케이팝 가수여부"
                    name="isKpop"
                />
                <Switch
                    label="음악차트 크롤링 여부"
                    name="isMusicChartCrawl"
                />
                <TextInput
                    label="경로"
                    name="path"
                />
                <TextInputImage
                    label="아티스트 이미지"
                    name="artistImage"
                    default-src="https://image.bugsm.co.kr/artist/images/1000/200224/20022492.jpg"
                />
                <TextInputImage
                    label="썸네일 이미지"
                    name="thumbnail"
                />
                <TLAgency
                    label="소속사"
                    unique-index-key="id"
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
import Switch from '@/components/inputs/Switch.vue';
import TextInputImage from '@/components/inputs/TextInputImage.vue';
import TLAgency from '@/components/inputs/transferList/template/TLAgency.vue';

interface ArtistFormObject {
    type: string,
    name: string,
    gender: string,
    personId: number,
    debutDate: 0,
    indexVisible: number,
    isKpop: number,
    isMusicChartCrawl: number,
    path: string,
    names: [
        {
        indexId: 0,
        name: string
        }
    ],
    agencies: [
        {
        agencyId: 0
        }
    ],
    profileImages: [
        {
        name: string,
        url: string,
        width: 0,
        height: 0
        }
    ],
    groupMemberHistories: [
        {
        memberArtistId: 0,
        joinDate: 0,
        leaveDate: 0
        }
    ]
}

//route
const router = useRouter();
//state
const personJson = ref<ArtistFormObject>(); //인물 등록 json data

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