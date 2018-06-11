<template>
<b-form-row class="project-form" data-name="project-region">
    <b-col cols="12">
        <b-form-group
            label="지역 1"
            :state="!errors.has('province')">
            <b-form-select
                v-model="province"
                name="province"
                v-validate="'required'"
                :options="provinceOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('province') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            v-show="province"
            label="지역 2"
            :state="!errors.has('city')">
            <b-form-select
                v-model="city"
                name="city"
                v-validate="'required'"
                :options="cityOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('city') }}</b-form-invalid-feedback>
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
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import APIAddress from '@/api/APIAddress';

    @Component({
        name: 'ProjectRegionForm',
    })
    class ProjectRegionForm extends Vue implements FormComponent {
        province: string;
        city: string;
        provinceOptions: Object[];
        cityOptions: Object[];

        constructor () {
            super();
            this.province = '';
            this.city = '';
            this.provinceOptions = [];
            this.cityOptions = [];
        }
        @Watch('province')
        fetchCity (value: string) {
            APIAddress.fetchAddress(value)
                .then(res => {
                    for (let i = 0; i < res.result.length; i++) {
                        this.cityOptions.push({ text: res.result[i], value: res.result[i] });
                    }
                });
        }
        created () {
            APIAddress.fetchAddress()
                .then(res => {
                    for (let i = 0; i < res.result.length; i++) {
                        this.provinceOptions.push({ text: res.result[i], value: res.result[i] });
                    }
                });
        }

        async validate (): Promise<boolean> {
            const provinceValidate = await this.$validator.validate('province', this.province);
            const cityValidate = await this.$validator.validate('city', this.city);
            const result = provinceValidate && cityValidate;

            this.$emit('validate', result);
            return result;
        }
    }
/**/
    export default ProjectRegionForm;
</script>
<style lang="scss" scoped>

</style>
