<template>
    <div data-name="date-picker">
        <no-ssr>
            <vue-datepicker v-model="date"
                            :lang="lang"
                            :not-before="notBefore"></vue-datepicker>
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
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component({
        name: 'DatePicker',
        components: {
            NoSsr,
            VueDatepicker: () => import('vue2-datepicker'),
        },
    })
    class DatePicker extends Vue {
        @Prop({ default: moment().format() }) value: string;
        @Prop() notBefore: Date;
        date: Date;
        lang: any;

        constructor () {
            super();
            this.date = moment(this.value, 'YYYY-MM-DD').toDate();
            this.lang = {
                days: ['일', '월', '화', '수', '목', '금', '토'],
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                pickers: ['지난 7일', '지난 30일', '다음 7일', '다음 30일'],
            };
        }

        @Watch('date')
        updateDate (value: Date) {
            this.$emit('input', moment(value).format('YYYY-MM-DD'));
        }
    }

    export default DatePicker;
</script>
