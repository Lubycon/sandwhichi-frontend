<template>
    <b-form-row
        class="project-form"
        data-name="project-info">
        <b-col
            cols="5"
            data-name="project-thumbnail">
            <b-form-group
                label="프로젝트 썸네일*"
                :state="!errors.has('thumbnail')">
                <image-uploader
                    ref="thumbnailUploader"
                    name="thumbnail"
                    :base64="true"
                    :preview="true"
                    @change="onChangeThumbnail">
                </image-uploader>
                <b-form-invalid-feedback>{{ errors.first('thumbnail') }}</b-form-invalid-feedback>
            </b-form-group>
        </b-col>
        <b-col
            cols="12"
            data-name="project-title">
            <b-form-group
                label="프로젝트 이름*"
                :state="!errors.has('title')">
                <b-form-input
                    type="text"
                    name="title"
                    placeholder="예 : 날씨 앱 개발 프로젝트"
                    v-model="projectTitle">
                </b-form-input>
                <b-form-invalid-feedback>{{ errors.first('title') }}</b-form-invalid-feedback>
            </b-form-group>
        </b-col>
        <b-col
            cols="12"
            data-name="project-description">
            <b-form-group
                label="프로젝트 내용*"
                :state="!errors.has('descriptions')">
                <question-answer-formset ref="qaFormSet"></question-answer-formset>
                <b-form-invalid-feedback>{{ errors.has('descriptions') }}</b-form-invalid-feedback>
            </b-form-group>
        </b-col>
        <b-col cols="12" data-name="project-media">
            <b-form-group label="프로젝트 미디어">
                <b-row tag="ul" :no-gutters="true">
                    <b-col
                        cols="4"
                        tag="li"
                        data-name="media-uploader">
                        <image-uploader
                            ref="mediaUploader"
                            :base64="true"
                            @change="onChangeMedia">
                        </image-uploader>
                    </b-col>
                    <b-col
                        v-for="(media, index) in projectMediaThumbnails"
                        :key="index"
                        cols="4"
                        tag="li"
                        data-name="media-data">
                        <div
                            data-name="media-thumbnail"
                            :style="{ 'background-image': `url(${media})` }">
                        </div>
                    </b-col>
                </b-row>
            </b-form-group>
        </b-col>
        <b-col cols="12">
            <b-form-group label="동영상 링크">
                <b-form-input
                    type="text"
                    name="videoAddress"
                    placeholder="동영상 주소 입력"
                    v-model="videoLinkUrl">
                </b-form-input>
            </b-form-group>
        </b-col>
    </b-form-row>
</template>
<style lang="scss" scoped>
    @import 'src/styles/utils/__module__';
    div[data-name="project-thumbnail"] {
        width: 125px;
    }
    div[data-name="project-media"] {
        $gutter: 0.5rem;
        ul {
            margin: {
                right: -$gutter;
                left: -$gutter;
                bottom: 0;
            }
            li {
                padding: {
                    left: $gutter;
                    right: $gutter;
                }
                & > div {
                    @include backgroundCover;
                    height: 100%;
                }
            }
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
    import { ProjectInfo } from '@/interfaces/Project.interface';
    import Validate from '@/helpers/Validate';
    import APIImage from '@/api/APIImage';
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
        $toasted: any;
        $refs: {
            qaFormSet: any;
            mediaUploader: any;
            thumbnailUploader: any;
        };
        projectThumbnailFile: File;
        projectThumbnailData: string;
        projectThumbnailURL: string;
        projectTitle: string;
        projectMediaFiles: File[];
        projectMediaThumbnails: string[];
        projectMediaURLs: string[];
        videoLinkUrl: string;
        regex: any;

        constructor () {
            super();
            this.projectThumbnailFile = null;
            this.projectThumbnailData = '';
            this.projectTitle = '';
            this.projectMediaFiles = [];
            this.projectMediaThumbnails = [];
            this.videoLinkUrl = '';

            this.regex = {
                name: Validate.getRegex('name'),
            };
        }

        async onChangeThumbnail (res: any): Promise<any> {
            try {
                const fileResponse = await APIImage.postImage(res.file);
                this.projectThumbnailFile = res.file;
                this.projectThumbnailData = res.dataURL;
                this.projectThumbnailURL = fileResponse.url;

                return fileResponse;
            }
            catch (e) {
                this.$toasted.show('파일 업로드에 실패했습니다');
                throw new Error(e);
            }
        }

        async onChangeMedia (res: any): Promise<any> {
            try {
                const fileResponse = await APIImage.postImage(res.file);
                this.projectMediaFiles.push(res.file);
                this.projectMediaThumbnails.push(res.dataURL);
                this.projectMediaURLs.push(fileResponse.url);
                this.$refs.mediaUploader.reset();

                return fileResponse;
            }
            catch (e) {
                this.$toasted.show('파일 업로드에 실패했습니다');
                throw new Error(e);
            }
        }

        // @TODO 삭제버튼 만들고 바인딩
        deleteThumbnail () {
            this.projectThumbnailFile = null;
            this.projectThumbnailData = '';
            this.projectThumbnailURL = '';
            this.$refs.thumbnailUploader.reset();
        }

        // @TODO 삭제버튼 만들고 바인딩
        deleteMedia (index: number) {
            this.projectMediaFiles.splice(index, 1);
            this.projectMediaThumbnails.splice(index, 1);
            this.projectMediaURLs.splice(index, 1);
        }

        getData (): ProjectInfo {
            const data: ProjectInfo = {
                title: this.projectTitle,
                description: [],
                profileImageUrl: '',
                media: [],
            };

            return data;
        }

        liftData (): void {
            const projectTitle = this.projectTitle;
            this.$emit('liftData', { projectTitle });
        }

        async validate (): Promise<boolean> {
            const thumbnailValidation = await this.$validator.validate('thumbnail', this.projectThumbnailFile);
            const titleValidation = await this.$validator.validate('title', this.projectTitle);
            const descriptionValidation = await this.$refs.qaFormSet.validate();
            const result = thumbnailValidation && titleValidation && descriptionValidation;

            this.$emit('validate', result);
            return result;
        }

        created () {
            const messageDict = {
                custom: {
                    thumbnail: {
                        required: '프로젝트를 대표하는 사진을 업로드 해주세요',
                    },
                    title: {
                        required: '멋진 이름이 하나 정돈 필요할 것 같아요',
                        max: (field, params, data) => {
                            return `프로젝트 제목은 ${params[0]}자를 넘을 수 없어요`;
                        },
                        regex: '프로젝트 제목에는 -나 _를 제외한 특수문자를 사용하실 수 없어요',
                    },
                    descriptions: {
                        required: '프로젝트 설명을 잊으셨어요!',
                    },
                },
            };

            this.$validator.localize('en', messageDict);
            this.$validator.attach('thumbnail', 'required');
            this.$validator.attach('title', `required|max:30|regex:${this.regex.name}`);
        }
    }
    export default ProjectInfoForm;
</script>
