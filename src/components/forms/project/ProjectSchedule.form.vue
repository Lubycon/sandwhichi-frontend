<template>
    <div data-name="project-schedule">
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
        </b-form>
    </div>
</template>
<style lang="scss" scoped>
    div[data-name="project-schedule"]{
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

        get periodOfProject (): number {
            const startDateToMoment: Moment = moment(this.startDate, 'YYYY-MM-DD');
            const finishDateToMoment: Moment = moment(this.finishDate, 'YYYY-MM-DD');
            const periodDifference: number = finishDateToMoment.diff(startDateToMoment, 'day') + 1;

            return periodDifference;
        }

        updateStartDate (startDate: string): void {
            this.startDate = startDate;
        }

        updateFinishDate (finishDate: string): void {
            this.finishDate = finishDate;
        }
        setData (): void {
            const startAt = this.startDate;
            const endsAt = this.finishDate;
            this.$emit('setData', { startAt, endsAt });
        }

        validate (): boolean {
            const isInvalidPeriod = this.periodOfProject < 0;
            if (isInvalidPeriod) {
                return false;
            }
            return true;
        }
    }
    export default ProjectScheduleForm;
</script>
