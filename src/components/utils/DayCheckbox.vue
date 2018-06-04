<template>
    <div data-name="day-checkbox">
        <div v-for="dayOption in dayOptions">
            <label>
                <input
                    type="checkbox"
                    @click="toggle(dayOption.value)">
                <span>{{ dayOption.text }}</span>
            </label>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    div[data-name="day-checkbox"] {
        overflow: hidden;
        > div {
            overflow: hidden;
            position: relative;
            float: left;
            width: 32px;
            height: 32px;
            margin-right: 8px;
            border-radius: 25px;
            label {
                display: block;
                width: 100%;
                height: 100%;
                input[type="checkbox"] {
                    position: absolute;
                    opacity: 0.01;
                }
                span {
                    box-sizing: border-box;
                    display: block;
                    height: 100%;
                    padding: 6px 0 0;
                    text-align: center;
                    background-color: #ccc;
                    color: #373a3c;
                }
                input[type="checkbox"]:checked + span{
                    background-color: #52bad5;
                    color: #fff;
                }
            }
        }
    }
</style>
<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';

    interface IDaysOfWeek {
        value: string,
        text: string,
    }
    @Component({
        name: 'DayCheckbox',
    })

    export default class DayCheckbox extends Vue {
        checkedDay: string[];
        dayOptions: IDaysOfWeek[];
        constructor () {
            super();
            this.checkedDay = [];
            this.dayOptions = [
                { value: 'monday', text: '월' },
                { value: 'tuesday', text: '화' },
                { value: 'wednesday', text: '수' },
                { value: 'thursday', text: '목' },
                { value: 'friday', text: '금' },
                { value: 'saturday', text: '토' },
                { value: 'sunday', text: '일' }
            ];
        }

        @Watch('checkedDay')
        update (value: string[]) {
            this.$emit('update', value);
        }

        toggle (value: string): void {
            const targetIndex = this.checkedDay.findIndex(v => v === value);
            const isExist = targetIndex !== -1;
            if (isExist) {
                this.checkedDay.splice(targetIndex, 1);
            }
            else {
                this.checkedDay.push(value);
            }
        }
    }
</script>
