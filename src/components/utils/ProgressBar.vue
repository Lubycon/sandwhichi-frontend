<template>
    <div class="progress-bar">
        <div
            data-name="progress-value"
            :style="{ 'width': progressWidth }">
            {{ progressWidth }} 작성되었습니다.
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .progress-bar{
        width: 100%;
        height: 6px;
        background-color: #f5f5f5;
        div[data-name="progress-value"] {
            overflow: hidden;
            height: 100%;
            background-color: #52bad5;
            text-indent: -10000em;
            transition: width 0.2s ease-in-out;
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
        @Prop({ default: 100 })
        max: number;

        @Prop({ default: 0 })
        value: number;

        get progressWidth (): string {
            const max = this.max;
            const value = this.value;
            const result = (value / max) * 100;
            return `${result.toFixed(0)}%`;
        }
    }
    export default ProgressBar;
</script>

