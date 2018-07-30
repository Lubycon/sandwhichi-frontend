<template>
    <b-form-row class="project-form" data-name="project-region">
        <b-col cols="12">
            <b-form-group label="프로젝트 일정">
                <day-checkbox @update="updateCheckedDay"></day-checkbox>
            </b-form-group>
            <b-form-group :state="!errors.has('startHour') && !errors.has('endHour')">
                <b-row>
                    <b-col>
                        <b-form-select
                            v-model="startHour"
                            name="startHour"
                            v-validate="'required'"
                            :options="timeOptions">
                        </b-form-select>
                    </b-col>
                    -
                    <b-col>
                        <b-form-select
                            v-model="endHour"
                            name="endHour"
                            v-validate="'required'"
                            :options="timeOptions">
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-form-invalid-feedback>{{ errors.first('startHour') }}</b-form-invalid-feedback>
                <b-form-invalid-feedback>{{ errors.first('endHour') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :state="!errors.has('setupOption')">
                <b-form-select
                    v-model="dayPreset"
                    name="setupOption"
                    v-validate="'required'"
                    :options="setupOptions">
                </b-form-select>
                <b-form-invalid-feedback>{{ errors.first('setupOption') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-checkbox v-model="isAvailConsultation">협의 가능</b-form-checkbox>
        </b-col>
    </b-form-row>

</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
    /**
     * @class ProjectMeetingForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import DayCheckbox from '@/components/utils/DayCheckbox.vue';
    import { apiProject } from '@/api/APIProject';
    import {ISelectbox} from '@/interfaces/utils/Selectbox.interface';
    import timesetHelper from '@/helpers/TimeSet';

    @Component({
        name: 'ProjectMeetingForm',
        components: {
            DayCheckbox,
        },
    })
    class ProjectMeetingForm extends Vue implements FormComponent {
        checkedDay: string[];
        dayPreset: string;
        dayPresetOptions: ISelectbox[];
        startHour: string;
        endHour: string;
        setupOption: string;
        setupOptions: ISelectbox[];
        isAvailConsultation: boolean;

        constructor () {
            super();
            this.checkedDay = [];
            this.dayPreset = '';
            this.dayPresetOptions = [
                { value: 'ㅈ', text: '매일(월~금)' },
                { value: 'options1', text: '주말(토,일)' }
            ];
            this.setupOptions = [];
            this.startHour = '';
            this.endHour = '';
            this.setupOption = '';
            this.isAvailConsultation = false;
        }
        mounted () {
            apiProject.fetchRecurringtypes()
                .then(recurringTypes => {
                    this.setupOptions = recurringTypes;
                });
        }

        get timeOptions (): Object[] {
            const test = timesetHelper.generateTime();
            return test.reduce((v, i) => {
                v.push({ value: i, text: i });
                return v;
            }, []);
        }

        async validate (): Promise<boolean> {
            const startHourValidation = await this.$validator.validate('startHour', this.startHour);
            const endHourValidation = await this.$validator.validate('endHour', this.endHour);
            const setupOptionsValidation = await this.$validator.validate('setupOption', this.setupOption);
            const result = startHourValidation && endHourValidation && setupOptionsValidation;

            this.$emit('validate', result);
            return result;
        }

        updateCheckedDay (value: string[]): void {
            this.checkedDay = value;
        }
    }
    export default ProjectMeetingForm;
</script>

