<template>
    <b-form-row class="project-form" data-name="project-region">
        <b-col cols="12">
            <b-form-group label="요일 선택">
                <day-checkbox @update="updateCheckedDay"></day-checkbox>
            </b-form-group>
            <b-form-group>
                <b-form-select
                    v-model="dayPreset"
                    v-validate="'required'"
                    :options="dayPresetOptions">
                </b-form-select>
            </b-form-group>
            <b-form-group>
                <b-row>
                    <b-col>
                        <b-form-select
                            v-model="dayPreset"
                            name="startHour"
                            v-validate="'required'"
                            :options="timeOptions">
                        </b-form-select>
                    </b-col>
                    -
                    <b-col>
                        <b-form-select
                            v-model="dayPreset"
                            name="endHour"
                            v-validate="'required'"
                            :options="timeOptions">
                        </b-form-select>
                    </b-col>
                </b-row>
            </b-form-group>
            <b-form-group>
                <b-form-select
                    v-model="dayPreset"
                    v-validate="'required'"
                    :options="dayPresetOptions">
                </b-form-select>
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
    import moment from 'moment';
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
        isAvailConsultation: boolean;

        constructor () {
            super();
            this.checkedDay = [];
            this.dayPreset = '';
            this.dayPresetOptions = [
                { value: 'options1', text: '요일 프리셋' },
                { value: 'options1', text: '요일 프리셋' }
            ];
            this.startHour = '';
            this.endHour = '';
            this.isAvailConsultation = false;
        }

        get timeOptions (): Object[] {
            console.log(moment().hour(1).minute(30).format('HH:mm'));
            let timeOptions = [];
            for (let i = 1; i <= 12; i++) {
                timeOptions.push({ value: i, text: `AM ${i}` });
            }
            return timeOptions;
        }

        validate (): void {

        }

        updateCheckedDay (value: string[]): void {
            this.checkedDay = value;
        }
    }
    export default ProjectMeetingForm;
</script>

