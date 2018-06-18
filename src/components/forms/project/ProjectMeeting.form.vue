<template>
    <b-form-row class="project-form" data-name="project-region">
        <b-col cols="12">
            <b-form-group label="요일 선택">
                <day-checkbox @update="updateCheckedDay"></day-checkbox>
            </b-form-group>
            <b-form-group :state="!errors.has('preset')">
                <b-form-select
                    name="preset"
                    v-model="dayPreset"
                    v-validate="'required'"
                    :options="dayPresetOptions">
                </b-form-select>
                <b-form-invalid-feedback>{{ errors.first('preset') }}</b-form-invalid-feedback>
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

    @Component({
        name: 'ProjectMeetingForm',
        components: {
            DayCheckbox,
        },
    })
    class ProjectMeetingForm extends Vue implements FormComponent {
        checkedDay: string[];
        dayPreset: string;
        dayPresetOptions: Object[];
        startHour: string;
        endHour: string;
        setupOption: string;
        setupOptions: Object[];
        isAvailConsultation: boolean;

        constructor () {
            super();
            this.checkedDay = [];
            this.dayPreset = '';
            this.dayPresetOptions = [
                { value: 'ㅈ', text: '매일(월~금)' },
                { value: 'options1', text: '주말(토,일)' }
            ];
            // TODO 서버 API의 scheduleRecurringId 와 매칭시키는 작업
            this.setupOptions = [
                { value: '1', text: '매주' },
                { value: '2', text: '격주' },
                { value: '3', text: '3주 마다' },
                { value: '4', text: '매달 첫 주' },
                { value: '5', text: '매달 둘째 주' },
                { value: '6', text: '매달 셋째 주' },
                { value: '7', text: '매달 마지막 주' }
            ];
            this.startHour = '';
            this.endHour = '';
            this.setupOption = '';
            this.isAvailConsultation = false;
        }

        get timeOptions (): Object[] {
            let timeOptions = [];
            for (let i = 1; i <= 12; i++) {
                timeOptions.push({ value: `AM ${i}:00`, text: `AM ${i}:00` });
                if (i < 12) {
                    timeOptions.push({ value: `AM ${i}:30`, text: `AM ${i}:30` });
                }
            }
            return timeOptions;
        }

        async validate (): Promise<boolean> {
            const dayPresetValidation = await this.$validator.validate('preset', this.dayPreset);
            const startHourValidation = await this.$validator.validate('startHour', this.startHour);
            const endHourValidation = await this.$validator.validate('endHour', this.endHour);
            const setupOptionsValidation = await this.$validator.validate('setupOption', this.setupOption);
            const result = dayPresetValidation && startHourValidation && endHourValidation && setupOptionsValidation;

            this.$emit('validate', result);
            return result;
        }

        updateCheckedDay (value: string[]): void {
            this.checkedDay = value;
        }
    }
    export default ProjectMeetingForm;
</script>

