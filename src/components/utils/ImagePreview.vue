<template>
    <div class="image-preview-wrapper">
        <span>+</span>
        <div>
            <b-form-file></b-form-file>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .image-preview-wrapper{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-top: 100%;
        border: 1px solid #ccc;
        > span{
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -14px 0 0 -8px;
            font-size: 28px;
            line-height: 28px;
            color: #cccccc;
        }
        > div{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.01;
            font-size: 100px;
        }
    }
</style>

<script lang="ts">
    /**
     * @class ImagePreview
     * @extends Vue
     */

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({
        name: 'ImagePreview',
    })
    class ImagePreview extends Vue {
        @Prop() imageUrl: string;
        @Prop() imageAlt: string;
    }

    export default ImagePreview;
</script>

