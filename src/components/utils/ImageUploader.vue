<template>
    <div
        class="image-uploader"
        :style="{ 'background-image': `url(${previewDataURL})` }"
        @click="onClick">
        <span v-show="!previewDataURL">+</span>
        <b-form-file
            v-show="false"
            type="file"
            ref="fileInput"
            accept="image/jpeg, image/png"
            :plain="true"
            @change="onChangeUploadedFile">
        </b-form-file>
    </div>
</template>

<style lang="scss" scoped>
    @import 'src/styles/utils/__module__';

    .image-uploader {
        @include backgroundCover;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-top: 100%;
        border: 1px solid $grey400;
        & > span{
            @include floatToCenter;
            font-size: 28px;
            line-height: 28px;
            color: $grey400;
        }
    }
</style>

<script lang="ts">
    /**
     * @class ImageUploader
     * @extends Vue
     */

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import $ from 'jquery';
    import Q from 'q';

    @Component({
        name: 'ImageUploader',
    })
    class ImageUploader extends Vue {
        $refs: {
            fileInput: any;
        };
        previewDataURL: string;

        constructor () {
            super();
            this.previewDataURL = '';
        }

        @Prop({ default: false })
        base64: boolean;

        @Prop({ default: false })
        preview: boolean;

        onClick () {
            $(this.$refs.fileInput.$el).trigger('click');
        }

        reset () {
            return this.$refs.fileInput.reset();
        }

        async onChangeUploadedFile (e) {
            const result: any = {
                files: null,
                file: null,
                dataURL: null,
            };
            const files: FileList = e.target.files;
            const file: File = files[0];

            try {
                result.file = file;
                if (this.base64 || this.preview) {
                    const dataURL = await this.convertToBase64(file);
                    if (this.base64) {
                        result.dataURL = dataURL;
                    }
                    if (this.preview) {
                        this.previewDataURL = dataURL;
                    }
                }
            }
            catch (e) {
                console.error(e);
            }

            this.$emit('input', result);
            this.$emit('change', result);
        }

        convertToBase64 (file: File): Promise<string> {
            const reader: FileReader = new FileReader();
            const defer = Q.defer();

            reader.onload = e => {
                const data = reader.result;
                if (data) {
                    defer.resolve(data);
                }
                else {
                    defer.reject();
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }

            return defer.promise;
        }
    }

    export default ImageUploader;
</script>

