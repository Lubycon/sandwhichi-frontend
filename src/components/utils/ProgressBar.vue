<template>
    <div data-name="progress-bar">
        <ul>
            <li :class="{ 'is-active': addclass(0) }">1</li>
            <li :class="{ 'is-active': addclass(1) }">2</li>
            <li :class="{ 'is-active': addclass(2) }">3</li>
            <li :class="{ 'is-active': addclass(3) }">4</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    div[data-name="progress-bar"]{
        width: 100%;
        padding-top: 16px;
        ul {
            display: flex;
            justify-content: center;
            li {
                box-sizing: border-box;
                position: relative;
                width: 32px;
                height: 32px;
                margin-right: 40px;
                padding-top: 5px;
                border-radius: 20px;
                background-color: #f5f5f5;
                text-align: center;
                color: #cccccc;
                &.is-active {
                    background-color: #52bad5;
                    color: #fff;
                    &:not(:first-child):before {
                        background-color: #52bad5;
                    }
                }
                &:not(:first-child):before {
                    content: '';
                    position: absolute;
                    left: -50%;
                    top: 50%;
                    width: 24px;
                    height: 2px;
                    margin: -1px 0 0 -16px;
                    background-color: #ccc;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
</style>

<script lang="ts">
    /**
     * @class ProgressBar
     * @extends Vue
     */

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({
        name: 'ProgressBar',
    })
    class ProgressBar extends Vue {
        @Prop({ default: 1 })
        grade: number;
        @Prop({ default: 100 })
        max: number;

        @Prop({ default: 0 })
        value: number;

        addclass (grade: number): boolean {
            return grade <= this.grade;
        }

    }
    export default ProgressBar;
</script>

