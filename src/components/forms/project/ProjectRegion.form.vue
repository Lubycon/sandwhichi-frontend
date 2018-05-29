<template>
<b-form-row class="project-form" data-name="project-region">
    <b-col cols="12">
        <b-form-group
            label="지역 1"
            :state="!errors.has('region1')">
            <b-form-select
                v-model="region1"
                name="region1"
                v-validate="'required'"
                :options="regionOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('region1') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            label="지역 2"
            :state="!errors.has('region2')">
            <b-form-select
                v-model="region2"
                name="region2"
                v-validate="'required'"
                :options="regionOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('region2') }}</b-form-invalid-feedback>
        </b-form-group>
    </b-col>
</b-form-row>
</template>
<script lang="ts">
    /**
     * @class ProjectRegionForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';

    @Component({
        name: 'ProjectRegionForm',
    })
    class ProjectRegionForm extends Vue implements FormComponent {
        region1: string;
        region2: string;
        regionOptions: Array<Object> = [
            { value: 'seoul', text: '서울' },
            { value: 'gyeonggi', text: '경기도' }
        ];

        constructor () {
            super();
            this.region1 = '';
            this.region2 = '';
        }

        async validate (): Promise<boolean> {
            const regionValidate1 = await this.$validator.validate('region1', this.region1);
            const regionValidate2 = await this.$validator.validate('region2', this.region2);
            const result = regionValidate1 && regionValidate2;

            this.$emit('validate', result);
            return result;
        }
    }
/**/
    export default ProjectRegionForm;
</script>
<style lang="scss" scoped>

</style>
