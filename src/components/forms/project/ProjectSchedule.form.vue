<template>
    <div class="project-register-step01-wrapper">
        <b-form>
            <!-- 프로젝트 시작 폼 -->
            <b-form-group label="프로젝트 시작일">
                <date-picker
                    :date="startDate"
                    @updateDate="updateStartDate">
                </date-picker>
            </b-form-group>
            <!--// 프로젝트 시작 폼 -->

            <!-- 프로젝트 종료 폼 -->
            <b-form-group label="프로젝트 종료일">
                <date-picker
                    :date="finishDate"
                    @updateDate="updateFinishDate">
                </date-picker>
            </b-form-group>
            <!--// 프로젝트 종료 폼 -->

            <!-- 프로젝트 여정 기간-->
            <b-form-group label="프로젝트 종료일">
                <b-form-input
                    type="text"
                    :value="periodOfProject"
                    name="projectName"
                    readonly="readonly">
                </b-form-input>
            </b-form-group>
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
     * @class ProjectScheduleForm
     * @extends Vue
     * @implements FormComponent
     */
    import moment, { Moment } from 'moment';
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import DatePicker from '@/components/utils/DatePicker.vue';

    type IprojectCategoryOption = {
        value: number,
        text: string
    };

    @Component({
        name: 'ProjectScheduleForm',
        components: {
            DatePicker,
        },
    })
    class ProjectScheduleForm extends Vue implements FormComponent {
        startDate: string;
        finishDate: string;
        selectedCategory: string;

        constructor () {
            super();
            this.startDate = moment().format('YYYY-MM-DD');
            this.finishDate = moment().format('YYYY-MM-DD');
            this.selectedCategory = '';
        }
        projectCategory: IprojectCategoryOption[] = [
            { value: 1, text: '어떤 주제를 다루는 프로젝트 인가요?' },
            { value: 2, text: '어떤 사람들이 필요한지 궁금해요?' },
            { value: 3, text: '이 프로젝트를 한마디로 표현 한다면?' },
            { value: 4, text: '자유롭게 설명해 주세요.' }
        ];

        get periodOfProject (): string {
            const startDateToMoment: Moment = moment(this.startDate, 'YYYY-MM-DD');
            const finishDateToMoment: Moment = moment(this.finishDate, 'YYYY-MM-DD');
            const periodDifference: number = finishDateToMoment.diff(startDateToMoment, 'day') + 1;

            return `${periodDifference} 일의 여정`;
        }

        updateStartDate (startDate: string): void {
            this.startDate = startDate;
        }

        updateFinishDate (finishDate: string): void {
            this.finishDate = finishDate;
        }

        validate (): void {}
    }
    export default ProjectScheduleForm;
</script>
