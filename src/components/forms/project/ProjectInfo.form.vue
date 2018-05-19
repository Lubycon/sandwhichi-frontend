<template>
    <div class="project-register-step01-wrapper">
        <b-form>
            <b-form-group label="프로젝트 썸네일">
                <div class="project-register-step01-wrapper--image-wrapper is-large">
                    <image-uploader
                        :base64="true"
                        :preview="true"
                        @change="onChangeThumbnail">
                    </image-uploader>
                </div>
            </b-form-group>
            <b-form-group label="프로젝트 이름">
                <b-form-input
                    type="text"
                    name="title"
                    placeholder="예 : 날씨 앱 개발 프로젝트"
                    v-model="projectTitle"
                    v-validate="{
                        rules: {
                            required: true,
                            max: 30,
                            regex: regex.name,
                        },
                    }"
                    :state="!errors.has('title')">
                </b-form-input>
                <b-form-invalid-feedback>{{ errors.first('title') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="프로젝트 내용">
                <question-answer-formset></question-answer-formset>
            </b-form-group>
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
                <b-form-input
                    type="text"
                    name="videoAddress"
                    placeholder="동영상 주소 입력"
                    v-model="videoLinkUrl">
                </b-form-input>
            </b-form-group>
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
    import Validate from '@/helpers/Validate';
    import { FormComponent } from '@/interfaces/Form.interface';
    import ImageUploader from '@/components/utils/ImageUploader.vue';
    import QuestionAnswerFormset from '@/components/forms/QuestionAnswer.formset.vue';

    @Component({
        name: 'ProjectInfoForm',
        components: {
            ImageUploader,
            QuestionAnswerFormset,
        },
    })
    class ProjectInfoForm extends Vue implements FormComponent {
        projectThumbnailFile: File;
        projectThumbnailData: string;
        projectTitle: string;
        videoLinkUrl: string;
        regex: any;

        constructor () {
            super();
            this.projectThumbnailFile = null;
            this.projectThumbnailData = '';
            this.projectTitle = '';
            this.videoLinkUrl = '';

            this.regex = {
                name: Validate.getRegex('name'),
            };
        }

        onChangeThumbnail (res) {
            this.projectThumbnailFile = res.file;
            this.projectThumbnailData = res.dataURL;
        }

        async validate (): Promise<boolean> {
            const validation = await this.$validator.validateAll();
            this.$emit('validate', validation);
            return validation;
        }

        created () {
            const messageDict = {
                custom: {
                    title: {
                        required: '멋진 이름이 하나 정돈 필요할 것 같아요',
                        max: (field, params, data) => {
                            return `프로젝트 제목은 ${params[0]}자를 넘을 수 없어요`;
                        },
                        regex: '프로젝트 제목에는 -나 _를 제외한 특수문자를 사용하실 수 없어요',
                    },
                },
            };

            this.$validator.localize('en', messageDict);
        }
    }
    export default ProjectInfoForm;
</script>
