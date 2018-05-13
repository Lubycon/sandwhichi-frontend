<template>
    <div class="project-register-step01-wrapper">
        <b-form @submit.prevent="moveNextStep">
            <!-- 프로젝트 썸네일 등록 폼 -->
            <b-form-group label="프로젝트 썸네일">
                <div class="project-register-step01-wrapper--image-wrapper is-large">
                    <image-preview></image-preview>
                </div>
            </b-form-group>
            <!--// 프로젝트 썸네일 등록 폼 -->

            <!-- 프로젝트 이름 등록 폼 -->
            <b-form-group label="프로젝트 이름">
                <b-form-input type="text"
                              name="projectName"
                              placeholder="멋진 이름이 하나 정돈 필요할 것 같아요"
                              v-model="projectTitle"/>
            </b-form-group>

            <!--// 프로젝트 이름 등록 폼 -->

            <!-- 프로젝트 이름 등록 폼 -->
            <b-form-group label="프로젝트 내용">
                <b-form-select v-model="selectedCategory" :options="projectCategory"></b-form-select>
            </b-form-group>
            <!--// 프로젝트 이름 등록 폼 -->
            <div class="project-register-step01-wrapper--description-wrapper">
                <textarea placeholder="자유롭게 설명해 주세요."></textarea>
            </div>
            <button type="button" class="project-register-step01-wrapper--add-question-button">+ 질문 추가</button>
            <!-- 프로젝트 이미지 등록 폼 -->
            <b-form-group label="프로젝트 썸네일">
                <div class="project-register-step01-wrapper--image-wrapper is-small">
                    <span>+</span>
                    <div>
                        <b-form-file></b-form-file>
                    </div>
                </div>
            </b-form-group>
            <!--// 프로젝트 이미지 등록 폼 -->
            <b-form-group label="동영상 링크">
                <b-form-input type="text"
                              name="videoAddress"
                              placeholder="동영상 주소 입력"
                              v-model="videoLinkUrl"/>
            </b-form-group>
            <action-button>
                <button type="submit">다음</button>
            </action-button>
        </b-form>
    </div>
</template>
<style lang="scss" scoped>
    .project-register-step01-wrapper{
        .project-register-step01-wrapper--image-wrapper{
            &.is-small{
                width: 85px;
            }
            &.is-large{
                width: 124px;
            }
        }
        .project-register-step01-wrapper--description-wrapper{
            overflow: hidden;
            height: 124px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            textarea{
                box-sizing:border-box;
                width: 100%;
                height: 100%;
                padding: 16px;
                resize: none;
                border: 0;
                &:focus{
                    outline: none;
                }
            }
        }
        .project-register-step01-wrapper--add-question-button{
            width: 100%;
            height: 38px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: solid 1px #cccccc;
            font-size: 14px;
            color: #373a3c;
        }
    }
</style>
<script lang="ts">
    /**
     * @class ProjectInfoForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import ActionButton from '@/components/buttons/ProjectRegisterActionButton.vue';
    import ImagePreview from '@/components/utils/ImagePreview.vue';

    type IprojectCategoryOption = {
        value: number,
        text: string
    }

    @Component({
        name: 'ProjectInfoForm',
        components: {
            ImagePreview,
            ActionButton,
        },
    })
    class ProjectInfoForm extends Vue implements FormComponent {
        selectedCategory: string = '';
        projectTitle: string = '';
        videoLinkUrl: string = '';

        projectCategory: IprojectCategoryOption[] = [
            { value: 1, text: '어떤 주제를 다루는 프로젝트 인가요?' },
            { value: 2, text: '어떤 사람들이 필요한지 궁금해요?' },
            { value: 3, text: '이 프로젝트를 한마디로 표현 한다면?' },
            { value: 4, text: '자유롭게 설명해 주세요.' }
        ];

        moveNextStep (): void {
            // TODO: 다음 스텝으로 이용하는 기능 추가
            console.log('다음 스텝으로 넘어가는 기능 추가');
            this.$router.push({ name: 'project-schedule-form' });
        }

        validate (): void {

        }
    }
    export default ProjectInfoForm;
</script>