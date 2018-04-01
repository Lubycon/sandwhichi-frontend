<template>
    <div class="project-register-step01-wrapper">
        <b-form @submit.prevent="moveNextStep">
            <!-- 프로젝트 시작 폼 -->
            <b-form-group label="프로젝트 시작일">
                <date-picker :date="startDate"
                             @updateDate="updateStartDate"></date-picker>
            </b-form-group>
            <!--// 프로젝트 시작 폼 -->

            <!-- 프로젝트 종료 폼 -->
            <b-form-group label="프로젝트 종료일">
                <date-picker :date="finishDate"
                             @updateDate="updateFinishDate"></date-picker>
            </b-form-group>
            <!--// 프로젝트 종료 폼 -->

            <!-- 프로젝트 여정 기간-->
            <b-form-group label="프로젝트 종료일">
                <b-form-input type="text"
                              :value="periodOfProject"
                              name="projectName"
                              readonly="readonly"/>
            </b-form-group>
            <!--// 프로젝트 여정 기간-->

            <action-button>
                <button type="button" class="is-half is-previous">이전</button>
                <button type="submit" class="is-half is-next">다음</button>
            </action-button>
        </b-form>
    </div>
</template>
<style lang="scss" scoped>
    .project-register-step01-wrapper{
        .project-register-step01-wrapper--image-wrapper{
            overflow: hidden;
            position: relative;
            &.is-small{
                width: 85px;
                height: 85px;
            }
            &.is-large{
                width: 124px;
                height: 124px;
            }
            border: 1px solid #ccc;
            > span{
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -14px 0 0 -8px;
                font-size: 28px;
                line-height: 28px;
                color: #cccccc;
            }
            > div{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.01;
                font-size: 100px;
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
     * @class ProjectRegisterSchedule.vue
     * @extends Vue
     */
    import moment, { Moment } from 'moment';
    import { Vue, Component } from 'vue-property-decorator';
    import ProgressBar from '@/components/utils/ProgressBar.vue';
    import ActionButton from './ProjectRegisterActionButton.vue';
    import DatePicker from '@/components/utils/DatePicker.vue';

    interface IprojectCategoryOption {
        value: number,
        text: string
    }

    @Component({
        name: 'ProjectRegisterSchedule',
        components: {
            DatePicker,
            ProgressBar,
            ActionButton,
        },
    })
    class ProjectRegisterSchedule extends Vue {
        startDate: Moment = moment();
        finishDate: Moment = moment();
        selectedCategory: string = '';
        projectCategory: Array<IprojectCategoryOption> = [
            { value: 1, text: '어떤 주제를 다루는 프로젝트 인가요?' },
            { value: 2, text: '어떤 사람들이 필요한지 궁금해요?' },
            { value: 3, text: '이 프로젝트를 한마디로 표현 한다면?' },
            { value: 4, text: '자유롭게 설명해 주세요.' }
        ];

        get periodOfProject (): string {
            const startDate: Moment = this.startDate;
            const finishDate: Moment = this.finishDate;
            const periodDifference: number = finishDate.diff(startDate, 'day') + 1;

            return `${periodDifference} 일의 여정`;
        }

        updateStartDate (startDate: Moment): void {
            this.startDate = startDate;
        }

        updateFinishDate (finishDate: Moment): void {
            this.finishDate = finishDate;
        }

        moveNextStep (): void {
            // TODO: 다음 스텝으로 이용하는 기능 추가
            console.log('다음 스텝으로 넘어가는 기능 추가');
        }
    }
    export default ProjectRegisterSchedule;
</script>
