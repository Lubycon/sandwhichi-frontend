<template>
    <div>
        <input
            type="text"
            class="form-control"
            v-model="localDate"
            ref="datepicker"/>
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

    import moment from 'moment';
    import { Vue, Component, Prop } from 'vue-property-decorator';
    const $ = process.browser ? require('jquery') : null;
    if (process.browser) {
        require('bootstrap-datepicker');
    }

    @Component({
        name: 'DatePicker',
    })
    class DatePicker extends Vue {
        @Prop() date: string;
        localDate: string;

        constructor () {
            super();
            this.localDate = this.date;
        }

        mounted () {
            this.initialize();
        }

        initialize (): void {
            $(this.$refs.datepicker)
                .datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                })
                .on('changeDate', this.changeDate);
        }

        changeDate (e): void {
            this.$emit('updateDate', moment(e.date).format('YYYY-MM-DD'));
        }
    }

    export default DatePicker;
</script>
