<template>
    <div class="progress-bar">
        <div :style="{ 'width': progressWidth }">
            {{ progressWidth }} 작성되었습니다.
        </div>
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
     * @class ProgressBar
     * @extends Vue
     */

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({
        name: 'ProgressBar',
    })
    class ProgressBar extends Vue {
        @Prop({ default: 0 }) value: Number;

        get progressWidth (): string {
            return this.value + '%';
        }
    }

    export default ProgressBar;
</script>

