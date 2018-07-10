<template>
<div class="project-regist-form">
    <b-row tag="header" data-name="progress-bar">
        <progress-bar
            :max="maxPageIndex"
            :value="pageIndex">
        </progress-bar>
    </b-row>
    <b-row data-name="regist-form">
        <project-info-form
            v-show="pageIndex === 0"
            ref="projectForm0"
            class="col-12">
        </project-info-form>
        <project-region-form
            v-show="pageIndex === 1"
            ref="projectForm1"
            @setData="setLocationData"
            class="col-12">
        </project-region-form>
        <project-schedule-form
            v-show="pageIndex === 2"
            ref="projectForm2"
            @setData="setScheduleData"
            class="col-12">
        </project-schedule-form>
        <project-meeting-form
            v-show="pageIndex === 3"
            ref="projectForm3"
            class="col-12">
        </project-meeting-form>
        <project-open-chat-form
            v-show="pageIndex === 4"
            ref="projectForm4"
            class="col-12">
        </project-open-chat-form>
        <project-complete-form
            v-show="pageIndex === 5"
            ref="projectForm5"
            class="col-12">
        </project-complete-form>
    </b-row>
    <b-row tag="footer" data-name="control-panel" v-if="pageIndex !== 5">
        <b-col v-show="pageIndex > 0">
            <b-button
                data-name="prev-button"
                variant="outline-secondary"
                @click="prevStep">
                이전
            </b-button>
        </b-col>
        <b-col v-show="pageIndex < maxPageIndex">
            <b-button
                data-name="next-button"
                variant="primary"
                @click="nextStep">
                다음
            </b-button>
        </b-col>
        <b-col v-show="pageIndex >= maxPageIndex">
            <b-button
                data-name="submit"
                variant="primary"
                @click="submit">
                등록
            </b-button>
        </b-col>
    </b-row>
</div>
</template>

<style lang="scss" scoped>
    @import 'src/styles/utils/__module__';
    div[data-type="debug"] {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        color: $white;
        z-index: 1;
    }

    header[data-name="progress-bar"] {}

    div[data-name="regist-form"] {
        // @TODO
        // 임시로 잡아놓음 100vh - (global-header-height + progressbar-height + footer-button-height)
        height: calc(100vh - (#{$global-header-height} + 6px + 33.5px));
        overflow-y: scroll;
    }

    footer[data-name="control-panel"] {
        div[class*="col"] {
            padding: 0;
            button.btn {
                width: 100%;
                border-radius: 0;
            }
        }
    }
</style>

<script lang="ts">
    /**
     * @class ProjectRegistForm
     * @extends Vue
     */
    import { Vue, Component } from 'vue-property-decorator';
    import APIProject from '@/api/APIProject';
    import ProgressBar from '@/components/utils/ProgressBar.vue';
    import ProjectInfoForm from '@/components/forms/project/ProjectInfo.form.vue';
    import ProjectRegionForm from '@/components/forms/project/ProjectRegion.form.vue';
    import ProjectScheduleForm from '@/components/forms/project/ProjectSchedule.form.vue';
    import ProjectMeetingForm from '@/components/forms/project/ProjectMeeting.form.vue';
    import ProjectOpenChatForm from '@/components/forms/project/ProjectOpenChat.form.vue';
    import ProjectCompleteForm from '@/components/forms/project/ProjectComplete.form.vue';
    import { Project } from '@/interfaces/Project.interface';

    @Component({
        name: 'ProjectRegistFormset',
        components: {
            ProgressBar,
            ProjectInfoForm,
            ProjectRegionForm,
            ProjectMeetingForm,
            ProjectScheduleForm,
            ProjectOpenChatForm,
            ProjectCompleteForm,
        },
    })
    class ProjectRegistFormset extends Vue {
        $refs: {
            projectForm0: ProjectInfoForm;
            projectForm1: ProjectRegionForm;
            projectForm2: ProjectScheduleForm;
            projectForm3: any;
            projectForm4: any;
            projectForm5: any;
        };
        pageIndex: number = 1;
        maxPageIndex: number = 5;
        locationCode: string = '';
        startAt: string = '';
        endsAt: string = '';
        project: Project;

        async nextStep (): Promise<number> {
            const maxPageIndex = this.maxPageIndex;
            let pageIndex = this.pageIndex;
            const validation = await this.$refs[`projectForm${pageIndex}`].validate();

            if (validation) {
                this.$refs[`projectForm${pageIndex}`].setData();
                if (pageIndex < maxPageIndex) {
                    pageIndex++;
                    this.$set(this, 'pageIndex', pageIndex);
                }
            }

            return this.pageIndex;
        }

        setLocationData (code: string): void {
            this.locationCode = code;
        }

        setScheduleData (payload: { startAt: string, endsAt: string}): void {
            this.startAt = payload.startAt;
            this.endsAt = payload.endsAt;
        }

        prevStep (): number {
            let pageIndex = this.pageIndex;
            if (pageIndex > 0) {
                pageIndex--;
                this.$set(this, 'pageIndex', pageIndex);
            }

            return pageIndex;
        }

        async submit (): Promise<any> {
            try {
                const data = this.project;
                const response = await APIProject.createProject(data);
                return response;
            }
            catch (e) {
                throw new Error(e);
            }
        }
    }
    export default ProjectRegistFormset;
</script>
