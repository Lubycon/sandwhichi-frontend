<template>
    <div data-name="date-picker">
        <no-ssr>
            <vue-datepicker :lang="lang"></vue-datepicker>
        </no-ssr>
    </div>
</template>

<style lang="scss" scoped>
    div[data-name="date-picker"] {
        position: relative;
        i {
            position: absolute;
            left: 2px;
            top: 8px;
        }
        input[type="text"] {
            padding-left: 20px;
        }
    }
</style>

<script lang="ts">
    /**
     * @class DatePicker
     * @extends Vue
     */

    import moment from 'moment';
    import NoSsr from 'vue-no-ssr';
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({
        name: 'DatePicker',
        components: {
            NoSsr,
            VueDatepicker: () => import('vue2-datepicker'),
        },
    })
    class DatePicker extends Vue {
        @Prop() date: string;
        localDate: string;
        lang: any;

        constructor () {
            super();
            this.localDate = this.date;
            this.lang = {
                days: ['일', '월', '화', '수', '목', '금', '토'],
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                pickers: ['지난 7일', '지난 30일', '다음 7일', '다음 30일'],
            };
        }

        mounted () {
            this.initialize();
        }

        initialize (): void {
        }

        changeDate (e): void {
            this.$emit('updateDate', moment(e.date).format('YYYY-MM-DD'));
        }
    }

    export default DatePicker;
</script>
