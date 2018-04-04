<template>
    <div>
        <!--<vue-datepicker-local v-model="localDate"-->
                              <!--:local="local"></vue-datepicker-local>-->
        테스트
    </div>
</template>

<style lang="scss" scoped>
    .progress-bar{
        height: 6px;
        background-color: #f5f5f5;
        div{
            overflow: hidden;
            height: 100%;
            background-color: #52bad5;
            text-indent: -10000em;
        }
    }
</style>

<script lang="ts">
    /**
     * @class DatePicker
     * @extends Vue
     */

    import moment, { Moment } from 'moment';
    // import VueDatepickerLocal from 'vue-datepicker-local';
    import { Vue, Component, Prop } from 'vue-property-decorator';
    // import { VuePicker } from 'vuejs-datepicker';

    interface IdatePickerConfig {
        dow: number,
        monthsHead: Array<string>,
        months: Array<string>,
        weeks: Array<string>,
    }

    @Component({
        name: 'DatePicker',
        components: {
            // VueDatepickerLocal,
        },
    })
    class DatePicker extends Vue {
        @Prop() date: Moment;

        get localDate (): string {
            return this.date.format('YYYY-MM-DD');
        }

        set localDate (selectedDate) {
            this.$emit('updateDate', moment(selectedDate));
        }

        local: IdatePickerConfig = {
            dow: 0,
            monthsHead: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
            months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
            weeks: '일_월_화_수_목_금_토'.split('_'),
        }
    }

    export default DatePicker;
</script>

